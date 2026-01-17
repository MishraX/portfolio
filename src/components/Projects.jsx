import React, { useState } from 'react';
import { resumeData } from '../data';

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);

    const toggleProject = (index) => {
        if (activeProject === index) {
            setActiveProject(null);
        } else {
            setActiveProject(index);
        }
    };

    return (
        <section className="py-20 px-4 md:px-20 w-full">
            <div className="mb-20 border-b border-[#ff3333]/20 pb-8 max-w-6xl mx-auto">
                <h2 className="text-4xl text-white font-bold tracking-widest">ACTIVE MODULES</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {resumeData.projects.map((proj, i) => (
                    <div
                        key={i}
                        className="group h-[500px] perspective-1000 cursor-pointer"
                        onClick={() => toggleProject(i)}
                    >
                        {/* 3D Card Wrapper */}
                        <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${activeProject === i ? 'rotate-y-180' : 'group-hover:rotate-y-180'}`}>

                            {/* FRONT FACE */}
                            <div className="absolute inset-0 w-full h-full bg-black/90 border border-[#ff3333]/30 p-8 flex flex-col justify-between backface-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#ff3333]/50" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff3333]" />

                                <div>
                                    <div className="text-[#ff3333] font-mono text-xs tracking-widest mb-4 border border-[#ff3333]/20 inline-block px-2 py-1">
                                        // MODULE_0{i + 1}
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-2 uppercase leading-none">
                                        {proj.title}
                                    </h3>
                                    <div className="text-gray-400 font-mono text-sm mb-4 italic">
                                        {proj.role}
                                    </div>
                                    <div className="text-gray-500 text-xs font-mono uppercase">
                                        {proj.period}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-400 text-sm line-clamp-4">
                                        {proj.desc}
                                    </p>
                                    <div className="text-[#ff3333] text-xs font-bold tracking-widest animate-pulse mt-4">
                                        [ HOVER / TAP TO DECRYPT ]
                                    </div>
                                </div>
                            </div>

                            {/* BACK FACE */}
                            <div className="absolute inset-0 w-full h-full bg-[#111] border border-[#ff3333] p-8 rotate-y-180 backface-hidden flex flex-col overflow-y-auto custom-scrollbar">
                                <div className="text-white font-bold text-xl mb-6 border-b border-gray-700 pb-2">
                                    {'>'} SYSTEM_LOGS
                                </div>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {proj.details && proj.details.map((detail, k) => (
                                        <li key={k} className="text-gray-300 text-sm font-mono flex gap-3">
                                            <span className="text-[#ff3333]">{'>'}</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {proj.tech.map((t, k) => (
                                        <span key={k} className="text-[10px] px-2 py-1 bg-[#ff3333]/10 border border-[#ff3333]/30 text-[#ff3333]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                
                /* Custom Scrollbar for back of card */
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { bg: #000; }
                .custom-scrollbar::-webkit-scrollbar-thumb { bg: #ff3333; }
            `}</style>
        </section>
    );
};

export default Projects;
