"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GenerativeArtLinesProps {
    className?: string;
    count?: number;
    baseHeight?: number;
    oscillationRange?: number;
}

/**
 * GenerativeArtLines - Elegant flowing curves animation
 * Creates a generative art visualization with smooth oscillating lines
 */
export const GenerativeArtLines = ({
    className,
    count = 15,
    baseHeight = 200,
    oscillationRange = 120,
}: GenerativeArtLinesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Initialize line data with unique phases
        const lines = Array.from({ length: count }, (_, i) => ({
            phase: (i / count) * Math.PI * 2,
            frequency: 0.5 + Math.random() * 0.5,
            amplitude: 0.3 + Math.random() * 0.7,
            speed: 0.01 + Math.random() * 0.02,
        }));

        const resize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", resize);
        resize();

        let time = 0;

        const animate = () => {
            time += 0.016; // ~60fps
            ctx.clearRect(0, 0, width, height);

            lines.forEach((line, i) => {
                // Calculate base position
                const baseX = (width / (count + 1)) * (i + 1);

                // Create flowing curve using bezier-like paths
                ctx.beginPath();

                const segments = 50;
                for (let j = 0; j <= segments; j++) {
                    const t = j / segments;
                    const y = t * height;

                    // Multi-frequency oscillation for organic feel
                    const wave1 = Math.sin(y * 0.01 * line.frequency + time * line.speed * 60 + line.phase);
                    const wave2 = Math.sin(y * 0.02 * line.frequency + time * line.speed * 30 + line.phase * 0.5) * 0.5;
                    const wave3 = Math.sin(y * 0.005 + time * line.speed * 20) * 0.3;

                    const offset = (wave1 + wave2 + wave3) * oscillationRange * line.amplitude * 0.3;
                    const x = baseX + offset;

                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                // Gradient-like alpha based on position
                const alpha = 0.15 + (Math.sin(time + line.phase) * 0.5 + 0.5) * 0.25;
                ctx.strokeStyle = `rgba(43, 95, 111, ${alpha})`; // Teal color
                ctx.lineWidth = 1.5;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [count, baseHeight, oscillationRange]);

    return (
        <div ref={containerRef} className={cn("w-full h-full", className)}>
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}

export default GenerativeArtLines;
