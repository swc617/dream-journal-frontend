import { getUserInfo } from './authService';

var randomWords = require('random-words');

// 헤더 생성
export function addHeaders() {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        app_user_id: getUserInfo(),
    };
}

// API endpoint 호출
export function getBaseURL() {
    const baseURL = process.env.REACT_APP_API_ENDPOINT;
    return baseURL;
}

// 프로필의 랜덤 아이디 생성
export function getRandomUsername() {
    let randomNum = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    let randomName = randomWords({
        exactly: 1,
        wordsPerString: 2,
        separator: '-',
    })[0];
    const randomUsername = randomName + randomNum.toString();
    return randomUsername;
}

// 날짜 형식 변경
export function changeDateFormat(date) {
    return date.replace(/-/g, '');
}

// 꿈 타입 형식 변경
export function formatDreamType(dreamType) {
    let info;
    switch (dreamType) {
        case 'normalDream':
            info = ['badge bg-primary', 'Normal Dream'];
            break;
        case 'dayDream':
            info = ['badge bg-secondary', 'Day Dream'];
            break;
        case 'lucidDream':
            info = ['badge bg-success', 'Lucid Dream'];
            break;
        case 'falseAwakeningDream':
            info = ['badge bg-warning', 'False Awakening Dream'];
            break;
        case 'nightmare':
            info = ['badge bg-danger', 'Nightmare'];
            break;
        default:
            info = ['badge bg-info', 'Unknown'];
    }
    return info;
}

// 날짜 포맷 변경
export function formatDate(journalSortingKey) {
    let dateString = journalSortingKey.split('ENTRY#')[1].substr(0, 8);
    let year = dateString.substr(0, 4);
    let month = dateString.substr(4, 2);
    let date = dateString.substr(6, 2);
    let newDate = new Date(year, parseInt(month) - 1, date);

    return newDate.toLocaleDateString();
}
