"use client";

import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";

interface LetterContentProps {
  onComplete?: () => void;
}

const paragraphs = [
  "อาจจะยังรู้จักกันไม่นาน...",
  "แต่เค้าจะบอกว่า การที่ได้คุยกับเธอเป็นเรื่องดีของทุกวันเลย 🤍",
];

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 1.2, // Time between each paragraph appearing
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

export function LetterContent({ onComplete }: LetterContentProps) {
  useEffect(() => {
    // Calculate total animation time (delay + (paragraphs length + signature) * stagger time)
    const totalTime = 1000 + (paragraphs.length + 1) * 1200;
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, totalTime);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto bg-paper p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl relative overflow-hidden"
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}></div>
      
      {/* Soft lighting */}
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-60"></div>

      <div className="relative z-10 text-foreground/90 font-sans text-lg sm:text-xl">
        {paragraphs.map((p, index) => (
          <motion.p
            key={index}
            variants={itemVariants}
            className="mb-6 leading-relaxed min-h-[1.5em]"
          >
            {p}
          </motion.p>
        ))}

        <motion.div
          variants={itemVariants}
          className="mt-12 text-right"
        >
          <p className="text-foreground/70 mb-2 font-sans">จาก;</p>
          <p className="font-handwriting text-3xl sm:text-4xl text-primary transform -rotate-2">
            ???K
          </p>
          <p className="text-xs text-foreground/40 mt-4 font-sans tracking-widest">
            {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

