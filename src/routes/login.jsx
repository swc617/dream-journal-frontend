import React from 'react';
import { handleLogin } from '../services/authService';

import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default function Login() {
    let navigate = useNavigate();
    const onSuccess = async (res) => {
        await handleLogin(res);
        navigate('/');
    };

    const onError = (err) => {
        alert('Login Failed');
        console.log('failed', err);
    };

    return (
        <div class="h-100 ">
            <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
                <h1 id="title">SHAREDREAMS</h1>

                <GoogleLogin
                    onSuccess={onSuccess}
                    theme="filled_black"
                    size="large"
                    text="signin_with"
                    width="230"
                    type="standard"
                    onError={onError}
                />
            </div>
        </div>
    );
}
