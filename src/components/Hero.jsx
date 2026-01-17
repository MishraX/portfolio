import React, { useEffect, useRef } from 'react';
import { resumeData } from '../data';
import gsap from 'gsap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DisintegratingText from './DisintegratingText';

const Hero = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { transition } = useOutletContext(); // Access DataBlocks ref

    const handleInitialize = () => {
        if (transition && transition.current) {
            transition.current.animateIn(() => {
                navigate('/story');
                // Optional: Animate out logic is handled by next page or we leave it covered?
                // Usually next page should animate out. 
                // For now, let's auto animate out after a slight delay to reveal the new page
                setTimeout(() => {
                    transition.current.animateOut();
                }, 100);
            });
        } else {
            navigate('/story');
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                delay: 0.5 // Wait for preloader reveal a bit
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            {/* HERO SECTION */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                <div className="hero-item text-sm md:text-base text-[#ff3333] font-mono tracking-[0.5em] mb-4 uppercase">
                    System Protocol v3.0
                </div>
                <h1 className="hero-item text-5xl md:text-8xl font-black mb-6 tracking-tighter glow-text">
                    <div className="flex flex-col items-center">
                        <DisintegratingText>AI PRODUCT</DisintegratingText>
                        <DisintegratingText>MANAGER</DisintegratingText>
                    </div>
                </h1>
                <p className="hero-item text-gray-400 max-w-xl text-sm md:text-lg font-mono leading-relaxed">
                    {resumeData.about.desc}
                </p>

                <div className="hero-item mt-12 flex gap-6">
                    <button
                        onClick={handleInitialize}
                        className="px-8 py-3 border border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333] hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold box-glow cursor-pointer"
                    >
                        Initialize
                    </button>
                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white transition-all uppercase tracking-widest text-xs font-bold backdrop-blur-sm">
                        Access Data
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Hero;
