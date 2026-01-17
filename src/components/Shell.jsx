import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import CircuitBackground from './CircuitBackground';
import Preloader from './Preloader';
import Navbar from './Navbar';
import DataBlocks from './DataBlocks';
import CustomCursor from './CustomCursor';

const Shell = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dataBlocksRef = useRef(null);

    return (
        <div className="relative w-full min-h-screen text-[var(--color-text)] transition-colors duration-500">
            {/* 1. Global Background */}
            <CircuitBackground />
            <CustomCursor />

            {/* 2. Navigation */}
            {!isLoading && <Navbar />}

            {/* 3. Global Transition Layer */}
            <DataBlocks ref={dataBlocksRef} />

            {/* 4. Preloader */}
            {isLoading && (
                <Preloader onComplete={() => setIsLoading(false)} />
            )}

            {/* 5. Main Content */}
            <main
                className={`relative z-10 w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
                {/* Pass the transition trigger down to pages */}
                <Outlet context={{ transition: dataBlocksRef }} />
            </main>
        </div>
    );
};

export default Shell;
