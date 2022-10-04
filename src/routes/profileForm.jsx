import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    updateProfile,
    deleteProfile,
    getUsernames,
    updateUsernames,
} from '../services/profileService';

export default function ProfileForm() {
    let navigate = useNavigate();
    const location = useLocation();
    let profile = location.state.profile;
    let isUsernameValid = false;

    const [userNameField, setUserNameField] = useState([]);
    const [emailField, setEmailField] = useState([]);

    const [userNameChanged, setUserNameChanged] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);

    const [firstTimeCreating, setFirstTimeCreating] = useState(false);

    useEffect(() => {
        // 이메일이 없는 경우 처음으로 프로필을 수정하는 것이기
        // 때문에 처음으로 수정하는 것을 나타내는 변수 사용
        if (!profile.email) {
            setFirstTimeCreating(true);
        }
        setUserNameField(profile.username);
        setEmailField(profile.email);
    }, []);

    // 아이디 변경 핸들러
    const handleUserNameChange = (event) => {
        setUserNameField({
            userNameField,
            [event.target.name]: event.target.value,
        });

        if (userNameChanged === false) {
            setUserNameChanged(!userNameChanged);
        }
    };

    // 이메일 변경 핸들러
    const handleEmailChange = (event) => {
        setEmailField({
            ...emailField,
            [event.target.name]: event.target.value,
        });

        if (emailChanged === false) {
            setEmailChanged(!emailChanged);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response;
        let usernameResponse;

        if (!userNameField || !emailField) {
            alert('all fields must be filled');
            return;
        } else if (
            // 아이디를 변경했고 중복확인을 안한 경우 또는
            // 처음으로 프로필을 만드는 경우
            (userNameChanged === true && isUsernameValid === false) ||
            firstTimeCreating === true
        ) {
            setFirstTimeCreating(false);
            alert('validate username');
            return;
        } else {
            let formData = {
                username: userNameField.username,
                email: emailField.email,
            };
            // 변경된 값에 따라 요청 보낼 폼 데이터 설정
            if (emailChanged === false) {
                formData.email = profile.email;
            } else if (userNameChanged === false) {
                formData.username = profile.username;
            } else if (userNameChanged === false && emailChanged === false) {
                formData.username = profile.username;
                formData.email = profile.email;
            }
            response = await updateProfile(formData);
            usernameResponse = await updateUsernames(userNameField.username);
        }

        navigate('/user');
    };

    const handleDelete = async () => {
        let response = await deleteProfile();
        if (response.status === 200 || response.status === 201) {
            alert('success');
        } else {
            alert('error');
        }
        navigate('/user');
    };

    const validateUsername = async () => {
        let response = await getUsernames();
        // 현재 사용자가 첫 사용자라서 아이디 목록이 비어있거나
        // 목록에 사용자의 아이디가 없을 경우
        if (
            response.length === 0 ||
            !response[0].usernames.includes(userNameField.username)
        ) {
            isUsernameValid = true;
            setUserNameChanged(false);
            alert('valid username');
        } else {
            alert('invalid username');
        }
    };

    return (
        <main class="container  bg-light rounded shadow-lg mt-5 p-5">
            <h2>Profile</h2>

            <div class="row row-cols-2 ">
                <div class="col-8 ">
                    <form class="row" onSubmit={handleSubmit}>
                        <div class="d-lg-flex">
                            <label class="col-form-label col-2">Username</label>
                            <div class="flex-fill ">
                                <input
                                    class="form-control"
                                    type="text"
                                    name="username"
                                    defaultValue={userNameField}
                                    // defaultValue={formData.username}
                                    onChange={handleUserNameChange}
                                />
                            </div>
                        </div>

                        <div class="d-lg-flex mt-3">
                            <label class="col-form-label col-2 ">Email</label>

                            <div class="flex-fill">
                                <input
                                    class="form-control"
                                    type="email"
                                    name="email"
                                    defaultValue={emailField}
                                    // value={formData.email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div class="mt-3 d-flex justify-content-end">
                            <input
                                class="btn btn-secondary"
                                type="submit"
                                value="Save"
                            />
                        </div>
                    </form>
                </div>
                <div class="col-4 d-flex flex-column align-items-start">
                    <button
                        class="btn btn-secondary mb-auto"
                        onClick={validateUsername}
                    >
                        Validate
                    </button>
                    <button class="btn btn-secondary" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </main>
    );
}
