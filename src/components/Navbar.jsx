import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Experience', path: '/experience' },
        { name: 'My Story', path: '/story' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[95%] md:max-w-fit">
            <div className="flex items-center justify-between md:justify-start gap-1 bg-[#050505]/90 backdrop-blur-md border border-[#ff3333]/30 rounded-full p-2 px-4 md:px-6 shadow-[0_0_20px_rgba(255,51,51,0.2)] overflow-x-auto no-scrollbar">

                {/* Links */}
                <div className="flex items-center gap-3 md:gap-6 mr-2 md:mr-6 shrink-0">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-[10px] md:text-xs font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase transition-all duration-300 hover:text-[#ff3333] whitespace-nowrap ${isActive ? 'text-[#ff3333] glow-text' : 'text-gray-400'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Triangular Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-6 h-6 md:w-8 md:h-8 flex shrink-0 items-center justify-center transition-transform duration-500 hover:scale-110"
                    style={{ transform: theme === 'light' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        className="fill-[#ff3333] drop-shadow-[0_0_5px_#ff3333]"
                    >
                        <path d="M12 2L2 22h20L12 2z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
