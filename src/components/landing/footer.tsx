/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { FadeIn } from "./utils";
import { motion } from "motion/react";

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card/50 border-t">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-16 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <FadeIn>
              <Link href="/" className="inline-block">
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-amber-500 text-transparent bg-clip-text">
                  RateMyANU
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Your ultimate resource for honest, student-written course reviews and ratings at the Australian National University.
              </p>
              <div className="flex space-x-4 mt-6">
                <FooterSocialLink href="#" aria-label="Twitter">
                  <TwitterIcon className="h-5 w-5" />
                </FooterSocialLink>
                <FooterSocialLink href="#" aria-label="Facebook">
                  <FacebookIcon className="h-5 w-5" />
                </FooterSocialLink>
                <FooterSocialLink href="#" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </FooterSocialLink>
                <FooterSocialLink href="#" aria-label="GitHub">
                  <GitHubIcon className="h-5 w-5" />
                </FooterSocialLink>
              </div>
            </FadeIn>
          </div>
          
          <div>
            <FooterHeading>Resources</FooterHeading>
            <ul className="mt-4 space-y-2 text-sm">
              <FooterLink href="/courses">Browse Courses</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/faq">FAQs</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <FooterHeading>Legal</FooterHeading>
            <ul className="mt-4 space-y-2 text-sm">
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} RateMyANU. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              RateMyANU is not affiliated with the Australian National University
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <FadeIn>
      <h3 className="font-semibold text-foreground">{children}</h3>
    </FadeIn>
  );
};

const FooterLink = ({ 
  href, 
  children 
}: { 
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <FadeIn>
        <Link 
          href={href} 
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {children}
        </Link>
      </FadeIn>
    </li>
  );
};

const FooterSocialLink = ({ 
  href, 
  children,
  ...props
}: { 
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <motion.a
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const TwitterIcon = ({ className }: { className?: string }) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
); 