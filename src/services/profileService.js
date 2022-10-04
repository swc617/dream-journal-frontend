import axios from 'axios';
import { addHeaders, getBaseURL } from './util';

const baseURL = getBaseURL();

// 프로필 호출
export async function getProfile() {
    try {
        const response = await axios.get(baseURL + '/user', {
            headers: addHeaders(),
        });
        return response.data[0].profile;
    } catch (error) {
        console.log(error);
    }
}

// 프로필 업데이트
export async function updateProfile(profileObj) {
    try {
        const response = await axios.patch(
            baseURL + '/user',
            { Item: { profile: profileObj } },
            { headers: addHeaders() }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

// 프로필 삭제
export async function deleteProfile() {
    try {
        const response = await axios.delete(baseURL + '/user', {
            headers: addHeaders(),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// 프로필 생성
export async function addProfile(profileObj) {
    try {
        const response = await axios.post(
            baseURL + '/user',
            { Item: profileObj },
            {
                headers: addHeaders(),
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

// 아이디 중복 확인을 위한 아이디 목록 호출
export async function getUsernames() {
    try {
        const response = await axios.get(baseURL + '/usernames', {
            headers: addHeaders(),
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// 아이디 목록에 새로운 아이디 더해서 업데이트
export async function updateUsernames(newUsername) {
    try {
        const response = await axios.patch(
            baseURL + '/usernames',
            { Item: { username: newUsername } },
            { headers: addHeaders() }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
