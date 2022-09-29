import axios from 'axios';
import { addHeaders, getBaseURL } from './util';

const baseURL = getBaseURL();


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

export async function deleteProfile() {
    try {
        const response = await axios.delete(baseURL + '/user', {
            headers: addHeaders(),
        });
        return response
    } catch (error) {
        console.log(error);
    }
}

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

export async function getUsernames() {
    try{
        const response = await axios.get(baseURL + '/usernames', {
            headers: addHeaders(),
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function updateUsernames(newUsername) {
    try{
        const response = await axios.patch(
            baseURL + '/usernames',
            { Item: { username: newUsername } },
            { headers: addHeaders() }
        );
        return response;
    } catch (error) {
        console.log(error)
    }
}