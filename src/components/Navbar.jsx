import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [theme, setTheme] = useState('dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <>
            {/* DESKTOP NAV (Hidden on mobile) */}
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
                <div className="flex items-center gap-1 bg-[#050505]/80 backdrop-blur-md border border-[#ff3333]/30 rounded-full p-2 px-6 shadow-[0_0_20px_rgba(255,51,51,0.2)]">
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
                </div>
            </nav>

            {/* MOBILE NAV TOGGLE (Visible on mobile) */}
            <div className="fixed top-6 right-6 z-[101] md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-3 bg-black/80 border border-[#ff3333] rounded-full text-[#ff3333] backdrop-blur-md"
                >
                    {isMenuOpen ? (
                        <span className="font-mono font-bold text-xl">X</span>
                    ) : (
                        <div className="space-y-1.5">
                            <div className="w-6 h-0.5 bg-[#ff3333]"></div>
                            <div className="w-6 h-0.5 bg-[#ff3333]"></div>
                            <div className="w-6 h-0.5 bg-[#ff3333]"></div>
                        </div>
                    )}
                </button>
            </div>

            {/* MOBILE FULLSCREEN MENU */}
            <div className={`fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Matrix Lines Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ff3333] shadow-[0_0_20px_#ff3333]" />

                {links.map((link, i) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                            `text-3xl font-black font-mono uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? 'text-[#ff3333] glow-text' : 'text-gray-500 hover:text-white'}`
                        }
                    >
                        {/* Add index number for decor */}
                        <span className="text-xs text-[#ff3333] mr-4 align-top">0{i + 1}</span>
                        {link.name}
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default Navbar;
