import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getJournals, getJournalsByType } from '../services/journalService';
import Calendar from 'react-calendar';
import { isMobile } from 'react-device-detect';
import './style.css';
import {
    changeDateFormat,
    formatDreamType,
    formatDate,
} from '../services/util';

const _ = require('lodash');

export default function Journals() {
    const [journals, setJournals] = useState([]);
    let navigate = useNavigate();

    const textAreaRef = useRef(null);
    const [toggleUpdate, setToggle] = useState(false);

    const [typeOption, setTypes] = useState('normalDream');

    const [toggleByType, setByType] = useState(false);

    let todaysDate = new Date();
    todaysDate.setDate(todaysDate.getDate() + 1);
    let tomorrowsDate = todaysDate.toISOString().slice(0, 10);

    const [formData, setFormData] = useState({
        startDate: '2022-01-01',
        endDate: tomorrowsDate,
        theme: '',
    });

    useEffect(() => {
        const fetchData = async (getByType) => {
            let fetchedJournals;
            let query;
            if (getByType) {
                query = {
                    type: typeOption.typeOption,
                };
                fetchedJournals = await getJournalsByType(query);
            } else {
                query = {
                    startDate: changeDateFormat(formData.startDate),
                    endDate: changeDateFormat(formData.endDate),
                };
                if (formData.theme !== '') {
                    query.theme = formData.theme;
                }
                fetchedJournals = await getJournals(query);
            }

            return fetchedJournals;
        };

        fetchData(toggleByType).then((fetchedJournals) => {
            setJournals(fetchedJournals);
            console.log(fetchedJournals);
        });
    }, [toggleUpdate]);

    const isJournalFound = (journals) => {
        if (_.isEmpty(journals)) {
            return false;
        } else {
            return true;
        }
    };

    const dates = journals.map((journal) => {
        let date = journal.sk.split('ENTRY#')[1].substr(0, 8);
        return date;
    });

    const getEditForm = () => {
        let todaysDate = new Date().toJSON().slice(0, 10).replace(/-/g, '');

        if (dates.includes(todaysDate)) {
            alert('You can only add one journal per day');
            return;
        }
        navigate('/add');
    };

    const formatToLocalDateString = (date) => {
        let dateString = date.toLocaleDateString();
        let dateArr = dateString.split('/');
        let month = dateArr[0].padStart(2, '0');
        let day = dateArr[1].padStart(2, '0');
        let year = dateArr[2];
        return year + month + day;
    };

    const isJournalCreated = (date) => {
        let toCompare = formatToLocalDateString(date);

        return dates.includes(toCompare);
    };

    const dayClicked = (date) => {
        if (isJournalCreated(date)) {
            let dateString = formatToLocalDateString(date);

            let foundJournal = journals.find(
                (journal) =>
                    journal.sk.split('ENTRY#')[1].substr(0, 8) === dateString
            );
            navigate(`/entry/${foundJournal.sk.split('ENTRY#')[1]}`);
        } else {
            if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
                getEditForm();
            }
        }
    };


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        textAreaRef.current.value = '';
        setToggle(!toggleUpdate);
    };

    const handleReset = async (event) => {
        setFormData({
            startDate: '2022-01-01',
            endDate: tomorrowsDate,
            theme: '',
        });
        setByType(!toggleByType);

        setToggle(!toggleUpdate);
    };

    const handleFilterChange = (event) => {
        setTypes({
            typeOption,
            [event.target.name]: event.target.value,
        });
    };

    const handleFilter = () => {
        if (typeOption === undefined) {
            setTypes({ typeOption: 'normalDream' });
        }
        setByType(!toggleByType);
        setToggle(!toggleUpdate);
    };

    const divDreamType = (dreamType) => {
        let info = formatDreamType(dreamType);
        return <div className={info[0]}>{info[1]}</div>;
    };

    return (
        <>
            <div class="d-grid col-lg-9 mx-auto mt-5">
                {isMobile ? (
                    <></>
                ) : (
                    <Calendar
                        className="shadow-lg"
                        onClickDay={(value, event) => dayClicked(value)}
                        tileClassName={({ activeStartDate, date, view }) => {
                            if (isJournalCreated(date)) {
                                return 'calendar-journal';
                            }
                        }}
                    />
                )}
            </div>

            <div class="d-grid col-4 mx-auto m-5">
                <button
                    class="shadow-lg btn btn-secondary"
                    id="add-button"
                    onClick={getEditForm}
                >
                    Add Journal
                </button>
            </div>

            <div class="d-grid col-lg-9 mx-auto p-lg-5 bg-light shadow-lg search-field">
                <div class="row my-3">
                    <div class="d-flex">
                        <div class="me-lg-auto align-self-end">
                            <button
                                class="btn btn-danger "
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                        <div class="me-lg-3">
                            <label class="form-label ">Filter by Type:</label>

                            <select
                                class="form-select"
                                onChange={handleFilterChange}
                                defaultValue={typeOption}
                                name="typeOption"
                            >
                                <option value="normalDream">
                                    Normal Dream
                                </option>
                                <option value="dayDream">Day Dream</option>
                                <option value="lucidDream">Lucid Dream</option>
                                <option value="falseAwakeningDream">
                                    False Awakening Dream
                                </option>
                                <option value="nightmare">Nightmare</option>
                            </select>
                        </div>
                        <div class="align-self-end">
                            <button
                                class="btn btn-secondary "
                                onClick={handleFilter}
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                <form class="d-lg-flex" onSubmit={handleSubmit}>
                    <div class="align-self-end">
                        <label class="form-label">Date Start:</label>
                        <input
                            type="date"
                            class="form-control"
                            defaultValue={formData.startDate}
                            name="startDate"
                            onChange={handleChange}
                        />
                    </div>

                    <div class="align-self-end">
                        <label class="form-label">Date End:</label>
                        <input
                            type="date"
                            class="form-control"
                            value={formData.endDate}
                            name="endDate"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label class="me-lg-3 form-label">Theme:</label>
                        <textarea
                            class="form-control"
                            rows="1"
                            name="theme"
                            defaultValue={formData.theme}
                            onChange={handleChange}
                            ref={textAreaRef}
                        />
                    </div>

                    <div class="align-self-end ms-auto row ">
                        <input
                            class="btn btn-secondary"
                            type="submit"
                            value="Search"
                        />
                    </div>
                </form>
            </div>

            {isJournalFound(journals) ? (
                <>
                    <div class="d-grid col-lg-9 mx-lg-auto row row-cols-1 g-4 my-5">
                        {journals.map((journal, index) => (
                            <div class="col">
                                <div class="card shadow-lg border-dark mb-3">
                                    <div class="card-body py-4">
                                        <h5 class="card-title">
                                            {journal.title}
                                        </h5>
                                        <h6 class="card-subtitle text-muted py-1">
                                            {formatDate(journal.sk)}
                                        </h6>
                                        <div class="py-1">
                                            {divDreamType(journal.type)}

                                            <h6 class="badge bg-light text-dark ms-2">
                                                {journal.theme}
                                            </h6>
                                        </div>

                                        <p class="card-text py-2">
                                            {journal.content.length > 150
                                                ? journal.content
                                                      .substr(0, 140)
                                                      .concat('...')
                                                : journal.content}
                                        </p>
                                    </div>
                                    <div class="card-footer d-flex flex-row-reverse">
                                        <NavLink
                                            className="btn btn-secondary"
                                            key={journal.journal_id}
                                            to={`/entry/${
                                                journal.sk.split('ENTRY#')[1]
                                            }`}
                                        >
                                            Details {'>'}
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
