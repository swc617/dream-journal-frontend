import axios from 'axios';
import { addHeaders, getBaseURL } from './util';

const baseURL = getBaseURL();

export async function getNewsfeed(query) {
    try {
        const response = await axios.get(baseURL + '/newsfeed', {
            headers: addHeaders(),
            params: query 
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// same as get journal
export async function getPost(id, owner) {
    try {
        const response = await axios.get(baseURL + '/journal/' + id, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                app_user_id: owner,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateReactions(journal, owner) {
    try {
        let id = journal.sk.split('ENTRY#')[1];

        const response = await axios.patch(
            baseURL + '/newsfeed/' + id,
            { Item: journal },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    app_user_id: owner,
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
