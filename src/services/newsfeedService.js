import axios from 'axios';
import { addHeaders, getBaseURL } from './util';

const baseURL = getBaseURL();

// 뉴스피드 호출
export async function getNewsfeed(query) {
    try {
        const response = await axios.get(baseURL + '/newsfeed', {
            headers: addHeaders(),
            params: query,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// 일지 호출과 동일한 endpoint
// owner는 일지 소유자의 아이디
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

// 댓글 좋아요 업데이트
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
