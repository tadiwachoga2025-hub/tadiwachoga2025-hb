"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ShieldCheck, MapPin, FileText, Globe, Radio, LayoutGrid, Heart, Zap, MessageSquare } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
    {
        id: "guardian",
        company: "Guardian Protection Services",
        headline: "Guardian Protection uses Suburban Security to automate patrol compliance and guard accountability across 12 commercial properties.",
        tags: [
            { icon: ShieldCheck, label: "Patrol Verification" },
            { icon: FileText, label: "Compliance Reports" },
            { icon: MapPin, label: "GPS Tracking" },
        ],
        quote: "Suburban Security automated our entire compliance workflow. We reduced missed patrols by 94% and cut manual reporting time from 40 hours to just 2 hours per week.",
        author: "Marcus Thompson",
        role: "Regional Security Director, Guardian Protection Services",
        activeSites: 12,
        cardType: "alignment",
        stats: [
            { label: "Patrol Compliance", value: 98, color: "#16b364" },
            { label: "Fleet Utilization", value: 94, color: "#3b82f6" },
            { label: "Incident Response", value: 92, color: "#FFC300" },
        ],
    },
    {
        id: "ironshield",
        company: "IronShield Security Group",
        headline: "IronShield manages 200+ guards across retail locations using Suburban Security's real-time dispatch and fleet tracking.",
        tags: [
            { icon: Radio, label: "Live Dispatch" },
            { icon: Globe, label: "Multi-Site Ops" },
            { icon: LayoutGrid, label: "Fleet Management" },
        ],
        quote: "With Suburban Security, our response times dropped 40%. We now have complete visibility into every guard, vehicle, and incident across all locations.",
        author: "Sarah Mitchell",
        role: "VP of Operations, IronShield Security Group",
        activeSites: 24,
        cardType: "dynamics",
        offices: [
            { code: "ATL", city: "Atlanta", status: "Active", color: "#16b364" },
            { code: "DAL", city: "Dallas", status: "High", color: "#3b82f6" },
            { code: "PHX", city: "Phoenix", status: "Peak", color: "#3b82f6" },
        ],
        velocity: "+40%"
    },
    {
        id: "fortress",
        company: "Fortress Industrial Security",
        headline: "Fortress tracks guard wellness, shift assignments, and incident quality for 18 industrial facilities using Suburban Security.",
        tags: [
            { icon: Heart, label: "Guard Welfare" },
            { icon: MessageSquare, label: "Incident Logging" },
        ],
        quote: "Suburban Security transformed how we manage our field teams. Guard retention improved 35% once we had tools to track workload and ensure proper shift coverage.",
        author: "David Okonkwo",
        role: "Chief Security Officer, Fortress Industrial Security",
        activeSites: 18,
        cardType: "health",
        healthstats: [
            { label: "Guard Retention", value: 96, color: "#16b364" },
            { label: "Incident Accuracy", value: 94, color: "#3b82f6" },
            { label: "Shift Coverage", value: 92, color: "#3b82f6" },
        ],
        conversations: "8 active incidents"
    }
];

// Falling dots animation configuration
const fallingDotsConfig = [
    { height: 280, delay: 0, opacity: 0.4, size: 8 },
    { height: 180, delay: 0.2, opacity: 0.5, size: 10 },
    { height: 320, delay: 0.4, opacity: 0.35, size: 8 },
    { height: 140, delay: 0.1, opacity: 0.45, size: 9 },
    { height: 240, delay: 0.5, opacity: 0.5, size: 10 },
    { height: 200, delay: 0.3, opacity: 0.4, size: 8 },
    { height: 160, delay: 0.6, opacity: 0.55, size: 11 },
    { height: 300, delay: 0.15, opacity: 0.35, size: 8 },
    { height: 120, delay: 0.45, opacity: 0.5, size: 9 },
    { height: 260, delay: 0.25, opacity: 0.4, size: 8 },
    { height: 220, delay: 0.55, opacity: 0.45, size: 10 },
    { height: 340, delay: 0.35, opacity: 0.3, size: 8 },
];

const FallingDotsAnimation = () => {
    return (
        <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden pointer-events-none">
            <div className="flex justify-between px-8 lg:px-16">
                {fallingDotsConfig.map((dot, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: dot.delay, duration: 0.5 }}
                    >
                        {/* Dot */}
                        <motion.div
                            className="rounded-full bg-slate-400"
                            style={{
                                width: dot.size,
                                height: dot.size,
                                opacity: dot.opacity,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: dot.delay,
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                        />
                        {/* Line */}
                        <motion.div
                            className="w-[1px] bg-gradient-to-b from-slate-300 to-transparent"
                            style={{ opacity: dot.opacity * 0.7 }}
                            initial={{ height: 0 }}
                            animate={{ height: dot.height }}
                            transition={{
                                delay: dot.delay + 0.2,
                                duration: 1.2,
                                ease: "easeOut",
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const current = testimonials[activeIndex];

    const next = useCallback(() => setActiveIndex((prev) => (prev + 1) % testimonials.length), []);
    const prev = useCallback(() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length), []);

    // Keyboard navigation for carousel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only respond if focus is within the testimonial section
            const section = document.getElementById("testimonials");
            if (!section?.contains(document.activeElement)) return;

            if (e.key === "ArrowRight") {
                e.preventDefault();
                next();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                prev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [next, prev]);

    return (
        <section id="testimonials" aria-label="Customer testimonials" className="relative bg-white py-24 lg:py-32 overflow-hidden">
            {/* Falling Dots Animation Background */}
            <FallingDotsAnimation />

            <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12">
                {/* Header */}
                <div className="text-center mb-24">
                    <h2 className="text-4xl lg:text-5xl font-normal tracking-tight text-dark mb-6">
                        Customer Success Stories
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-text/60 leading-relaxed">
                        See how leading security enterprises use Suburban Security to gain clarity on field operations and team alignment.
                    </p>
                </div>

                {/* Featured Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Content */}
                    <div className="flex flex-col items-start min-h-[600px] justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="flex flex-col items-start"
                            >
                                {/* Active Icon */}
                                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-500">
                                    {current.id === "guardian" && (
                                        <ShieldCheck className="h-8 w-8 text-[#16b364]" />
                                    )}
                                    {current.id === "ironshield" && (
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-800 text-white font-bold text-xl shadow-lg">IS</div>
                                    )}
                                    {current.id === "fortress" && (
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-amber-600 text-white font-bold text-xl shadow-lg">F</div>
                                    )}
                                </div>

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-bold text-dark/40 uppercase tracking-widest mb-4"
                                >
                                    {current.company}
                                </motion.span>

                                <h3 className="text-3xl lg:text-4xl font-normal leading-[1.2] text-dark mb-10 max-w-lg">
                                    {current.headline}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-3 mb-12">
                                    {current.tags.map((tag, i) => (
                                        <div key={i} className="flex items-center gap-2 rounded-lg border border-dark/5 bg-slate-light-bg px-3 py-1.5 text-sm font-medium text-dark/60">
                                            <tag.icon className="h-4 w-4" />
                                            {tag.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Blockquote */}
                                <div className="relative pl-8 border-l-2 border-dark mb-12">
                                    <p className="text-xl italic text-dark mb-4 leading-relaxed">
                                        &quot;{current.quote}&quot;
                                    </p>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-dark">{current.author}</span>
                                        <span className="text-sm text-text/60">{current.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="flex items-center gap-6 pt-4" role="tablist" aria-label="Testimonial navigation">
                            <div className="flex gap-2">
                                {testimonials.map((t, i) => (
                                    <button
                                        key={i}
                                        role="tab"
                                        aria-selected={i === activeIndex}
                                        aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}: ${t.company}`}
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-3 min-w-[12px] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${i === activeIndex ? 'w-8 bg-dark' : 'w-3 bg-dark/20 hover:bg-dark/40'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={prev}
                                    aria-label="Previous testimonial"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-dark/10 transition-all hover:bg-dark/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Next testimonial"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-dark/10 transition-all hover:bg-dark/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visualization Card */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                {/* Main Card */}
                                <div className="relative z-10 rounded-[32px] bg-white p-8 lg:p-10 shadow-[0_24px_100px_rgba(0,0,0,0.06)] border border-dark/5 min-h-[460px] flex flex-col">
                                    {current.cardType === "alignment" && (
                                        <>
                                            <div className="flex justify-between items-center mb-10">
                                                <span className="font-bold text-dark tracking-tight">System Alignment</span>
                                                <span className="text-sm font-mono text-text/40">Real-time</span>
                                            </div>

                                            <div className="space-y-8 mb-10 flex-grow">
                                                {current.stats?.map((stat, i) => (
                                                    <div key={i} className="flex flex-col gap-3">
                                                        <div className="flex justify-between items-center bg-slate-light-bg/50 p-3 rounded-xl">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stat.color }} />
                                                                <span className="font-medium text-dark/80">{stat.label}</span>
                                                            </div>
                                                            <span className="font-bold font-mono" style={{ color: stat.color }}>{stat.value}%</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {current.cardType === "dynamics" && (
                                        <>
                                            <div className="flex justify-between items-center mb-10">
                                                <span className="font-bold text-dark tracking-tight">Global Response Dynamics</span>
                                                <span className="text-sm font-mono text-text/40">Last 24h</span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-10 flex-grow">
                                                {current.offices?.map((office, i) => (
                                                    <div key={i} className="flex flex-col items-center justify-center p-4 bg-slate-light-bg/30 rounded-2xl text-center">
                                                        <span className="text-2xl font-bold text-dark mb-1">{office.code}</span>
                                                        <span className="text-[10px] text-text/40 mb-3 whitespace-nowrap">{office.city}</span>
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white shadow-sm" style={{ color: office.color }}>
                                                            {office.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mb-10">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-sm font-medium text-dark/60">Cross-office velocity</span>
                                                    <span className="text-sm font-bold text-blue-600">{current.velocity}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "85%" }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="h-full bg-blue-600 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {current.cardType === "health" && (
                                        <>
                                            <div className="flex justify-between items-center mb-10">
                                                <span className="font-bold text-dark tracking-tight">Team Health Alignment</span>
                                                <span className="text-sm font-mono text-text/40">Real-time</span>
                                            </div>

                                            <div className="space-y-6 mb-10 flex-grow">
                                                {current.healthstats?.map((stat, i) => (
                                                    <div key={i} className="flex flex-col gap-2">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: stat.color }} />
                                                                <span className="font-medium text-dark/80 text-sm">{stat.label}</span>
                                                            </div>
                                                            <span className="font-bold font-mono text-sm" style={{ color: stat.color }}>{stat.value}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${stat.value}%` }}
                                                                transition={{ duration: 1.2, delay: i * 0.1 }}
                                                                className="h-full rounded-full"
                                                                style={{ backgroundColor: stat.color }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mb-8 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                                                <Zap className="h-4 w-4 text-amber-500" />
                                                <span className="text-xs font-medium text-dark/60">{current.conversations}</span>
                                            </div>
                                        </>
                                    )}

                                    <div className="pt-6 border-t border-dark/5 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-dark">{current.activeSites}</span>
                                            <span className="text-sm text-text/40 lowercase tracking-wide">Active Managed Sites</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Background Decorative element */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] bg-gradient-to-tr from-primary/5 via-transparent to-teal/5 rounded-full blur-[100px] -z-10" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
