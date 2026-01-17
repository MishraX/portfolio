import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const ContactFooter = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
    }, []);

    return (
        <footer ref={containerRef} className="min-h-[60vh] w-full flex flex-col items-center justify-center relative overflow-hidden pb-32">

            {/* Visual Grid of Cubes */}
            <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-2xl px-4">
                {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="dead-cube w-4 h-4 md:w-6 md:h-6 bg-[#ff3333] shadow-[0_0_10px_#ff3333] opacity-0" />
                ))}
            </div>

            {/* Main CTA */}
            <div className="text-center relative z-20 mix-blend-screen">
                <Link to="/contact">
                    <h2 ref={textRef} className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 hover:text-[#ff3333] transition-colors cursor-pointer opacity-0 text-glow">
                        ESTABLISH UPLINK
                    </h2>
                </Link>

                <p className="font-mono text-[#ff3333] tracking-[0.5em] text-sm md:text-base mb-12 animate-pulse">
                    // WAITING_FOR_SIGNAL
                </p>

                <div className="flex justify-center gap-8 mb-12">
                    <Link to="/contact" className="px-8 py-3 border border-white/20 hover:border-[#ff3333] hover:bg-[#ff3333] hover:text-black transition-all font-bold tracking-widest text-xs">
                        SEND DATA
                    </Link>
                </div>

                {/* Social Uplinks */}
                <div className="flex gap-8 justify-center items-center">
                    <a href="https://www.linkedin.com/in/mishrax27/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff3333] hover:scale-110 transition-all duration-300">
                        <FaLinkedin size={32} />
                    </a>
                    <a href="https://github.com/MishraX" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff3333] hover:scale-110 transition-all duration-300">
                        <FaGithub size={32} />
                    </a>
                    <a href="https://www.instagram.com/duskmuffin/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff3333] hover:scale-110 transition-all duration-300">
                        <FaInstagram size={32} />
                    </a>
                </div>
            </div>

            {/* Circuit Lines Footer */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#333]">
                <div className="absolute top-0 left-0 w-40 h-full bg-[#ff3333] animate-circuit-slide blur-sm" />
            </div>

            <style>{`
                @keyframes circuit-slide {
                    0% { left: -20%; }
                    100% { left: 120%; }
                }
                .animate-circuit-slide {
                    animation: circuit-slide 3s infinite linear;
                }
            `}</style>
        </footer>
    );
};

export default ContactFooter;
