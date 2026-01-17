import React, { useRef, useEffect } from 'react';
import { resumeData } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperiencePage = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Line Animation (Grow down)
            if (lineRef.current) {
                gsap.from(lineRef.current, {
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: 2,
                    ease: "power3.inOut"
                });
            }

            // 2. Nodes Animation
            const nodes = gsap.utils.toArray('.exp-node');
            if (nodes.length > 0) {
                nodes.forEach((node, i) => {
                    gsap.from(node, {
                        scrollTrigger: {
                            trigger: node,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        x: i % 2 === 0 ? -100 : 100,
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out"
                    });
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    if (!resumeData || !resumeData.experience) return <div className="p-20 text-red-500">DATA_CORRUPTION_DETECTED</div>;

    return (
        <div ref={containerRef} className="min-h-screen w-full pt-32 pb-20 px-4 relative overflow-hidden bg-black">

            {/* Header */}
            <div className="text-center mb-24 relative z-10">
                <div className="text-[#ff9900] font-mono text-xs tracking-[0.5em] mb-4 animate-pulse">
                    // DATA_LOG_ACCESS
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter glow-text">
                    CAREER <span className="text-[#ff9900]">TIMELINE</span>
                </h1>
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto">

                {/* Central Beam */}
                <div
                    ref={lineRef}
                    className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] md:-ml-[1px] bg-gradient-to-b from-[#ff3333] via-[#ff9900] to-[#ff3333] shadow-[0_0_15px_#ff9900] z-0"
                />

                {/* Nodes */}
                <div className="flex flex-col gap-12 md:gap-24">
                    {resumeData.experience.map((exp, i) => (
                        <div
                            key={i}
                            className={`exp-node relative flex items-center w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Spacer for Desktop Centering */}
                            <div className="hidden md:block w-1/2" />

                            {/* Connection Dot */}
                            <div className="absolute left-[-5px] md:left-1/2 md:-ml-[6px] w-3 h-3 md:w-3 md:h-3 bg-[#050505] border border-[#ff9900] rounded-full z-10 shadow-[0_0_10px_#ff9900]">
                                <div className="absolute inset-0 bg-[#ff9900] animate-ping opacity-75 rounded-full" />
                            </div>

                            {/* Connection Line (Mobile) */}
                            <div className="md:hidden absolute left-0 w-8 h-[1px] bg-[#ff9900]/50" />

                            {/* Card Canvas */}
                            <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                <div className="group relative bg-black/60 border border-[#ff3333]/30 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#ff9900] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,153,0,0.2)] overflow-hidden">

                                    {/* Scanline Effect */}
                                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[#ff9900]/20 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[200%]" />

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ff3333] group-hover:border-[#ff9900] transition-colors" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ff3333] group-hover:border-[#ff9900] transition-colors" />

                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-[#ff9900] transition-colors">
                                                {exp.role}
                                            </h3>
                                            <div className="text-[#ff3333] group-hover:text-[#ff9900] font-mono text-sm tracking-widest mt-1">
                                                @{exp.company}
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono border border-white/10 px-2 py-1 bg-white/5 group-hover:bg-[#ff9900]/10 group-hover:border-[#ff9900]/50 transition-all text-gray-400 group-hover:text-[#ff9900]">
                                            {exp.period}
                                        </div>
                                    </div>

                                    {/* List */}
                                    <ul className="space-y-3 relative z-10">
                                        {exp.achievements && exp.achievements.map((item, k) => (
                                            <li key={k} className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-100 transition-colors">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-[#ff3333] group-hover:bg-[#ff9900] transition-colors shadow-[0_0_5px_#ff3333] group-hover:shadow-[0_0_5px_#ff9900]" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Data */}
            <div className="fixed bottom-4 right-4 text-[10px] font-mono text-[#ff9900]/50 tracking-widest pointer-events-none">
                 // SYNCING_EXTERNAL_DATABASES...
            </div>
        </div>
    );
};

export default ExperiencePage;
