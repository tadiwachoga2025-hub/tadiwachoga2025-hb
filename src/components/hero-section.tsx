"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Shield, Users, Activity } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  heroStaggerContainer,
  heroTextReveal,
  wordReveal,
  counterAnimation,
  premiumButtonHover,
} from "@/lib/motion";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  duration: countDuration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const incrementTime = (countDuration * 1000) / end;
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, incrementTime);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, countDuration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

// Text reveal animation that splits into words
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className="mb-4 max-w-lg text-3xl font-bold leading-[1.1] tracking-tight text-dark lg:text-[44px]"
      initial="hidden"
      animate="visible"
      variants={heroStaggerContainer}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={wordReveal}
          style={{ perspective: 400 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// Animated gradient orb
function GlowOrb({ className, delay = 0, reducedMotion = false }: { className?: string; delay?: number; reducedMotion?: boolean }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      initial={{ opacity: 0.3, scale: 1 }}
      animate={reducedMotion ? { opacity: 0.4, scale: 1 } : {
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={reducedMotion ? { duration: 0.5 } : {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

// Animated grid background
function AnimatedGrid() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <motion.path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

// Live operations indicator with premium pulse
function LiveIndicator() {
  return (
    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute h-4 w-4 rounded-full bg-primary/30"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-primary/50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.2,
          }}
        />
        {/* Core dot */}
        <motion.div
          className="relative h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(255,195,0,0.6)]"
          animate={{
            boxShadow: [
              "0 0 8px 2px rgba(255,195,0,0.6)",
              "0 0 16px 4px rgba(255,195,0,0.8)",
              "0 0 8px 2px rgba(255,195,0,0.6)",
            ],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
      <motion.span
        className="font-mono text-xs tracking-wider text-white/90 uppercase"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Live Operations
        </motion.span>
      </motion.span>
    </div>
  );
}

// Stats bar component
function StatsBar() {
  const stats = [
    { icon: Shield, value: 99, suffix: "%", label: "Uptime" },
    { icon: Users, value: 500, suffix: "+", label: "Guards" },
    { icon: Activity, value: 24, suffix: "/7", label: "Monitoring" },
  ];

  return (
    <motion.div
      className="mt-8 flex items-center gap-6 border-t border-dark/10 pt-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.8 },
        },
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-2"
          variants={counterAnimation}
        >
          <stat.icon className="h-4 w-4 text-primary" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-dark">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              {stat.label}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Premium CTA Button
function CTAButton({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      variants={premiumButtonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="relative"
    >
      {/* Glow effect for primary button */}
      {isPrimary && (
        <motion.div
          className="absolute -inset-1 rounded-full bg-primary/30 blur-md"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <Link
        href={href}
        className={`relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isPrimary
            ? "bg-black text-white shadow-lg hover:shadow-xl"
            : "border border-dark/20 text-dark hover:bg-dark/5"
        }`}
      >
        {children}
        {isPrimary && (
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
}

// Floating particles background
function FloatingParticles({ reducedMotion = false }: { reducedMotion?: boolean }) {
  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for the image (disabled if user prefers reduced motion)
  const imageX = useTransform(springX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [10, -10]);
  const imageY = useTransform(springY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative px-6 lg:px-8 pt-24 lg:pt-28 pb-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:min-h-[640px] relative z-10">
        {/* Left Block - Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStaggerContainer}
          className="relative flex flex-col justify-center rounded-3xl bg-slate-light-bg p-10 lg:p-16 overflow-hidden"
        >
          {/* Animated grid background */}
          <AnimatedGrid />

          {/* Floating particles */}
          <FloatingParticles reducedMotion={prefersReducedMotion ?? false} />


          {/* Animated headline */}
          <AnimatedHeadline text="The Intelligence Layer for Modern Security Operations" />

          {/* Description */}
          <motion.p
            className="mb-6 max-w-md text-sm leading-relaxed text-text/70 lg:text-base relative z-10"
            variants={heroTextReveal}
          >
            Suburban Security connects every guard, vehicle, and incident into a unified AI layer — delivering real-time insights, compliance automation, and team alignment across your entire security operation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 relative z-10"
            variants={heroTextReveal}
          >
            <CTAButton href="/dashboard" variant="primary">
              Start analyzing
            </CTAButton>
            <CTAButton href="/dashboard" variant="secondary">
              View API Docs
            </CTAButton>
          </motion.div>

          {/* Stats bar */}
          <StatsBar />
        </motion.div>

        {/* Right Block - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="group relative min-h-[420px] overflow-hidden rounded-3xl bg-dark"
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Animated corner accents */}
          <div className="absolute top-4 right-4 z-20 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 w-6 rounded-full bg-primary/60"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>

          {/* Floating image with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ x: imageX, y: imageY }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
                alt="Security operations command center showing real-time monitoring displays and data visualization"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-15"
            initial={{ top: 0, opacity: 0 }}
            animate={{
              top: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />

          {/* Live operations indicator */}
          <LiveIndicator />

          {/* Bottom gradient bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 z-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary-light to-primary"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
