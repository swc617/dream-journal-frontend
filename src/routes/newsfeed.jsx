import React from 'react';

import { useState, useEffect } from 'react';
import { getNewsfeed } from '../services/newsfeedService.js';
import { NavLink, Outlet } from 'react-router-dom';
import { formatDreamType, formatDate } from '../services/util';

export default function Newsfeed() {
    const [newsfeed, setNewsfeed] = useState([]);
    const [toggleUpdate, setToggle] = useState([]);
    const [formData, setFormData] = useState({
        sortBy: 'date',
        voteMinimum: 0,
    });

    useEffect(() => {

        const fetchData = async () => {
            let fetchedNewsfeed = await getNewsfeed(formData);
            return fetchedNewsfeed;
        };
        fetchData().then((fetchedNewsfeed) => {
            if (formData.sortBy === 'votes') {
                fetchedNewsfeed.reverse();
            }
            setNewsfeed(fetchedNewsfeed);
        });
    }, [toggleUpdate]);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const divDreamType = (dreamType) => {
        let info = formatDreamType(dreamType);
        return <div className={info[0]}>{info[1]}</div>;
    };


    const newsfeedItems = newsfeed.map((post, index) => (
        <div class="card shadow-lg border-dark mb-5">
            <div class="card-header py-3">{divDreamType(post.type)}</div>
            <div class="card-body py-4">
                <h5 class="card-title">{post.title}</h5>
                <h6 class="card-subtitle text-muted py-1">
                    {formatDate(post.sk)}
                </h6>
                <p class="card-text py-2">
                    {post.content.length > 150
                        ? post.content.substr(0, 140).concat('...')
                        : post.content}
                </p>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <h6 class="align-self-end"> {post.votes} likes</h6>
                <NavLink
                    className="btn btn-secondary px-5 py-2"
                    key={index}
                    to={`/post/${post.sk.split('ENTRY#')[1]}`}
                    state={{ owner: post.pk.split('USER#')[1] }}
                >
                    Comments {'>'}
                </NavLink>
            </div>
        </div>
    ));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setToggle(!toggleUpdate);
    };


    return (
        <>
            <form
                class="bg-light rounded shadow-lg row g-4 m-lg-5 mt-5 p-4"
                onSubmit={handleSubmit}
            >
                <div class="col-lg-3 col-sm-12">
                    <label class="form-label ">Sortby</label>
                    <select
                        class="form-select"
                        onChange={handleChange}
                        defaultValue={formData.sortBy}
                        name="sortBy"
                    >
                        <option value="date">Date</option>
                        <option value="votes">Likes</option>
                    </select>
                </div>

                <div class="col-lg-3 col-sm-12">
                    <label class="form-label">Minimum likes:</label>
                    <input
                        class="form-control"
                        type="number"
                        name="voteMinimum"
                        defaultValue={formData.voteMinimum}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div class="col-lg-6 col-sm-12 d-flex align-items-end justify-content-end">
                    <input
                        class="col-4 btn btn-secondary"
                        type="submit"
                        value="Filter"
                    />
                </div>
            </form>

            <div class="d-grid col-lg-8 mx-lg-auto row row-cols-1 g-4 my-5">
                <div class="col">{newsfeedItems}</div>
            </div>

            <Outlet />
        </>
    );
}
