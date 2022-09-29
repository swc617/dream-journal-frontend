import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import { isLoggedIn } from './services/authService';
import Login from './routes/login';

import './routes/style.css';

export default function App() {
    let navigate = useNavigate();

    return (
        <>
            {isLoggedIn() ? (
                <div>
                    <div class="d-flex justify-content-center bg-dark">
                        <Link to="/" className="link">
                            <h1 id="title" class="m-3">
                                SHAREDREAMS
                            </h1>
                        </Link>
                    </div>

                    <nav class="nav nav-tabs justify-content-center bg-dark  border-3 border-bottom">
                        <button
                            class="btn btn-danger position-absolute start-0"
                            id="back-btn"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            back
                        </button>
                        <div class="nav-item">
                            <Link className="link nav-link" to="/journals">
                                Journals
                            </Link>
                        </div>
                        <Link className="link nav-link" to="/newsfeed">
                            Newsfeed
                        </Link>
                        <Link className="link nav-link" to="/user">
                            Profile
                        </Link>
                    </nav>

                    <Outlet />
                </div>
            ) : (
                <Login />
            )}
        </>
    );
}
