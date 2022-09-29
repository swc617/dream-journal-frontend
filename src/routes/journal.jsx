import React from 'react';

import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { getJournal, deleteJournal } from '../services/journalService';
import { formatDreamType, formatDate } from '../services/util';
const _ = require('lodash');

export default function Journal() {
    let navigate = useNavigate();
    let params = useParams();
    const [journal, setJournal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let fetchedJournal = await getJournal(params.id);
            setJournal(fetchedJournal);
        };
        fetchData();
    }, []);

    const getEditForm = () => {
        navigate('./edit', { state: journal });
    };

    const handleDelete = async () => {
        setJournal();
        await deleteJournal(params.id);
        navigate('/journals');
    };

    const isJournalFound = (journal) => {
        if (_.isEmpty(journal)) {
            return false;
        } else {
            return true;
        }
    };



    return (
        <>
            {isJournalFound(journal) ? (
                <div class="d-grid col-lg-9 mx-lg-auto row row-cols-1 my-5">
                    <div class="card shadow-lg text-dark bg-light ">
                        <div class="card-header p-4"><h4>{journal.title}</h4> <p>{formatDate(journal.sk)}</p></div>
                        <div class="card-body">
                            <p class="card-text bg-body border p-3 rounded ">
                                {journal.content}
                            </p>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <span class="badge bg-secondary me-2">
                                        MOOD
                                    </span>
                                    {journal.mood}
                                </li>
                                <li class="list-group-item">
                                    <span class="badge bg-secondary me-2">
                                        SLEEPTIME
                                    </span>
                                    {journal.sleeptime}
                                </li>
                                <li class="list-group-item">
                                    <span class="badge bg-secondary me-2">
                                        THEME
                                    </span>
                                    {journal.theme}
                                </li>
                                <li class="list-group-item">
                                    <span class="badge bg-secondary me-2">
                                        TYPE
                                    </span>
                                    {formatDreamType(journal.type)[1]}
                                </li>
                                <li class="list-group-item">
                                    <span class="badge bg-secondary me-2">
                                        SHARE
                                    </span>
                                    {journal.share}
                                </li>
                            </ul>
                        </div>
                        <div class="d-flex flex-row-reverse card-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-secondary me-3"
                                onClick={getEditForm}
                            >
                                Edit
                            </button>
                        </div>
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div class="vh-100 d-flex justify-content-center align-items-center ">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </>
    );
}
