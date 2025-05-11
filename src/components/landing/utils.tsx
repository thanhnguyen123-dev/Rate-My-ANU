"use client";

import { useRef, useEffect } from "react";
import { useInView, motion, useAnimation, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  className,
  children,
  containerClassName,
  as: Component = "div",
}: {
  className?: string;
  children?: React.ReactNode;
  containerClassName?: string;
  as?: React.ElementType;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      container.style.setProperty("--x", x.toString());
      container.style.setProperty("--y", y.toString());
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[--radius] bg-background",
        containerClassName
      )}
      style={{
        "--x": "0.5",
        "--y": "0.5",
      } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[--radius] [mask-image:radial-gradient(circle_at_calc(50%+var(--x)*75%)_calc(50%+var(--y)*75%),black_15%,transparent_65%)]"
        style={{
          background: "radial-gradient(circle at calc(50% + var(--x) * 75%) calc(50% + var(--y) * 75%), rgba(205, 153, 51, 0.15), transparent 40%)",
        }}
      />
      <Component
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[--radius]",
          className
        )}
      >
        {children}
      </Component>
    </div>
  );
};

export const AnimatedText = ({
  text,
  className,
  once = true,
}: {
  text: string;
  className?: string;
  once?: boolean;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once });

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    } else if (!once) {
      void controls.start("hidden");
    }
  }, [controls, inView, once]);

  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={container}
      className={cn("inline-block", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block whitespace-nowrap"
        >
          {word}
          {i !== words.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  from = "bottom",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "bottom" | "top" | "left" | "right";
  once?: boolean;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once });

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    } else if (!once) {
      void controls.start("hidden");
    }
  }, [controls, inView, once]);

  const directions = {
    bottom: { y: 20 },
    top: { y: -20 },
    left: { x: -20 },
    right: { x: 20 },
  };

  const initialDirection = directions[from];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { ...initialDirection, opacity: 0 },
        visible: {
          ...Object.fromEntries(
            Object.keys(initialDirection).map(key => [key, 0])
          ),
          opacity: 1,
          transition: { delay, duration },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
};

export const Spotlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseCircleRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosition.current = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    };
    
    if (mouseCircleRef.current) {
      mouseCircleRef.current.style.setProperty("--x", `${mousePosition.current.x}px`);
      mouseCircleRef.current.style.setProperty("--y", `${mousePosition.current.y}px`);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative rounded-[--radius] overflow-hidden", className)}
    >
      {children}
      <div
        ref={mouseCircleRef}
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(600px circle at var(--x) var(--y), rgba(205, 153, 51, 0.15), transparent 40%)",
        }}
      />
    </div>
  );
}; 