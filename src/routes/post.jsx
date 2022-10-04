import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { getPost, updateReactions } from '../services/newsfeedService';
import { getUserInfo } from '../services/authService';
import { getProfile } from '../services/profileService';
import { formatDate } from '../services/util';

import { ReactComponent as Like } from '../imgs/like.svg';
import { ReactComponent as Liked } from '../imgs/liked.svg';

const _ = require('lodash');

export default function Post() {
    let params = useParams();
    const location = useLocation();
    const owner = location.state.owner;
    let user = getUserInfo();
    const [post, setPost] = useState([]);
    const [userLikesPost, setLike] = useState([]);
    const [votes, setVotes] = useState();
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [toggleUpdate, setToggle] = useState(false);
    const textAreaRef = useRef(null);
    const [username, setUsername] = useState([]);
    const [date, setDate] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedPost = await getPost(params.id, owner);
            let fetchedProfile = await getProfile();
            return [fetchedPost, fetchedProfile];
        };
        fetchData().then(([post, profile]) => {
            if (!_.isEmpty(profile)) {
                setUsername(profile.username);
            } else {
                setUsername(user);
            }
            setPost(post);
            setLike(post.likedby.includes(user) ? true : false);
            setVotes(post.votes);
            setComments(post.comments);
            let newDate = formatDate(post.sk);
            setDate(newDate);
        });
    }, []);

    // 본인 댓글 삭제 할 수 있는 핸들러
    const handleCommentDelete = (commentItem) => {
        let filteredComments = comments.filter(
            (comment) => comment !== commentItem
        );
        setComments((comments) => [...filteredComments]);

        setPost((post) => ({
            ...post,
            votes: votes,
            comments: [...comments],
        }));

        setToggle(!toggleUpdate);
    };

    // 댓글 리스트
    const commentList = comments.map((commentItem, index) => {
        // 모든 포스트는 더미로 유저 '_' 와 댓글 '_' 존재하기 때문에 이것을 제외 해야함
        if (commentItem.username !== '_') {
            return (
                <>
                    <li
                        class="list-group-item d-flex align-items-center"
                        key={index}
                    >
                        <span class="input-group-text me-2">
                            {commentItem.username}
                        </span>
                        {commentItem.comment}
                        {username === commentItem.username ||
                        user === commentItem.username ? (
                            <button
                                class="btn-close ms-auto"
                                type="button"
                                onClick={() => handleCommentDelete(commentItem)}
                            ></button>
                        ) : (
                            ''
                        )}
                    </li>
                </>
            );
        }
    });

    // 포스트 좋아요 핸들러
    const handleLike = () => {
        let likedbyArr = post.likedby;
        let inc;

        if (!userLikesPost) {
            likedbyArr.push(user);
            inc = 1;
            setVotes(votes + 1);
        } else {
            likedbyArr = likedbyArr.filter((item) => item !== user);
            inc = -1;
            setVotes(votes - 1);
        }
        setPost((post) => ({
            ...post,
            votes: votes + inc,
            likedby: likedbyArr,
        }));
        setLike(!userLikesPost);
        setToggle(!toggleUpdate);
    };

    // 댓글 필드 변경 핸들러
    const handleChange = (event) => {
        setNewComment({
            username: username,
            comment: newComment,
            [event.target.name]: event.target.value,
        });
    };

    // 댓글, 좋아요 수정할 경우 업데이트 호출
    useEffect(() => {
        const sendUpdateRequest = async () => {
            let response = await updateReactions(post, owner);
            return response;
        };
        sendUpdateRequest();
    }, [toggleUpdate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!textAreaRef.current.value) {
            alert('empty comment');
            return;
        }

        let commentToAdd = {
            username: newComment.username,
            comment: newComment.commentText,
        };

        setComments((comments) => [...comments, commentToAdd]);

        setPost((post) => ({
            ...post,
            votes: votes,
            comments: [...comments, commentToAdd],
        }));
        setNewComment('');
        textAreaRef.current.value = '';

        setToggle(!toggleUpdate);
    };

    return (
        <main class="p-lg-5">
            <div class="card p-lg-5 shadow-lg mt-5">
                <div class="card-body">
                    <div class="rounded bg-light p-3 pb-5">
                        <h2 class="card-title">{post.title}</h2>
                        <h6 class="card-subtitle text-muted py-1">{date}</h6>
                        <p class="card-text">{post.content}</p>
                    </div>

                    <div class="d-flex justify-content-end pt-4">
                        <h6 class="me-auto">Comments</h6>
                        <button
                            class="like-button me-2"
                            type="button"
                            onClick={handleLike}
                        >
                            {userLikesPost ? (
                                <Liked className="liked-icon" />
                            ) : (
                                <Like className="like-icon" />
                            )}
                        </button>
                        <h6>{votes} likes</h6>
                    </div>

                    <ul class="list-group">{commentList}</ul>

                    <form class="d-flex " onSubmit={handleSubmit}>
                        <textarea
                            class="form-control"
                            name="commentText"
                            placeholder="Add Comment"
                            defaultValue={newComment}
                            onChange={handleChange}
                            ref={textAreaRef}
                        />
                        <input
                            class="col-2 btn btn-secondary"
                            type="submit"
                            value="Post"
                        />
                    </form>

                    <Outlet />
                </div>
            </div>
        </main>
    );
}
