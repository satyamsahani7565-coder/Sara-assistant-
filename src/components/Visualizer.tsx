import { motion, AnimatePresence } from "motion/react";
import React, { useMemo } from "react";

type VisualizerState = "idle" | "listening" | "processing" | "speaking";

interface VisualizerProps {
  state: VisualizerState;
}

export default function Visualizer({ state }: VisualizerProps) {
  // Theme configuration for the circle
  const theme = useMemo(() => {
    switch (state) {
      case "listening":
        return {
          primary: "rgba(139, 92, 246, 1)", // Violet
          glow: "rgba(139, 92, 246, 0.5)",
          ring: "border-violet-400",
        };
      case "processing":
        return {
          primary: "rgba(56, 189, 248, 1)", // Sky Blue
          glow: "rgba(56, 189, 248, 0.5)",
          ring: "border-sky-400",
        };
      case "speaking":
        return {
          primary: "rgba(236, 72, 153, 1)", // Pink
          glow: "rgba(236, 72, 153, 0.5)",
          ring: "border-pink-400",
        };
      default:
        return {
          primary: "rgba(255, 255, 255, 0.2)", // Subtle White
          glow: "rgba(255, 255, 255, 0.1)",
          ring: "border-white/10",
        };
    }
  }, [state]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer Ambient Glow */}
      <motion.div
        animate={{
          scale: state === "idle" ? 1 : [1, 1.2, 1],
          opacity: state === "idle" ? 0.3 : [0.4, 0.7, 0.4],
        }}
        transition={{ 
          duration: state === "idle" ? 4 : 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[80%] h-[80%] rounded-full blur-[100px]"
        style={{ backgroundColor: theme.glow }}
      />

      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className={`absolute w-[70%] h-[70%] rounded-full border border-dashed ${theme.ring} opacity-20`}
      />

      {/* Main Circle Component */}
      <motion.div
        layout
        animate={{
          scale: state === "speaking" ? [1, 1.05, 1] : state === "listening" ? [1, 1.02, 1] : 1,
          boxShadow: state === "idle" 
            ? `0 0 20px ${theme.glow}` 
            : `0 0 60px ${theme.glow}, inset 0 0 20px rgba(255,255,255,0.2)`,
        }}
        transition={{ 
          duration: 0.5, 
          repeat: state === "idle" ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className="relative w-[40%] h-[40%] rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center overflow-hidden z-10"
      >
        {/* State-specific color overlay */}
        <motion.div 
          animate={{ opacity: state === "idle" ? 0.1 : 0.3 }}
          className="absolute inset-0 transition-colors duration-500"
          style={{ backgroundColor: theme.primary }}
        />

        {/* Center Text */}
        <motion.span
          animate={{
            opacity: state === "processing" ? [1, 0.4, 1] : 1,
            scale: state === "speaking" ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="relative z-20 text-2xl md:text-4xl font-bold tracking-[0.2em] text-white drop-shadow-md"
        >
          SARA
        </motion.span>
      </motion.div>

      {/* Subtle particles for speaking state */}
      <AnimatePresence>
        {state === "speaking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, -100],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-white/40"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
