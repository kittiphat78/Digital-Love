"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoveLetter } from "@/components/LoveLetter";
import { LetterContent } from "@/components/LetterContent";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function Home() {
  const [stage, setStage] = useState<"envelope" | "letter">("envelope");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative selection:bg-primary/20">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-300/5 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full max-w-3xl flex items-center justify-center min-h-[50vh] z-10"
          >
            <LoveLetter onOpenComplete={() => setStage("letter")} />
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-full flex-1 flex items-center justify-center py-12 z-10"
          >
            <LetterContent />
          </motion.div>
        )}
      </AnimatePresence>

      <AudioPlayer />
    </main>
  );
}
