"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { FadeIn, AnimatedText } from "./utils";

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="stats" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <AnimatedText text="RateMyANU By The Numbers" />
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Join thousands of ANU students who are making better course decisions with our platform.
            </p>
          </FadeIn>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              delay={index * 0.1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  icon: (props: { className?: string }) => React.ReactNode;
};

const StatCard = ({
  stat,
  delay,
  isInView,
}: {
  stat: Stat;
  delay: number;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    
    const node = nodeRef.current;
    if (!node) return;
    
    const controls = animate(0, stat.value, {
      duration: 1.5,
      delay,
      onUpdate: (value) => {
        setCount(Math.floor(value));
      },
      ease: "easeOut",
    });
    
    return () => controls.stop();
  }, [isInView, stat.value, delay]);

  return (
    <FadeIn delay={delay} className="h-full">
      <motion.div
        className="rounded-xl border bg-card p-6 shadow-md transition-all duration-300 h-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col items-center text-center h-full">
          <div className="mb-3 p-3 rounded-full bg-primary/10">
            <stat.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-baseline mb-1">
            <span 
              ref={nodeRef} 
              className="text-4xl font-bold text-foreground"
            >
              {count}
            </span>
            {stat.suffix && (
              <span className="text-2xl font-semibold ml-1 text-foreground/80">
                {stat.suffix}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/70">{stat.label}</p>
        </div>
      </motion.div>
    </FadeIn>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CourseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const ReviewIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const RatingIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const stats: Stat[] = [
  {
    value: 5000,
    label: "Active Students",
    icon: UserIcon,
  },
  {
    value: 350,
    label: "ANU Courses Covered",
    icon: CourseIcon,
  },
  {
    value: 12000,
    label: "Course Reviews",
    icon: ReviewIcon,
  },
  {
    value: 4.8,
    suffix: "★",
    label: "Average Platform Rating",
    icon: RatingIcon,
  },
]; 