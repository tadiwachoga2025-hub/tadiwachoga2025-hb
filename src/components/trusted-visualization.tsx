"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GenerativeLines } from "@/components/ui/generative-lines";

export const TrustedVisualization = () => {

    return (
        <div className="relative w-full overflow-hidden bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-start"
                    >
                        <h2 className="text-[40px] lg:text-[64px] font-normal leading-[1.1] tracking-tight text-dark mb-8">
                            Protecting thousands of sites daily <span className="text-dark/40">for the world&apos;s most sophisticated teams.</span>
                        </h2>

                        <p className="max-w-xl text-lg lg:text-xl text-text/60 leading-relaxed mb-10">
                            As the intelligence layer for modern security operations, we provide real-time insights and automated compliance through our advanced AI-powered platform.
                        </p>

                        <Link
                            href="/dashboard"
                            className="group flex items-center gap-2 rounded-full border border-dark/10 px-8 py-4 text-base font-medium text-dark transition-all hover:bg-dark/5"
                        >
                            Explore the platform
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    {/* Right Visualization */}
                    <div className="relative h-[400px] w-full">
                        <GenerativeLines
                            count={15}
                            baseHeight={200}
                            oscillationRange={120}
                            className="h-full"
                        />
                        {/* Soft fade at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};
