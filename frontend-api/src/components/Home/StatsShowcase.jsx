// components/StatsShowcase.jsx
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

/* --- Inline SVG arrows that point INTO the center --- */
const ArrowRight = ({ className = "", stroke = "#2b6cb0" }) => (
  <svg className={className} width="140" height="18" viewBox="0 0 140 18" fill="none" aria-hidden>
    <defs>
      <marker id="ah-right" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0 0 L8 3 L0 6 z" fill={stroke} />
      </marker>
    </defs>
    <path d="M10 9 L130 9" stroke={stroke} strokeWidth="1.6" markerEnd="url(#ah-right)" strokeLinecap="round" />
  </svg>
);


export default function StatsShowcase({
  mainTarget = 0,
  leftStat = 100,  // -> Happy Travelers (top)
  rightStat = 25,  // -> Satisfied Hosts (second line)
  duration = 2.0,
  arrowStroke = "#2b6cb0",
}) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.22, 0.8, 0.12, 1] },
    });

    const interval = setInterval(() => {
      mv.set(mainTarget);
      setDisplay(Math.round(mv.get()));
    }, 100);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [mainTarget, duration, mv, controls]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const entrance = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 pb-10">
        {/* From */}
        <motion.p initial="hidden" animate="show" variants={entrance} className="text-center text-sm font-medium text-sky-900">
          From
        </motion.p>

        {/* Big number */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          aria-live="polite"
          className="mt-1 text-center select-none"
        >
          <span
            className="font-extrabold leading-tight"
            style={{ color: "#7f5f00", fontSize: "clamp(48px, 9vw, 120px)", lineHeight: 0.9, display: "inline-block", fontVariantNumeric: "tabular-nums" }}
          >
            {display}
          </span>
        </motion.div>

        {/* To */}
        <motion.p initial="hidden" animate="show" variants={entrance} className="mt-4 text-center text-sm text-sky-900">
          To
        </motion.p>

        <div className="hidden sm:grid grid-cols-[1fr,auto,1fr] grid-rows-2 gap-x-6 items-center">
          {/* Row 1 — Happy Travelers: LEFT number + RIGHT arrow -> label */}
          <div className="col-start-1 row-start-1 flex items-center justify-end gap-4">
            <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>{leftStat}</div>
            <ArrowRight stroke={arrowStroke} />
          </div>
          <div className="col-start-2 row-start-1 text-center">
            <p className="text-lg sm:text-xl font-medium text-sky-900">No. of Happy Travelers</p>
          </div>
          <div className="col-start-3 row-start-1" /> {/* empty slot */}

          {/* Row 2 — Satisfied Hosts: arrow <- number on RIGHT side */}
          <div className="col-start-1 row-start-2" /> {/* empty slot */}
          <div className="col-start-2 row-start-2 text-center">
            <p className="text-lg sm:text-xl font-medium text-sky-900 mt-2">No. of Satisfied Hosts</p>
          </div>
          <div className="col-start-3 row-start-2 flex items-center justify-start gap-4">
            <ArrowRight stroke={arrowStroke} />
            <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>{rightStat}</div>
          </div>
        </div>

        {/* Subtext */}
        <p className="mt-4 text-center text-base sm:text-lg text-gray-700 flex items-center gap-2 justify-center">
          And counting Smiles... <span className="text-2xl">😊</span>
        </p>

        {/* === Mobile stacked layout === */}
        <div className="mt-8 sm:hidden flex flex-col items-center gap-5">
          {/* Top line mapping to Happy Travelers */}
          <div className="flex items-center gap-3">
            <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>{leftStat}</div>
            <ArrowRight className="w-20" stroke={arrowStroke} />
            <div className="text-sm text-sky-900 ml-2">No. of Happy Travelers</div>
          </div>
          {/* Second line mapping to Satisfied Hosts */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-sky-900">No. of Satisfied Hosts</div>
            <ArrowRight className="w-20" stroke={arrowStroke} />
            <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>{rightStat}</div>
          </div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: prefersReduced ? 0 : 0.7 }}
          className="mt-12 text-center text-2xl md:text-3xl text-[#8b5e3c] italic"
        >
          <span style={{ display: "inline-block" }} className="italic text-[#8b5e3c] leading-relaxed">
            However "At the heart of it all, it's You & Us."
          </span>
        </motion.blockquote>
      </div>
    </section>
  );
}
