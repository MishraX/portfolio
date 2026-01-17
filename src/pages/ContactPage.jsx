import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// A detailed Mecha-Sentinel that looks like a heavy laser platform
const HyperSentinel = ({ id }) => {
    return (
        <g id={id} className="sentinel-unit">
            {/* 1. CENTRAL REACTOR CORE (The Heart) */}
            <g className="sentinel-core">
                <circle r="25" fill="#111" stroke="#ff3333" strokeWidth="2" />
                <circle r="15" fill="#ff3333" fillOpacity="0.2" className="animate-pulse" />
                <circle r="8" fill="#fff" fillOpacity="0.8" className="animate-ping" style={{ animationDuration: '3s' }} />
            </g>

            {/* 2. HEAVY ARMOR PLATES (The Body) - 4 Quadrants */}
            <g className="sentinel-armor">
                {/* Top Plate */}
                <path d="M -30 -35 L 30 -35 L 20 -20 L -20 -20 Z" fill="#0f0f0f" stroke="#333" strokeWidth="1" className="armor-piece" />
                {/* Bottom Plate */}
                <path d="M -30 35 L 30 35 L 20 20 L -20 20 Z" fill="#0f0f0f" stroke="#333" strokeWidth="1" className="armor-piece" />
                {/* Left Plate */}
                <path d="M -45 -30 L -25 -20 L -25 20 L -45 30 L -55 0 Z" fill="#151515" stroke="#ff3333" strokeWidth="1" className="armor-piece" />
                {/* Right Plate */}
                <path d="M 45 -30 L 25 -20 L 25 20 L 45 30 L 55 0 Z" fill="#151515" stroke="#ff3333" strokeWidth="1" className="armor-piece" />
            </g>

            {/* 3. LASER CANNON ASSEMBLY (The Weapon) */}
            <g className="sentinel-cannon" transform="translate(0, 40)">
                {/* Main Barrel */}
                <rect x="-10" y="-10" width="20" height="60" fill="#222" stroke="#444" className="cannon-part" />
                {/* Cooling Fins */}
                <rect x="-15" y="10" width="30" height="5" fill="#ff3333" className="cannon-part" />
                <rect x="-15" y="20" width="30" height="5" fill="#ff3333" className="cannon-part" />
                <rect x="-15" y="30" width="30" height="5" fill="#ff3333" className="cannon-part" />
                {/* Muzzle */}
                <rect x="-12" y="50" width="24" height="10" fill="#111" stroke="#ff3333" className="cannon-muzzle" />
            </g>

            {/* 4. FLOATING DEBRIS/FIELD (The Void Residue) */}
            {[...Array(12)].map((_, i) => (
                <rect
                    key={i}
                    x={(Math.random() - 0.5) * 120}
                    y={(Math.random() - 0.5) * 120}
                    width={Math.random() * 8 + 2}
                    height={Math.random() * 8 + 2}
                    fill={Math.random() > 0.5 ? '#ff3333' : '#333'}
                    className="sentinel-debris"
                />
            ))}
        </g>
    );
};

const ContactPage = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [formVisible, setFormVisible] = useState(false);

    // Refs
    const machineLeftRef = useRef(null);
    const machineRightRef = useRef(null);
    const laserLeftRef = useRef(null);
    const laserRightRef = useRef(null);
    const textMaskRef = useRef(null);
    const fullTextRef = useRef(null); // Reference to the container of the text for bounds

    // State for random machine positions
    const [machinePos, setMachinePos] = useState({ left: { x: 100, y: 100 }, right: { x: 800, y: 100 } });

    // 1. Initialize Random Positions on Mount (Constrained to corners)
    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setMachinePos({
            // X: Keep in outer 15% to avoid text overlap
            // Y: Keep in upper 30%
            left: {
                x: Math.random() * (w * 0.15),
                y: 100 + Math.random() * (h * 0.2)
            },
            right: {
                x: w - (Math.random() * (w * 0.15)),
                y: 100 + Math.random() * (h * 0.2)
            }
        });
    }, []);

    // 2. Particle System (Sparks) - UNCHANGED but optimized
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 8; // Faster explosion
                this.vy = (Math.random() * -8) - 4; // Higher pop
                this.gravity = 0.4;
                this.life = 1.0;
                this.color = Math.random() > 0.5 ? '#ff3333' : '#ffffff'; // White/Red sparks
                this.size = Math.random() * 3 + 1;
            }
            update() {
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.life -= 0.015;

                // Floor bounce
                if (this.y > canvas.height * 0.9) {
                    this.y = canvas.height * 0.9;
                    this.vy *= -0.5;
                    this.vx *= 0.8;
                }
            }
            draw(ctx) {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw(ctx);
                if (p.life <= 0) particles.splice(i, 1);
            });
            animationFrame = requestAnimationFrame(loop);
        };
        loop();

        window.emitContactSparks = (x, y) => {
            for (let i = 0; i < 5; i++) particles.push(new Particle(x, y));
        };

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
            delete window.emitContactSparks;
        };
    }, []);

    // 3. MAIN ANIMATION TIMELINE (Prolonged & Complex)
    useEffect(() => {
        if (!fullTextRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => setFormVisible(true),
                defaults: { ease: "power2.inOut" }
            });

            // PHASE 1: VOID ASSEMBLY (3 Seconds)
            // Explode all parts outwards initially
            // Armor Pieces
            tl.from(".armor-piece", {
                x: () => (Math.random() - 0.5) * 400,
                y: () => (Math.random() - 0.5) * 400,
                rotation: () => Math.random() * 360,
                opacity: 0,
                scale: 0,
                duration: 2.5,
                stagger: 0.1,
                ease: "expo.out"
            }, 0);

            // Cannon Parts (Delay slightly)
            tl.from(".cannon-part, .cannon-muzzle", {
                y: -100, // Drop down from core
                opacity: 0,
                duration: 2,
                stagger: 0.1,
                ease: "back.out(2)"
            }, 0.5);

            // Core (Spin in)
            tl.from(".sentinel-core", {
                scale: 0,
                rotation: -720,
                duration: 3,
                ease: "elastic.out(1, 0.3)"
            }, 0);

            // Debris Cloud (Swirl in)
            tl.from(".sentinel-debris", {
                x: () => (Math.random() - 0.5) * 600,
                y: () => (Math.random() - 0.5) * 600,
                opacity: 0,
                duration: 2,
                ease: "power4.out"
            }, 0);


            // PHASE 2: ALIGN & PREPARE (1 Second)
            const textRect = fullTextRef.current.getBoundingClientRect();
            const textY = textRect.top + textRect.height / 2;
            const startX = textRect.left;
            const endX = textRect.right;
            const width = textRect.width;

            // Rotate Cannons to aim (Simulated by container rotation or just aiming line)
            // Ideally we'd rotate the Sentinel group, but let's keep it simple: 
            // Just move the Lasers to position.

            tl.to([laserLeftRef.current, laserRightRef.current], {
                opacity: 1,
                duration: 0.5,
                attr: { y2: textY }
            }, "-=0.5");

            // Aim Lasers
            tl.to(laserLeftRef.current, { attr: { x2: startX }, duration: 0.5 }, "<");
            tl.to(laserRightRef.current, { attr: { x2: endX }, duration: 0.5 }, "<");

            // Recoil Animation (Cannon kicks back)
            tl.to(".sentinel-cannon", { y: 30, duration: 0.1, yoyo: true, repeat: 1 }, "<+0.4");


            // PHASE 3: ETCHING (4 Seconds)
            const etchObj = { val: 0 };

            tl.to(etchObj, {
                val: 1,
                duration: 4,
                ease: "none",
                onUpdate: () => {
                    const p = etchObj.val;
                    const burnLeftX = startX + (width / 2) * p;
                    const burnRightX = endX - (width / 2) * p;

                    // Update Lasers
                    gsap.set(laserLeftRef.current, { attr: { x2: burnLeftX } });
                    gsap.set(laserRightRef.current, { attr: { x2: burnRightX } });

                    // Update Text Mask
                    const leftPct = p * 50;
                    const rightPct = 100 - (p * 50);

                    gsap.set(textMaskRef.current, {
                        clipPath: `polygon(
                            0% 0%, ${leftPct}% 0%, ${leftPct}% 100%, 0% 100%,
                            ${rightPct}% 0%, 100% 0%, 100% 100%, ${rightPct}% 100%
                        )`
                    });

                    // Emit Sparks
                    if (window.emitContactSparks && Math.random() > 0.1) {
                        window.emitContactSparks(burnLeftX, textY + (Math.random() - 0.5) * 20);
                        window.emitContactSparks(burnRightX, textY + (Math.random() - 0.5) * 20);
                    }
                }
            });

            // PHASE 4: DISENGAGE
            tl.to([laserLeftRef.current, laserRightRef.current], {
                opacity: 0,
                duration: 0.5
            });

            // Sentinels fly away or power down
            tl.to([machineLeftRef.current, machineRightRef.current], {
                y: "-=50",
                opacity: 0.5,
                duration: 2,
                ease: "power2.inOut"
            });

            tl.to(".contact-header", {
                textShadow: "0 0 30px #ff3333, 0 0 10px white",
                color: "white",
                duration: 0.2,
                yoyo: true,
                repeat: 5
            });

        }, containerRef);
        return () => ctx.revert();
    }, [machinePos]); // Re-run if pos changes (on mount)

    return (
        <div ref={containerRef} className="min-h-screen w-full relative bg-black overflow-hidden font-mono flex flex-col items-center justify-center">

            {/* Spark Canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />

            {/* SVG Container used for Lasers & Machines */}
            <svg className="fixed inset-0 w-full h-full pointer-events-none z-40">
                <defs>
                    <filter id="laser-glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feFlood floodColor="#ff3333" result="color" />
                        <feComposite in="color" in2="blur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Left Machine */}
                <g ref={machineLeftRef} transform={`translate(${machinePos.left.x}, ${machinePos.left.y})`}>
                    <HyperSentinel id="sentinel-L" />
                </g>

                {/* Right Machine */}
                <g ref={machineRightRef} transform={`translate(${machinePos.right.x}, ${machinePos.right.y})`}>
                    <HyperSentinel id="sentinel-R" />
                </g>

                {/* Lasers (Origin offset to match Cannon Muzzle: 0, 100) */}
                <line
                    ref={laserLeftRef}
                    x1={machinePos.left.x} y1={machinePos.left.y + 100}
                    x2={machinePos.left.x} y2={machinePos.left.y + 100}
                    stroke="#ff3333" strokeWidth="2" filter="url(#laser-glow)"
                    opacity="0"
                />
                <line
                    ref={laserRightRef}
                    x1={machinePos.right.x} y1={machinePos.right.y + 100}
                    x2={machinePos.right.x} y2={machinePos.right.y + 100}
                    stroke="#ff3333" strokeWidth="2" filter="url(#laser-glow)"
                    opacity="0"
                />
            </svg>

            {/* Content Layer */}
            <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-[35vh] md:pt-[30vh]">

                {/* The Text Being Etched */}
                <div ref={fullTextRef} className="relative mb-12 md:mb-20 p-4">
                    {/* Placeholder Ghost Text (Visible traces) */}
                    <h1 className="absolute top-4 left-4 text-4xl md:text-8xl font-black text-[#1a1a1a] tracking-tighter w-full text-center select-none">
                        CONTACT_ME
                    </h1>

                    {/* The Real Text (Masked) */}
                    <h1
                        ref={textMaskRef}
                        className="contact-header relative text-4xl md:text-8xl font-black text-[#ff3333] tracking-tighter w-full text-center"
                        style={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
                    >
                        CONTACT_ME
                    </h1>
                </div>

                {/* The Form */}
                <div className={`transition-all duration-1000 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} w-full max-w-xl`}>
                    <div className="bg-[#0a0a0a] border border-[#333] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {/* 
                           FORMSPREE SETUP:
                           1. Go to https://formspree.io/
                           2. Create a new form
                           3. Replace 'YOUR_ID_HERE' below with the ID they give you (e.g. 'xvnggqzv')
                        */}
                        <form
                            action="https://formspree.io/f/xaqqqpzv"
                            method="POST"
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-[#ff9900] tracking-widest pl-2">// IDENTITY</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-[#111] border border-[#333] p-4 text-white focus:border-[#ff3333] focus:outline-none focus:shadow-[0_0_20px_rgba(255,51,51,0.2)] transition-all"
                                        placeholder="NAME"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-[#ff9900] tracking-widest pl-2">// FREQUENCY</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-[#111] border border-[#333] p-4 text-white focus:border-[#ff3333] focus:outline-none focus:shadow-[0_0_20px_rgba(255,51,51,0.2)] transition-all"
                                        placeholder="EMAIL"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-[#ff9900] tracking-widest pl-2">// TRANSMISSION</label>
                                <textarea
                                    name="message"
                                    rows="6"
                                    required
                                    className="w-full bg-[#111] border border-[#333] p-4 text-white focus:border-[#ff3333] focus:outline-none focus:shadow-[0_0_20px_rgba(255,51,51,0.2)] transition-all"
                                    placeholder="DATA_PACKET..."
                                />
                            </div>

                            <button type="submit" className="group w-full py-4 bg-[#ff3333] text-black font-bold tracking-[0.2em] hover:bg-white transition-all duration-300 relative overflow-hidden cursor-pointer">
                                <span className="relative z-10">INITIATE_UPLINK</span>
                                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
