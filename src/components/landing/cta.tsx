"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, BackgroundGradient } from "./utils";
import { motion } from "framer-motion";

export const CallToAction = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-2/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto">
        <BackgroundGradient
          containerClassName="rounded-2xl max-w-5xl mx-auto"
          className="py-16 px-8 md:px-16 text-center"
        >
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Smarter Course Choices?
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
              Join thousands of ANU students who use RateMyANU to find the perfect courses for their academic journey. Sign up today and start exploring real student reviews and ratings.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link href="/auth/signup" className="w-full">
                <Button 
                  size="lg" 
                  className="w-full relative overflow-hidden group"
                >
                  <motion.span 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-primary transition-transform -translate-x-full group-hover:translate-x-0 duration-300"
                    initial={{ x: "-100%" }}
                    animate={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                  />
                  <span className="relative">
                    Create Free Account
                  </span>
                </Button>
              </Link>
              
              <Link href="/courses" className="w-full">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-primary/30"
                >
                  Browse Courses
                </Button>
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <p className="text-sm text-foreground/50 mt-6">
              No credit card required. Start for free.
            </p>
          </FadeIn>
        </BackgroundGradient>
      </div>
    </section>
  );
}; 