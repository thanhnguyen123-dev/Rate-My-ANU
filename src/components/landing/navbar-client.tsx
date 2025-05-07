"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton
} from "@/components/ui/resizable-navbar";

export default function NavbarClient({ items }: { items: { name: string; link: string }[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Navbar className="fixed top-1">
      <NavBody visible={scrolled}>
        <NavbarLogo />
        <NavItems items={items} />
        <div className="ml-auto flex items-center gap-2">
          <NavbarButton href="/login" variant="primary">Login</NavbarButton>
        </div>
      </NavBody>
      
      <MobileNav visible={scrolled}>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle 
            isOpen={isMenuOpen} 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
        </MobileNavHeader>
        
        <MobileNavMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
        >
          {items.map((item, i) => (
            <a 
              key={i}
              href={item.link} 
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="mt-4 flex w-full flex-col gap-2">
            <NavbarButton href="/login" variant="secondary" className="w-full">
              Log In
            </NavbarButton>
            <NavbarButton href="/login" variant="primary" className="w-full">
              Sign Up
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
