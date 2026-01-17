import React from 'react';

const About = () => {
    return (
        <section className="min-h-screen py-32 px-4 md:px-20 w-full flex flex-col md:flex-row items-center gap-20 relative overflow-hidden">

            {/* LANYARD / HANGING CARD SECTION */}
            <div className="relative w-full md:w-1/3 h-[600px] flex justify-center">
                {/* The String */}
                <div className="absolute top-[-200px] left-1/2 w-1 h-[300px] bg-gradient-to-b from-[#111] to-[#333] z-10 origin-top animate-pendulum-string" />

                {/* The Card */}
                <div className="relative top-[100px] w-80 bg-black border-2 border-[#ff3333] p-6 shadow-[0_0_50px_rgba(255,51,51,0.2)] animate-pendulum-card origin-top-center backdrop-blur-xl z-20">
                    {/* Holographic Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                    {/* Clip / Lanyard Hole */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-8 bg-[#111] border border-[#333] rounded-t-lg z-30" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-[#555] z-40" />

                    {/* ID Photo */}
                    <div className="w-full aspect-square border-2 border-dashed border-[#ff3333]/50 mb-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#ff3333]/10" />

                        {/* 
                           TO ADD YOUR PHOTO:
                           1. Create a file named 'profile.jpg' 
                           2. Place it in the 'public' folder of your project
                           3. The image will automatically load below
                        */}
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />

                        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff3333]/50 animate-scan-vertical pointer-events-none" />

                        {/* Fallback Text if no image */}
                        <div className="w-full h-full grid place-items-center text-[#ff3333] font-mono text-center text-xs -z-10">
                            [ BIOMETRIC <br /> IMAGE ]
                        </div>
                    </div>

                    {/* ID Details */}
                    <div className="space-y-4 font-mono">
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Admin</div>
                            <div className="text-xl text-white font-bold">SURAJ MISHRA</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Clearance</div>
                            <div className="text-lg text-[#ff3333]">LEVEL 4 / AI PRODUCT MANAGER</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Active Since</div>
                            <div className="text-white">2022</div>
                        </div>

                        {/* Barcode / Decor */}
                        <div className="h-8 w-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Code_128_bar_code_Hello.svg/1200px-Code_128_bar_code_Hello.svg.png')] bg-cover opacity-50 mix-blend-screen mt-4" />
                    </div>
                </div>
            </div>

            {/* BIO TEXT SECTION */}
            <div className="relative w-full md:w-2/3 text-left">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter">
                    IDENTITY <span className="text-stroke-red text-transparent">VERIFIED</span>
                </h2>

                <div className="space-y-8 text-lg md:text-xl text-gray-400 leading-relaxed font-sans border-l-2 border-[#ff3333] pl-8">
                    <p>
                        Operating at the intersection of <span className="text-white font-bold">Artificial Intelligence</span> and <span className="text-white font-bold">Product Strategy</span>.
                    </p>
                    <p>
                        My directive is to orchestrate complex digital systems, transforming chaotic data streams into elegant, user-centric architectures.
                        With a foundation in full-stack engineering and a vision for autonomous futures, I build tools that don't just function—they evolve.
                    </p>
                    <p className="text-[#ff3333] font-mono text-sm tracking-widest">
                        // CURRENT STATUS: ONLINE
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pendulum {
                    0%, 100% { transform: rotate(2deg); }
                    50% { transform: rotate(-2deg); }
                }
                .animate-pendulum-card {
                    animation: pendulum 6s infinite ease-in-out;
                    transform-origin: top center;
                }
                @keyframes scan-vertical {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                .animate-scan-vertical {
                    animation: scan-vertical 2s linear infinite;
                }
                .text-stroke-red {
                    -webkit-text-stroke: 1px #ff3333;
                }
            `}</style>
        </section>
    );
};

export default About;
