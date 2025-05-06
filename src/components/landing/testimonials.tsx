"use client";

import { FadeIn, AnimatedText } from "./utils";
import { MarqueeDemo } from "@/components/landing/infinite-list";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding overflow-hidden relative">
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

        <MarqueeDemo />

      </div>


    </section>
  );
};
