import jwt_decode from 'jwt-decode';

const { v4: uuidv4 } = require('uuid');

let userId;

// 로그인 핸들러
export async function handleLogin(res) {
    const decoded = jwt_decode(res.credential);
    const tokenId = uuidv4();
    userId = decoded.sub;
    localStorage.setItem('shareDream_userToken', tokenId);
    localStorage.setItem('userId', userId);
}

// 로그아웃 핸들러
export function handleLogout() {
    localStorage.removeItem('shareDream_userToken');
    localStorage.removeItem('userId');
}

// 로그인 여부 확인
export function isLoggedIn() {
    const tokenId = localStorage.getItem('shareDream_userToken');
    userId = localStorage.getItem('userId');
    if (tokenId) {
        return true;
    } else {
        return false;
    }
}

// 유저 아이디 리턴
export function getUserInfo() {
    return userId;
}
