import React, { useEffect, useRef } from 'react';

const CircuitBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.alpha = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(255, 51, 51, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = Array.from({ length: 50 }, () => new Particle());

        // Circuit Lines
        // Simple Grid-like lines moving
        const lines = [];
        for (let i = 0; i < 10; i++) {
            lines.push({
                y: Math.random() * canvas.height,
                speed: Math.random() * 1 + 0.5,
                width: Math.random() * 100 + 50
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clean clear

            // Draw Lines
            ctx.fillStyle = "rgba(255, 51, 51, 0.15)"; // Brighter static lines
            lines.forEach(line => {
                line.y += line.speed * 0.2;
                if (line.y > canvas.height) line.y = 0;
                ctx.fillRect(0, line.y, canvas.width, 2); // Thicker lines
            });

            // Particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            frame = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-[-1] bg-[#050505] pointer-events-none"
        />
    );
};

export default CircuitBackground;
