
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import Home from './pages/Home';
import Story from './pages/Story';
import ContactPage from './pages/ContactPage';
import ExperiencePage from './pages/ExperiencePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Shell />}>
                    <Route index element={<Home />} />
                    <Route path="story" element={<Story />} />
                    <Route path="experience" element={<ExperiencePage />} />
                    <Route path="contact" element={<ContactPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
