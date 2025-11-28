import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "keen-slider/keen-slider.min.css";
import "../styles/heroText.css";

const slides = [
  {
    id: 1,
    video:
      "https://res.cloudinary.com/dvjqisuve/video/upload/v1763109113/vid-1_l15a9x.mp4",
    images: ["/images/img-1.png", "/images/img-2.png", "/images/img-3.png"],
  },
  {
    id: 2,
    video:
      "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853369/WhatsApp_Video_2025-11-08_at_15.06.10_40747acb_kpycbi.mp4",
    images: ["https://res.cloudinary.com/dvjqisuve/image/upload/v1762853311/IMG-20251108-WA0024_yehkrt.jpg", "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853301/IMG-20251108-WA0029_f93xn9.jpg", "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853280/IMG-20251108-WA0044_oigrqr.jpg"],
  },
  {
    id: 3,
    video:
      "https://res.cloudinary.com/dvjqisuve/video/upload/v1762853324/WhatsApp_Video_2025-11-09_at_12.54.30_221a96a4_b2gkcy.mp4",
    images: ["https://res.cloudinary.com/dvjqisuve/image/upload/v1762853278/IMG-20251108-WA0052_huwahw.jpg", "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853286/IMG-20251108-WA0047_dsekj3.jpg", "https://res.cloudinary.com/dvjqisuve/image/upload/v1762853288/IMG-20251108-WA0038_kcm8vg.jpg"],
  },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);

  // autoplay plugin (20s)
  const autoplay = (slider) => {
    let timeout;
    let mouseOver = false;
    const next = () => {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => slider.next(), 5000);
    };
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => (mouseOver = true));
      slider.container.addEventListener("mouseout", () => (mouseOver = false));
      next();
    });
    slider.on("dragStarted", () => clearTimeout(timeout));
    slider.on("animationEnded", next);
    slider.on("updated", next);
    return () => clearTimeout(timeout);
  };

  const [sliderRef, slider] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: { origin: "center", perView: 1 },
      created(s) {
        setCurrent(s.track.details.rel);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
    },
    [autoplay]
  );

  // Play only the current slide's video
  useEffect(() => {
    if (!slider?.current) return;
    const s = slider.current;
    const idx = s.track.details.rel;
    const containers = document.querySelectorAll(".video-slide");
    containers.forEach((c, i) => {
      const v = c.querySelector("video");
      if (!v) return;
      if (i === idx) {
        v.play().catch(() => {});
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      }
    });
  }, [current, slider]);

  const moveTo = (idx) => slider?.current?.moveToIdx(idx);

  return (
    <section className="relative w-full h-screen">
      <div ref={sliderRef} className="keen-slider h-full">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="keen-slider__slide video-slide relative w-full h-screen"
            aria-label={`Slide ${i + 1}`}
          >
            {/* Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={s.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            {/* Correct Tailwind gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/80" />

            {/* Hero text (centered & cinematic) */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
              {/* fade-sequence uses CSS and will animate only when this slide is active */}
              <div
                className={`space-y-4 fade-sequence ${
                  current === i ? "active-slide" : "inactive-slide"
                }`}
              >
                <h2 className="hero-sub text-white/80 text-lg md:text-2xl tracking-wider font-light uppercase">
                  Feel the Experience
                </h2>

                <h1 className="hero-main text-white text-4xl md:text-6xl font-extrabold leading-tight">
                  Coz{" "}
                  <span className="text-gradient-gold italic">
                    “You Only Live Once”
                  </span>
                </h1>

                <p className="hero-tag text-white/70 text-sm md:text-lg tracking-wide max-w-xl mx-auto">
                  where You, Locals & Experiences blend stories.
                </p>
              </div>

              {/* Thumbnails row */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
                <div className="grid grid-cols-3 gap-6 place-items-center">
                  {s.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-white/5 border border-white/20 rounded-lg shadow-sm"
                    >
                      <img
                        src={img}
                        alt={`thumb-${i}-${idx}`}
                        className="w-50 h-30 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mx-auto h-full px-12 flex items-center justify-between">
          <button
            onClick={() => slider?.current?.prev()}
            className="pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md transition"
            aria-label="Previous"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={() => slider?.current?.next()}
            className="pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md transition"
            aria-label="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => moveTo(idx)}
            className={`w-3 h-3 rounded-full transition-transform transform ${
              current === idx
                ? "scale-125 bg-brandGold"
                : "bg-white/50 hover:scale-110"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
