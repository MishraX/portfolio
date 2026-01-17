import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const laserRef = useRef(null);
    const canvasRef = useRef(null);

    // Matrix Code Background Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const fontSize = 14; // Bigger text
        const columns = Math.ceil(canvas.width / fontSize);
        const drops = Array(columns).fill(1).map(() => Math.random() * -100); // Random starts

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ff3333'; // Red text
            ctx.font = `${fontSize}px 'Share Tech Mono'`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Randomly "glitch" color
                if (Math.random() > 0.98) ctx.fillStyle = '#ffffff';
                else ctx.fillStyle = 'rgba(255, 51, 51, 0.5)';

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            // Occasional full screen glitch
            if (Math.random() > 0.99) {
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, canvas.width, 20);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Loader Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1; // Smooth, slow progress
            });
        }, 80); // Slower for visibility
        return () => clearInterval(timer);
    }, []);

    // Exit Sequence
    useEffect(() => {
        if (progress === 100) {
            const tl = gsap.timeline({
                onComplete: onComplete
            });

            // 1. Fade out Text & Bar
            tl.to(".loader-content", {
                opacity: 0,
                duration: 0.5,
                delay: 0.2
            });

            // 2. The Laser Open Effect
            // We expand the laser line horizontally, then "open" the curtain

            // Set initial state of laser (invisible horizontal line)
            tl.set(laserRef.current, {
                scaleX: 0,
                opacity: 1
            });

            // Zap across screen
            tl.to(laserRef.current, {
                scaleX: 1,
                duration: 0.4,
                ease: "power2.out"
            });

            // Open the page (Clip Path Animation on Container)
            // We simulate a "Split" or "Burn"
            // Let's do a "Scan Down" as explicitely working before, but faster ("Opening")
            // Or "Curtain Open" (Center -> Out)

            // Let's do Slide Up (Curtain Lift) - it's cleaner for "Lasers Opening" (laser moves up, content below)
            // Or Laser moves DOWN, content revealed ABOVE it?

            // I'll do: Laser moves Top -> Bottom, revealing content behind it.
            tl.to(laserRef.current, {
                top: "100%",
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: function () {
                    const progress = this.progress();
                    // Reveal content by clipping the BLACK BG
                    // 0% prog = full black (clipPath: 0 0, 100 0, 100 100, 0 100)
                    // 100% prog = no black (clipPath: 0 100, 100 100, 100 100, 0 100)
                    gsap.set(containerRef.current, {
                        clipPath: `polygon(0 ${progress * 100}%, 100% ${progress * 100}%, 100% 100%, 0 100%)`
                    });
                }
            }, "+=0.1");

        }
    }, [progress, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-screen h-screen z-[9999] bg-black flex flex-col items-center justify-center font-['Orbitron'] overflow-hidden"
        >
            {/* Matrix Background - FULL VISIBILITY */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-100" />

            {/* Laser Element */}
            <div
                ref={laserRef}
                className="absolute top-0 left-0 w-full h-[4px] bg-[#ff3333] shadow-[0_0_50px_#ff3333] z-50 opacity-0"
            />

            {/* Loading Content */}
            <div className="loader-content w-full max-w-2xl px-8 flex flex-col items-center gap-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white animate-pulse" style={{ textShadow: "0 0 20px #ff3333" }}>
                    ENTERING AI PRODUCT PROTOCOL
                </h1>

                {/* Long Clean Rectangle Bar */}
                <div className="w-full h-2 bg-[#1a1a1a] border border-[#ff3333]/30 relative overflow-hidden">
                    <div
                        className="h-full bg-[#ff3333] shadow-[0_0_15px_#ff3333] transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between w-full text-xs font-mono text-[#ff3333] tracking-widest relative z-20">
                    <span className="glitch" data-text="SYSTEM_INITIALIZING...">SYSTEM_INITIALIZING...</span>
                    <span className="glitch" data-text={`${progress}%`}>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
