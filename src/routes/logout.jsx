import React from 'react';
import { handleLogout } from '../services/authService';

import { useNavigate } from 'react-router-dom';

export default function Logout() {
    let navigate = useNavigate();

    const logOut = () => {
        handleLogout();
        navigate(0);
    };

    return (
        <div>
            <button onClick={logOut} class="btn btn-danger">
                Log Out
            </button>
        </div>
    );
}
