import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;

        // GSAP QuickSetter for performance
        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");
        const rotSet = gsap.quickSetter(cursor, "rotation", "deg");

        // Mouse Move
        const onMouseMove = (e) => {
            xSet(e.clientX);
            ySet(e.clientY);

            // Optional: Rotate based on movement? For now static orientation
        };

        // Click Animation
        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.8, duration: 0.1 });
        };
        const onMouseUp = () => {
            gsap.to(cursor, { scale: 1, duration: 0.1 });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[99999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="drop-shadow-[0_0_10px_#ff3333]"
            >
                {/* Isosceles Triangle pointing Top-Leftish or Up */}
                <polygon points="12,2 22,22 2,22" fill="#ff3333" />
            </svg>
        </div>
    );
};

export default CustomCursor;
