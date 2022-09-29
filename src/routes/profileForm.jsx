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
        if (!profile.email) {
            setFirstTimeCreating(true);
        }
        setUserNameField(profile.username);
        setEmailField(profile.email);
    }, []);

    const handleUserNameChange = (event) => {
        setUserNameField({
            userNameField,
            [event.target.name]: event.target.value,
        });

        if (userNameChanged === false) {
            setUserNameChanged(!userNameChanged);
        }
    };

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
        // if first user to enter username or
        // username is in usernames list
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
