"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoveLetterProps {
  onOpenComplete: () => void;
}

export function LoveLetter({ onOpenComplete }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After flap opens (0.25s) + letter slides out (0.4s), trigger full screen letter
    setTimeout(() => {
      onOpenComplete();
    }, 500);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full perspective-1000">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.4 } }}
            className="relative cursor-pointer"
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Envelope Floating Animation Wrapper */}
            <motion.div
              animate={{
                y: isHovered ? -10 : [0, -10, 0],
              }}
              transition={{
                duration: isHovered ? 0.3 : 4,
                repeat: isHovered ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="relative w-80 h-56 sm:w-96 sm:h-64"
            >
              {/* Back of Envelope */}
              <div className="absolute inset-0 bg-[#c39e80] rounded-md shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* The Letter (Hidden initially, slides up when open) */}
              <motion.div
                initial={{ y: "10%" }}
                animate={{ y: isOpen ? "-60%" : "10%" }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="absolute left-4 right-4 top-4 bottom-4 bg-[#fdfbf7] rounded-sm shadow-inner flex flex-col items-center pt-8 border border-[#e6e0d4]"
              >
                <div className="w-16 h-1 bg-red-200/50 rounded-full mb-2" />
                <div className="w-24 h-1 bg-red-200/50 rounded-full mb-2" />
                <div className="w-12 h-1 bg-red-200/50 rounded-full" />
                
                {/* Heart Wax Seal inside */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: isOpen ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-red-400"
                >
                  ❤️
                </motion.div>
              </motion.div>

              {/* Envelope Flap (Top) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? -180 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none drop-shadow-md"
              >
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-1/2 text-[#d4b595] fill-current drop-shadow-lg"
                >
                  <polygon points="0,0 100,0 50,100" />
                </svg>
              </motion.div>

              {/* Envelope Front Left & Right */}
              <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-md flex">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full text-[#dcae8a] fill-current"
                >
                  <polygon points="0,0 0,100 50,50" />
                </svg>
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full text-[#d4a076] fill-current absolute top-0 left-0"
                >
                  <polygon points="100,0 100,100 50,50" />
                </svg>
              </div>
              
              {/* Envelope Front Bottom */}
              <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-lg">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full text-[#e0b796] fill-current"
                >
                  <polygon points="0,100 100,100 50,50" />
                </svg>
              </div>

              {/* Wax Seal */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <div className="w-12 h-12 bg-red-800 rounded-full shadow-lg flex items-center justify-center border-2 border-red-900/50 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-900 opacity-80" />
                      <span className="relative z-10 text-white font-handwriting text-xl shadow-sm">♡</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Click to open hint */}
            {!isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                className="text-center mt-12 text-sm sm:text-base font-sans tracking-widest uppercase text-foreground/60"
              >
                มีจดหมายถึงคุณ... <br/>
                <span className="text-xs opacity-50">(คลิกเพื่อเปิด)</span>
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
