import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Helper to split text into chars for animation
const GlitchChar = ({ char, delay }) => {
    const charRef = useRef(null);

    useEffect(() => {
        // Initial State: Blue
        gsap.set(charRef.current, { color: '#00eeff' });

        // Infection: Random chance to turn Red permanently
        const tl = gsap.timeline({ delay: delay + Math.random() * 2, repeat: -1, repeatDelay: Math.random() * 5 });

        // Glitch Flash
        tl.to(charRef.current, {
            color: '#fff',
            textShadow: '0 0 10px #fff',
            duration: 0.05,
            onComplete: () => {
                // 50% chance to stay Red after flash
                if (Math.random() > 0.1) {
                    gsap.set(charRef.current, {
                        color: '#ff3333',
                        textShadow: '0 0 5px #ff3333'
                    });
                } else {
                    gsap.set(charRef.current, {
                        color: '#00eeff',
                        textShadow: '0 0 5px #00eeff'
                    });
                }
            }
        });

    }, [delay]);

    return <span ref={charRef} className="inline-block min-w-[0.3em]">{char}</span>;
};

const TextBlock = ({ text }) => {
    return (
        <p className="mb-6 leading-relaxed">
            {text.split("").map((char, i) => (
                <GlitchChar key={i} char={char} delay={i * 0.01} />
            ))}
        </p>
    );
};

const Story = () => {
    const containerRef = useRef(null);

    // Particle Spawner Logic
    useEffect(() => {
        const interval = setInterval(() => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const particle = document.createElement('div');

            // Spawn at the "eroding" right edge
            // Random Y along the height
            const spawnY = Math.random() * rect.height;

            particle.style.position = 'fixed';
            particle.style.left = `${rect.right - 50}px`; // Slightly inside
            particle.style.top = `${rect.top + spawnY}px`;
            particle.style.width = `${Math.random() * 10 + 2}px`;
            particle.style.height = `${Math.random() * 10 + 2}px`;
            particle.style.backgroundColor = '#ff3333';
            particle.style.boxShadow = '0 0 5px #ff3333';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = 40;

            document.body.appendChild(particle);

            // Animate falling into void
            gsap.to(particle, {
                x: 100 + Math.random() * 50,
                y: 500, // Fall down
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 1.5,
                ease: "power2.in",
                onComplete: () => particle.remove()
            });

        }, 50); // New particle every 50ms

        return () => clearInterval(interval);
    }, []);

    // Container Shake & Clip
    useEffect(() => {
        // Continuous Glitch Shake
        gsap.to(containerRef.current, {
            x: "random(-2, 2)",
            y: "random(-2, 2)",
            duration: 0.1,
            repeat: -1,
            ease: "none"
        });

        // Clip Path Erosion (Eating the right side)
        gsap.to(containerRef.current, {
            clipPath: "polygon(0 0, 85% 0, 75% 100%, 0 100%)",
            duration: 5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-20 relative overflow-hidden bg-black">

            {/* Background Chaos */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            {/* Main Story Container - Being Destroyed */}
            <div
                ref={containerRef}
                className="max-w-4xl bg-black/80 border-l-4 border-[#00eeff] p-8 md:p-16 relative shadow-[0_0_30px_rgba(0,238,255,0.1)] backdrop-blur-sm"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
                {/* Header */}
                <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase relative z-10 mix-blend-screen">
                    {/* Manual Split for Header */}
                    {"ORIGIN_STORY".split("").map((c, i) => (
                        <span key={i} className={`inline-block ${Math.random() > 0.5 ? 'text-[#00eeff]' : 'text-[#ff3333]'} animate-pulse`}>
                            {c}
                        </span>
                    ))}
                </h1>

                {/* Body Text */}
                <div className="font-mono text-lg md:text-xl relative z-10">
                    <TextBlock text="My story begins in Kolkata, a city painted in the vibrant hues of Durga Puja, where the air crackles with festive energy. This vibrant tapestry wove the backdrop of my early life, a foundation of vibrant chaos and creative fervor." />

                    <TextBlock text="Now, I find myself drawn to the serene elegance of Mysore, its majestic palaces offering a quiet counterpoint, a space for reflection amidst the bustling world of tech and global business." />

                    <TextBlock text="Here, amidst algorithms and case studies, I find a particular thrill in the boundless potential of robotics, high-fidelity design, and agentic AI." />
                </div>

                {/* Glitch Overlay Elements */}
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#ff3333]/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 text-xs font-mono text-[#ff3333] animate-bounce">
                    CRITICAL_FAILURE: SECTOR_UNSTABLE
                </div>
            </div>

        </div>
    );
};

export default Story;
