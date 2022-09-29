import jwt_decode from 'jwt-decode';

const { v4: uuidv4 } = require('uuid');

let userId;

export async function handleLogin(res) {
    const decoded = jwt_decode(res.credential);
    const tokenId = uuidv4();
    userId = decoded.sub;
    localStorage.setItem('shareDream_userToken', tokenId);
    localStorage.setItem('userId', userId);
}

export function handleLogout() {
    localStorage.removeItem('shareDream_userToken');
    localStorage.removeItem('userId');
}

export function isLoggedIn() {
    const tokenId = localStorage.getItem('shareDream_userToken');
    userId = localStorage.getItem('userId');
    if (tokenId) {
        return true;
    } else {
        return false;
    }
}

export function getUserInfo() {
    return userId;
}
