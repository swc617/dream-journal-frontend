import axios from 'axios';
import { addHeaders, getBaseURL } from './util';

const baseURL = getBaseURL();

export async function getJournals(query) {
    try {
        const response = await axios.get(baseURL + '/journals', {
            headers: addHeaders(),
            params: query,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getJournalsByType(query) {
    try {
        const response = await axios.get(baseURL + '/types', {
            headers: addHeaders(),
            params: query,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getJournal(id) {
    try {
        const response = await axios.get(baseURL + '/journal/' + id, {
            headers: addHeaders(),
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateJournal(journal, updateQuery) {
    try {
        let id = journal.sk.split('ENTRY#')[1];
        let query = {};

        if (updateQuery) {
            query[updateQuery] = true;
        }

        const response = await axios.patch(
            baseURL + '/journal/' + id,
            { Item: journal },
            { headers: addHeaders(), params: query }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteJournal(id) {
    try {
        const response = await axios.delete(baseURL + '/journal/' + id, {
            headers: addHeaders(),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function addJournal(journal) {
    try {
        const response = await axios.post(
            baseURL + '/journal',
            { Item: journal },
            {
                headers: addHeaders(),
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}
