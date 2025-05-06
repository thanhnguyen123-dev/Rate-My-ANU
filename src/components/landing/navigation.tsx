"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeIn } from "./utils";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <FadeIn from="left" delay={0.3}>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text">
              RateMyANU
            </span>
          </Link>
        </FadeIn>

        <div className="hidden md:flex items-center gap-6">
          <FadeIn delay={0.4}>
            <NavLink href="">Features</NavLink>
          </FadeIn>
          <FadeIn delay={0.5}>
            <NavLink href="">Testimonials</NavLink>
          </FadeIn>
          <FadeIn delay={0.6}>
            <NavLink href="">Stats</NavLink>
          </FadeIn>
        </div>

        <div className="flex items-center gap-3">
          <FadeIn delay={0.7}>
            <Link href="/login">
              <Button variant="outline" className="hidden sm:flex">
                Log In
              </Button>
            </Link>
          </FadeIn>
          <FadeIn delay={0.8}>
            <Link href="/auth/signup">
              <Button className="group relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 group-hover:translate-x-full transition-transform duration-300"></span>
                <span className="relative">Sign Up</span>
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink = ({ 
  href, 
  children 
}: { 
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link 
      href={href}
      className="relative text-foreground/80 hover:text-foreground transition-colors duration-200 group"
    >
      {children}
      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
    </Link>
  );
}; 