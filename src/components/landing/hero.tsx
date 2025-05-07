"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {Particles} from "@/components/ui/particles";
import Image from "next/image";
import { ContainerTextFlipDemo } from "@/components/landing/flip-text";
import { AnimatedGradientTextDemo } from "@/components/dashboard/animated-text-demo";

export const LandingHero = () => {
  const [mounted, setMounted] = useState(false);
  const IMAGE_SIZE = 30;

  useEffect(() => {
    setMounted(true);
  }, []);

  return ( 
    <section className="relative pt-36 pb-20 overflow-hidden">
      <Particles />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="mb-4">
              <div 
                className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors bg-background/10 text-foreground border-primary/20 opacity-0 ${mounted ? 'animate-fadeIn' : ''}`}
                style={{ animationDelay: "0.3s" }}
              >
                <AnimatedGradientTextDemo/>
              </div>
            </div>

            <div className={`opacity-0 ${mounted ? 'animate-fadeInLeft' : ''}`}>
              {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
                Find Your Perfect Course at ANU
              </h1> */}
              <ContainerTextFlipDemo/>
            </div>

            <div className={`opacity-0 ${mounted ? 'animate-fadeIn' : ''}`} style={{ animationDelay: "0.4s" }}>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Real student reviews, authentic experiences, and course ratings all in one place.
                Discover the best classes, avoid the worst, and make informed decisions about your education.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className={`opacity-0 ${mounted ? 'animate-fadeIn' : ''}`} style={{ animationDelay: "0.6s" }}>
                <Link href="/login">
                  <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-primary transition-transform group-hover:translate-x-0 -translate-x-full duration-300"></span>
                    <span className="relative flex items-center gap-2 text-white">
                      Get Started
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative animate-bounce-x"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1 8C1 7.58579 1.33579 7.25 1.75 7.25H14.25C14.6642 7.25 15 7.58579 15 8C15 8.41421 14.6642 8.75 14.25 8.75H1.75C1.33579 8.75 1 8.41421 1 8Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.46967 1.46967C8.76256 1.17678 9.23744 1.17678 9.53033 1.46967L15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033L9.53033 14.5303C9.23744 14.8232 8.76256 14.8232 8.46967 14.5303C8.17678 14.2374 8.17678 13.7626 8.46967 13.4697L13.9393 8L8.46967 2.53033C8.17678 2.23744 8.17678 1.76256 8.46967 1.46967Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
              
              <div className={`opacity-0 ${mounted ? 'animate-fadeIn' : ''}`} style={{ animationDelay: "0.7s" }}>
                <Link href="/courses">
                  <Button variant="outline" size="lg" className="border-primary/30">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>

            <div className={`mt-6 flex items-center gap-8 text-sm text-foreground/70 opacity-0 ${mounted ? 'animate-fadeIn' : ''}`} style={{ animationDelay: "0.8s" }}>
              <span>Built with</span>
              <Image 
                src="/nextjs-icon.svg" 
                alt="ANU Logo" 
                width={IMAGE_SIZE} 
                height={IMAGE_SIZE} /
              >
              <Image 
                src="/react.svg" 
                alt="ANU Logo" 
                width={IMAGE_SIZE} 
                height={IMAGE_SIZE} /
              >
              <Image 
                src="/trpc.svg" 
                alt="ANU Logo" 
                width={IMAGE_SIZE} 
                height={IMAGE_SIZE} /
              >
              <Image 
                src="/supabase.svg" 
                alt="ANU Logo" 
                width={IMAGE_SIZE} 
                height={IMAGE_SIZE} /
              >
              <Image 
                src="/prisma.svg" 
                alt="ANU Logo" 
                width={IMAGE_SIZE} 
                height={IMAGE_SIZE} /
              >
              <Image 
                src="/tailwindcss-icon.svg" 
                alt="ANU Logo" 
                width={IMAGE_SIZE} 
                height={IMAGE_SIZE} /
              >
              
            </div>
          </div>

          <div className={`opacity-0 ${mounted ? 'animate-fadeInRight' : ''}`} style={{ animationDelay: "0.2s" }}>
            <div className="p-1 rounded-2xl relative bg-gradient-to-tr from-primary/20 via-transparent to-primary/20">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-background">
                {/* University campus illustration/mockup */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
                <div className="grid grid-cols-6 grid-rows-6 gap-2 p-4 h-full">
                  {/* Course cards mockup */}
                  {[
                    { course: "COMP3600", title: "Algorithms", rating: 4.8, row: "1/3", col: "1/4" },
                    { course: "LAWS1001", title: "Foundations of Law", rating: 4.2, row: "1/3", col: "4/7" },
                    { course: "PSYC1003", title: "Psychology 1", rating: 4.5, row: "3/5", col: "1/3" },
                    { course: "ECON1101", title: "Microeconomics", rating: 3.9, row: "3/5", col: "3/5" },
                    { course: "BIOL1003", title: "Biology 1", rating: 4.1, row: "3/5", col: "5/7" },
                    { course: "MATH1013", title: "Mathematics", rating: 4.3, row: "5/7", col: "1/4" },
                    { course: "POLS1002", title: "Political Science", rating: 4.0, row: "5/7", col: "4/7" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-card/70 backdrop-blur p-3 rounded-lg flex flex-col justify-between border border-border/40 opacity-0 ${mounted ? 'animate-fadeInUp hover:translate-y-[-5px]' : ''} transition-transform duration-200`}
                      style={{ 
                        gridRow: item.row, 
                        gridColumn: item.col,
                        animationDelay: `${0.4 + index * 0.1}s` 
                      }}
                    >
                      <div>
                        <div className="text-xs font-medium text-primary mb-1">{item.course}</div>
                        <div className="font-semibold text-sm line-clamp-1">{item.title}</div>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill={i < Math.floor(item.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={i < Math.floor(item.rating) ? "text-yellow-500" : "text-gray-300"}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs ml-1">{item.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 