import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

import Journals from './routes/journals';
import Journal from './routes/journal';
import JournalForm from './routes/journalForm';
import Newsfeed from './routes/newsfeed';
import Post from './routes/post';
import Profile from './routes/profile';
import ProfileForm from './routes/profileForm';
import { ReactComponent as Image } from './imgs/night-sky-watching.svg';

import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={googleClientID}>

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    index
                    element={
                        <div class="container">
                            <Image className="home-image mt-lg-5" />
                        </div>
                    }
                />
                {/* journals section */}
                <Route path="journals" element={<Journals />} />
                <Route path="add" element={<JournalForm formType="add" />} />
                <Route path="entry/:id" element={<Journal />} />
                <Route
                    path="entry/:id/edit"
                    element={<JournalForm formType="edit" />}
                />
                {/* newsfeed section */}
                <Route path="newsfeed" element={<Newsfeed />} />
                <Route path="post/:id" element={<Post />} />

                {/* profile section */}
                <Route path="user" element={<Profile />} />
                <Route path="user/edit" element={<ProfileForm />} />

                <Route path="*" element={<h1>404</h1>} />
            </Route>
        </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
);
