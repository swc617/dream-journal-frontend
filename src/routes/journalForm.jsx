import React from 'react';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addJournal, updateJournal } from '../services/journalService';

export default function JournalForm(props) {
    let navigate = useNavigate();
    const location = useLocation();
    let journal = location.state;
    let formType = props.formType;
    let updateQuery;
    // enter default value in case user does not
    // choose from dropdown
    if (formType === 'add') {
        journal = {
            type: 'normalDream',
            share: 'PUBLIC',
        };
    }

    const [formData, setFormData] = useState({
        ...journal,
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response;
        if (journal.share === 'PUBLIC' && formData.share === 'PRIVATE') {
            alert(
                'Making a journal private will delete all comments & likes. This is irreversible.'
            );
            updateQuery = 'makePrivate';
        } else if (journal.share === 'PRIVATE' && formData.share === 'PUBLIC') {
            updateQuery = 'makePublic';
        }

        if (
            !formData.title ||
            !formData.content ||
            !formData.mood ||
            !formData.theme ||
            !formData.sleeptime ||
            !formData.vividness
        ) {
            alert('all fields must be filled');
            return;
        } else {
            if (formType === 'add') {
                response = await addJournal(formData);
            } else if (formType === 'edit') {
                response = await updateJournal(formData, updateQuery);
            }
            if (response.status === 200 || response.status === 201) {
                alert('success');
            } else {
                alert('error');
            }
            navigate('/journals');
        }
    };

    return (
        <main class="container p-5" style={{ padding: '1rem' }}>
            <form
                class="bg-light rounded shadow-lg row g-4 m-5 p-4"
                onSubmit={handleSubmit}
            >
                <div>
                    <label class="form-label">TTILE</label>
                    <input
                        class="form-control"
                        type="text"
                        name="title"
                        maxLength="20"
                        onChange={handleChange}
                        defaultValue={formData.title}
                    />
                </div>

                <div>
                    <label class="form-label">CONTENT</label>

                    <textarea
                        name="content"
                        class="form-control"
                        rows="10"
                        onChange={handleChange}
                        defaultValue={formData.content}
                    />
                </div>

                <div class="col-lg-4 col-sm-12">
                    <label class="form-label">MOOD</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">
                            WORST 0 / BEST 5
                        </span>
                        <input
                            class="form-control"
                            type="number"
                            name="mood"
                            min="0"
                            max="5"
                            onChange={handleChange}
                            defaultValue={formData.mood}
                        />
                    </div>
                </div>

                <div class="col-lg-4 col-sm-12">
                    <label class="form-label">VIVIDNESS</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">
                            MIN 0 / MAX 100
                        </span>
                        <input
                            class="form-control"
                            type="number"
                            name="vividness"
                            min="0"
                            max="100"
                            onChange={handleChange}
                            defaultValue={formData.vividness}
                        />
                    </div>
                </div>

                <div class="col-lg-4 col-sm-12">
                    <label class="form-label">SLEEPTIME</label>
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">
                            HOURS
                        </span>
                        <input
                            class="form-control"
                            type="number"
                            name="sleeptime"
                            min="0"
                            max="24"
                            step="1"
                            onChange={handleChange}
                            defaultValue={formData.sleeptime}
                        />
                    </div>
                </div>

                <div class="col-lg-8 col-sm-12">
                    <label class="form-label">THEME</label>

                    <input
                        class="form-control"
                        type="text"
                        name="theme"
                        maxLength="20"
                        minLength="1"
                        placeholder="#category"
                        onChange={handleChange}
                        defaultValue={formData.theme}
                    />
                </div>

                <div class="col-lg-4 col-sm-12">
                    <label class="form-label">TYPE</label>

                    <select
                        class="form-select"
                        onChange={handleChange}
                        defaultValue={formData.type}
                        name="type"
                    >
                        <option value="normalDream">Normal Dream</option>
                        <option value="dayDream">Day Dream</option>
                        <option value="lucidDream">Lucid Dream</option>
                        <option value="falseAwakeningDream">
                            False Awakening Dream
                        </option>
                        <option value="nightmare">Nightmare</option>
                    </select>
                </div>

                <div class="col-lg-4 col-sm-12">
                    <label class="form-label">SHARE</label>

                    <select
                        class="form-select"
                        onChange={handleChange}
                        defaultValue={formData.share}
                        name="share"
                    >
                        <option value="PUBLIC">Everyone</option>
                        <option value="PRIVATE">Private</option>
                    </select>
                </div>

                <input class="btn btn-secondary" type="submit" value="Save" />
            </form>
        </main>
    );
}
