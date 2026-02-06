"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GenerativeLinesProps {
    className?: string;
    count?: number;
    strokeColor?: string;
    baseHeight?: number;
    oscillationRange?: number;
}

/**
 * GenerativeLines - A high-performance canvas animation 
 * depicting oscillating vertical lines.
 */
export const GenerativeLines = ({
    className,
    count = 12,
    strokeColor = "rgba(43, 95, 111, 0.4)", // suburban-security teal
    baseHeight = 150,
    oscillationRange = 100,
}: GenerativeLinesProps) => {
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

        // Physics state
        const lines = Array.from({ length: count }, () => ({
            y: 0,
            velocity: 0,
            targetY: 0,
            noiseOffset: Math.random() * 1000,
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
            time += 0.01;
            ctx.clearRect(0, 0, width, height);

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";

            const spacing = width / (count + 1);

            lines.forEach((line, i) => {
                const x = spacing * (i + 1);
                const oscillation =
                    Math.sin(time + line.noiseOffset) * 0.5 +
                    Math.sin(time * 0.5 + line.noiseOffset * 0.8) * 0.3 +
                    Math.sin(time * 1.5 + line.noiseOffset * 1.2) * 0.2;

                const currentLineHeight = baseHeight + (oscillation * oscillationRange);

                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, currentLineHeight);

                const alpha = 0.2 + (Math.abs(oscillation) * 0.3);
                ctx.strokeStyle = strokeColor.replace(/[\d.]+\)$/, `${alpha})`);
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [count, strokeColor, baseHeight, oscillationRange]);

    return (
        <div ref={containerRef} className={cn("w-full h-full", className)}>
            <canvas ref={canvasRef} className="block" />
        </div>
    );
};
