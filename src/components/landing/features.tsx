"use client";

import { FadeIn, AnimatedText, TracingBeam } from "./utils";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Features = () => {
  return (
    <section id="features" className="section-padding overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
      
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <AnimatedText text="Everything You Need to Choose the Right Courses" />
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              RateMyANU provides comprehensive tools and insights to help you make informed decisions about your academic journey at Australian National University.
            </p>
          </FadeIn>
        </div>

        <TracingBeam className="mx-auto max-w-4xl">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </TracingBeam>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  feature, 
  index 
}: { 
  feature: (typeof features)[number];
  index: number;
}) => {
  return (
    <FadeIn
      delay={0.1 * index}
      className="mb-12 last:mb-0 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 0.2 * index,
          type: "spring", 
          stiffness: 150,
        }}
        viewport={{ once: true }}
        className="relative rounded-xl border bg-background/50 backdrop-blur-sm p-6 shadow-md"
      >
        <div className="relative z-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <feature.icon 
              className="h-6 w-6 text-primary" 
            />
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>

          {feature.items && (
            <ul className="mt-4 space-y-2">
              {feature.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  className="flex items-center gap-2 text-foreground/80"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + itemIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckIcon className="h-5 w-5 text-primary/80" />
                  {item}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Background gradient */}
        <div 
          className={cn(
            "absolute inset-0 rounded-xl opacity-30",
            index % 2 === 0 
              ? "bg-gradient-to-tr from-primary/5 via-transparent to-primary/5" 
              : "bg-gradient-to-bl from-primary/5 via-transparent to-primary/5"
          )}
        />
      </motion.div>
    </FadeIn>
  );
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
  >
    <path d="M20 6L9 17L4 12" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21L16.65 16.65" />
  </svg>
);

const ChatIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className={className}
  >
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </svg>
);

const features = [
  {
    icon: StarIcon,
    title: "Course Ratings & Reviews",
    description: "Get insights from real ANU students with detailed ratings and authentic reviews for every course.",
    items: [
      "Overall course quality score",
      "Difficulty level indicators",
      "Professor ratings and teaching styles",
      "Workload assessments"
    ]
  },
  {
    icon: SearchIcon,
    title: "Advanced Course Search",
    description: "Find exactly what you're looking for with our powerful search and filtering system.",
    items: [
      "Filter by subject, level, and keywords",
      "Sort by rating, difficulty, or popularity",
      "Compare multiple courses side by side",
      "Save favorites for later reference"
    ]
  },
  {
    icon: ChatIcon,
    title: "Community Discussions",
    description: "Connect with fellow ANU students to ask questions and share experiences.",
    items: [
      "Course-specific discussion threads",
      "Anonymous posting options",
      "Helpful advice on prerequisites",
      "Study resources and tips"
    ]
  },
]; 