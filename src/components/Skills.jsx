import React, { useRef } from 'react';
import { resumeData } from '../data';
import gsap from 'gsap';

const Skills = () => {
    const containerRef = useRef(null);

    const handleSkillClick = (e, index) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();

        // 1. GRAVITY FALL (The Box Itself)
        // Unhinge it and drop it
        gsap.to(target, {
            y: window.innerHeight + 100,
            rotation: Math.random() * 90 - 45, // Slight tilt
            opacity: 0,
            duration: 1.5,
            ease: "power2.in"
        });

        // 2. DISINTEGRATION PARTICLES
        // Spawn debris from the box position
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            // Randomly style debris (red or white bits)
            const size = Math.random() * 8 + 4;
            particle.style.position = 'fixed';
            // Start scattered within the box area
            particle.style.left = `${rect.left + Math.random() * rect.width}px`;
            particle.style.top = `${rect.top + Math.random() * rect.height}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = Math.random() > 0.5 ? '#ff3333' : '#fff';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = 9999;

            document.body.appendChild(particle);

            // Explosive Physics
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 300, // Explode outward
                y: (Math.random() - 0.5) * 300 + 500, // Fall down eventually
                rotation: Math.random() * 720,
                opacity: 0,
                duration: 1 + Math.random(),
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    };

    return (
        <section ref={containerRef} className="py-32 px-4 w-full relative overflow-hidden">

            {/* Hint Text */}
            <div className="absolute top-10 w-full text-center text-[10px] font-mono text-gray-500 animate-pulse tracking-widest">
                [ CAUTION: STRUCTURAL INTEGRITY COMPROMISED - CLICK TO TEST ]
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-24 text-center text-white tracking-tighter relative z-10">
                CORE <span className="text-[#ff3333]">CAPABILITIES</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto relative z-10 px-4">
                {resumeData.skills.map((skill, i) => (
                    <div
                        key={i}
                        onClick={(e) => handleSkillClick(e, i)}
                        className="relative cursor-pointer w-32 h-32 md:w-48 md:h-48 bg-[#0a0a0a] border border-[#333] hover:border-[#ff3333] transition-colors duration-300 flex flex-col items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(255,51,51,0.15)] p-4 text-center"
                    >
                        {/* Corner Brackets */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-600 group-hover:border-[#ff3333]" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-600 group-hover:border-[#ff3333]" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-600 group-hover:border-[#ff3333]" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-600 group-hover:border-[#ff3333]" />

                        {/* Text Content (No numbers) */}
                        <div className="text-white font-bold font-mono text-sm md:text-base group-hover:text-[#ff3333] transition-colors uppercase tracking-wider">
                            {skill.name}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Skills;
