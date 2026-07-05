"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We use a free romantic piano track for placeholder
    // In a real scenario, this would be customized by the user.
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_2738361b9a.mp3?filename=romantic-piano-113526.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Soft volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground/70 hover:text-primary hover:bg-background/80 transition-all z-50 shadow-sm"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </motion.button>
  );
}
