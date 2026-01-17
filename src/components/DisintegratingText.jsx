import React, { useRef } from 'react';
import gsap from 'gsap';

const DisintegratingText = ({ children, className = "" }) => {
    // Only works for string children for now
    if (typeof children !== 'string') return <div className={className}>{children}</div>;

    const chars = children.split('');
    const containerRef = useRef(null);

    const activeTwens = useRef([]);

    const onEnter = () => {
        const charElements = containerRef.current.children;

        gsap.killTweensOf(charElements);

        gsap.to(charElements, {
            x: () => (Math.random() - 0.5) * 60, // Scatter Range
            y: () => (Math.random() - 0.5) * 60,
            rotation: () => Math.random() > 0.5 ? 90 : -90, // Blocky rotation
            opacity: 0.8,
            color: 'transparent',
            textShadow: 'none',
            webkitTextStroke: '1px #ff3333', // Hollow Look
            duration: 0.4,
            stagger: {
                amount: 0.2,
                from: "random"
            },
            ease: "power2.out"
        });
    };

    const onLeave = () => {
        const charElements = containerRef.current.children;

        gsap.to(charElements, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            color: 'inherit', // Restore original color
            webkitTextStroke: '0px transparent',
            duration: 0.6,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)"
        });
    };

    return (
        <div
            ref={containerRef}
            className={`inline-block cursor-default ${className}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            aria-label={children}
        >
            {chars.map((char, i) => (
                <span key={i} className="inline-block" style={{ transformOrigin: 'center' }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};

export default DisintegratingText;
