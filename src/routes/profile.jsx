import React from 'react';

import { useEffect, useState } from 'react';
import { getProfile } from '../services/profileService';
import { useNavigate } from 'react-router-dom';
import { getRandomUsername } from '../services/util';
import Logout from './logout';

const _ = require('lodash');

export default function Profile() {
    let navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedProfile = await getProfile();
            return fetchedProfile;
        };
        fetchData().then((profile) => {
            console.log(profile);
            let randomUsername = getRandomUsername();
            if (_.isEmpty(profile)) {
                setProfile({ username: randomUsername });
            } else {
                setProfile(profile);
            }
        });
    }, []);

    const getProfileForm = (profileObj) => {
        navigate('/user/edit', {
            state: { profile: profileObj },
        });
    };

    return (
        <>
            <div class="mx-auto col-lg-7 mt-5">
                <div class="card shadow-lg p-5">
                    <div class="card-body">
                        <h1 class="card-title"> Profile </h1>
                        <div class="row">
                            <p class="col-lg-3 ">USERNAME</p>
                            <p class="col-lg-9 ">{profile.username}</p>
                        </div>
                        <div class="row">
                            <p class="col-lg-3 ">EMAIL</p>
                            <p class="col-lg-9 ">{profile.email}</p>
                        </div>

                        <button
                            class="btn btn-secondary my-3"
                            onClick={() => getProfileForm(profile)}
                        >
                            Edit Profile
                        </button>
                        <Logout />
                    </div>
                </div>
            </div>
        </>
    );
}
