"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
};

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  color = "#3b82f6",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Initialize everything once on mount
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    contextRef.current = ctx;
    
    const container = containerRef.current;
    if (container && ctx) {
      const { offsetWidth, offsetHeight } = container;
      dimensionsRef.current = { width: offsetWidth, height: offsetHeight };
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      
      // Initialize particles
      const initialParticles: Particle[] = [];
      for (let i = 0; i < quantity; i++) {
        initialParticles.push({
          x: Math.random() * offsetWidth,
          y: Math.random() * offsetHeight,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        });
      }
      particlesRef.current = initialParticles;
      
      // Start animation
      const animate = () => {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, offsetWidth, offsetHeight);
        
        particlesRef.current.forEach((p, index) => {
          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          
          // Move particle
          p.x += p.speedX;
          p.y += p.speedY;
          
          // Boundary check
          if (p.x < 0 || p.x > offsetWidth) p.speedX *= -1;
          if (p.y < 0 || p.y > offsetHeight) p.speedY *= -1;
          
          // Mouse interaction
          const dx = mousePositionRef.current.x - p.x;
          const dy = mousePositionRef.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 1500;
            p.speedX -= Math.cos(angle) * force;
            p.speedY -= Math.sin(angle) * force;
          }
        });
        
        animationFrameIdRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Mouse move handler - use ref instead of state
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePositionRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      dimensionsRef.current = { width: offsetWidth, height: offsetHeight };
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [quantity, color]);
  
  return (
    <div 
      ref={containerRef}
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  );
};
