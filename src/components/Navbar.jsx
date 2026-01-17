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
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
            <div className="flex items-center gap-1 bg-[#050505]/80 backdrop-blur-md border border-[#ff3333]/30 rounded-full p-2 px-6 shadow-[0_0_20px_rgba(255,51,51,0.2)]">

                {/* Links */}
                <div className="flex items-center gap-6 mr-6">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:text-[#ff3333] ${isActive ? 'text-[#ff3333] glow-text' : 'text-gray-400'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Triangular Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 flex items-center justify-center transition-transform duration-500 hover:scale-110"
                    style={{ transform: theme === 'light' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <svg
                        width="16"
                        height="16"
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
