import React, { useRef, useEffect } from 'react';
import { resumeData } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".exp-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%", // Trigger much earlier for mobile
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-20 w-full relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[#ff3333] tracking-[0.2em] uppercase glow-text">
                EXPERIENCE LOGS
            </h2>

            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                {resumeData.experience.map((exp, i) => (
                    <div
                        key={i}
                        className="exp-card group relative border border-[#ff3333]/30 bg-black/40 backdrop-blur-md p-8 transition-all duration-500 hover:border-[#ff3333] hover:shadow-[0_0_30px_rgba(255,51,51,0.2)]"
                    >
                        {/* Lit up lighting effect: Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff3333]/0 via-[#ff3333]/10 to-[#ff3333]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-[#ff3333] transition-colors">
                                    {exp.role}
                                </h3>
                                <p className="text-sm font-mono text-[#ff3333]/80 tracking-widest mt-1">
                                    {exp.company}
                                </p>
                            </div>
                            <span className="text-xs font-mono border border-white/20 px-3 py-1 mt-2 md:mt-0">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-2 relative z-10">
                            {exp.achievements.map((item, k) => (
                                <li key={k} className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-gray-200">
                                    <span className="w-1 h-1 bg-[#ff3333]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
