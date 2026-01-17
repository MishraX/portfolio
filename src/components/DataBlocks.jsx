import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

const DataBlocks = forwardRef((props, ref) => {
    const containerRef = useRef(null);

    useImperativeHandle(ref, () => ({
        animateIn: (onComplete) => {
            const blocks = containerRef.current.children;
            gsap.set(containerRef.current, { zIndex: 9999 }); // Bring to front

            gsap.fromTo(blocks,
                { scaleY: 0, transformOrigin: 'bottom' },
                {
                    scaleY: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'power4.inOut',
                    onComplete: onComplete
                }
            );
        },
        animateOut: () => {
            const blocks = containerRef.current.children;
            gsap.to(blocks, {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 0.8,
                stagger: 0.05,
                ease: 'power4.inOut',
                onComplete: () => {
                    gsap.set(containerRef.current, { zIndex: -1 });
                }
            });
        }
    }));

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 flex pointer-events-none"
            style={{ zIndex: -1 }} // Hidden initially
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="flex-1 bg-[#ff3333] h-full border-r border-[#000000]/20 last:border-r-0 relative"
                >
                    <div className="absolute inset-0 bg-[#000000]/10 pattern-grid" />
                </div>
            ))}
        </div>
    );
});

export default DataBlocks;
