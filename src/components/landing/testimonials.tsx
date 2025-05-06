"use client";

import { useRef } from "react";
import { FadeIn, AnimatedText, Spotlight } from "./utils";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding overflow-hidden relative bg-muted/30">
      <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
      
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <AnimatedText text="What Students Are Saying" />
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Hear from fellow ANU students who have used RateMyANU to make better academic decisions.
            </p>
          </FadeIn>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              testimonial={testimonial}
              delay={i * 0.1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

type Testimonial = {
  content: string;
  author: string;
  role: string;
  rating: number;
};

const TestimonialCard = ({
  testimonial,
  delay,
  isInView,
}: {
  testimonial: Testimonial;
  delay: number;
  isInView: boolean;
}) => {
  return (
    <FadeIn delay={delay} className="h-full">
      <Spotlight className="group h-full">
        <motion.div
          className={cn(
            "relative rounded-xl bg-card p-6 shadow-md backdrop-blur-sm border h-full flex flex-col",
            "transform transition-all duration-300 ease-out",
            "hover:shadow-xl"
          )}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5, delay }}
          whileHover={{ y: -5 }}
        >
          <div className="mb-4 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <div className="relative">
            <svg
              className="absolute -top-2 -left-2 h-8 w-8 text-primary/30 transform -scale-x-100"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="relative text-base text-foreground/80 mb-6 italic">
              {testimonial.content}
            </p>
          </div>
          
          <div className="mt-auto flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {testimonial.author[0]}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="text-xs text-foreground/60">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      </Spotlight>
    </FadeIn>
  );
};

const testimonials: Testimonial[] = [
  {
    content: "RateMyANU helped me choose courses that aligned with my learning style. The detailed reviews about professors and course difficulty were incredibly accurate.",
    author: "Alex Chen",
    role: "Computer Science, 3rd Year",
    rating: 5,
  },
  {
    content: "I was struggling to decide between several law electives until I found this platform. The student reviews gave me insights I couldn't find anywhere else.",
    author: "Sarah Johnson",
    role: "Law, 2nd Year",
    rating: 4,
  },
  {
    content: "This platform saved me from enrolling in courses with overwhelming workloads during the same semester. The workload ratings are spot on!",
    author: "Michael Wong",
    role: "Finance, 4th Year",
    rating: 5,
  },
  {
    content: "As a first-year student, I was completely lost during course selection. RateMyANU made the process so much easier with real feedback from seniors.",
    author: "Emily Parker",
    role: "Psychology, 1st Year",
    rating: 4,
  },
  {
    content: "The course difficulty ratings helped me balance my semester schedule perfectly. Now I recommend this site to everyone I know at ANU.",
    author: "Daniel Kim",
    role: "Engineering, 3rd Year",
    rating: 5,
  },
  {
    content: "I appreciate how the platform allows anonymous reviews, which means students can be honest about their experiences without worry.",
    author: "Olivia Smith",
    role: "Biology, 2nd Year",
    rating: 4,
  },
]; 