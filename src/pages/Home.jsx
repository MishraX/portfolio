import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import About from '../components/About';
import Projects from '../components/Projects';
import ContactFooter from '../components/ContactFooter';

const Home = () => {
    return (
        <div className="w-full relative z-10 flex flex-col gap-20 md:gap-32">
            <Hero />
            <Experience />
            <Skills />
            <About />
            <Projects />
            <ContactFooter />
        </div>
    );
};

export default Home;
