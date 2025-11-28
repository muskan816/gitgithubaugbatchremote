// src/components/layout/CarouselRow.jsx
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselRow = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  backgroundClass = "bg-white",
  children,
}) => {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    const amount = 320;
    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`${backgroundClass} py-10 px-4 md:px-12`}>
      <div className="flex justify-between items-end mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#C59A2F] italic">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {actionLabel && (
          <button
            onClick={onAction}
            className="hidden md:inline-flex items-center text-sm font-medium text-[#C59A2F] hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => scrollRow("left")}
          className="hidden md:flex items-center justify-center absolute -left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-yellow-400 text-yellow-600 p-3 rounded-full shadow-md hover:bg-yellow-50 transition z-10"
        >
          <FaChevronLeft size={18} />
        </button>

        <button
          onClick={() => scrollRow("right")}
          className="hidden md:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-yellow-400 text-yellow-600 p-3 rounded-full shadow-md hover:bg-yellow-50 transition z-10"
        >
          <FaChevronRight size={18} />
        </button>

        <div
          ref={rowRef}
          className="flex gap-5 overflow-x-auto overflow-y-visible scroll-smooth pt-2 pb-6 scrollbar-hide"
          style={{ paddingTop: 12 }} 
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default CarouselRow;
