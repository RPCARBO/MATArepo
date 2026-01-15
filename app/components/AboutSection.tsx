"use client";
import { useState, useEffect, useRef } from "react";

const images = [
  "/profile2.png",
  "/profile3.png",
  "/profile4.png",
  "/profile5.png"
];

export default function AboutSection() {
  const [index, setIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section className="snap-start min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-6 py-16">
      <div className="max-w-7xl w-full px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* Image Carousel with Parallax */}
        <div className="relative flex justify-center">
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer"
            style={{
              transform: isHovering 
                ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) scale(1.05)`
                : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
              transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
            }}
          >
            <img
              src={images[index]}
              alt={`Profile ${index + 2}`}
              className="w-[340px] md:w-[450px] lg:w-[520px] h-[450px] md:h-[600px] lg:h-[680px] object-cover rounded-2xl transition-all duration-700
                shadow-2xl dark:shadow-none
                dark:shadow-[0_0_50px_rgba(91,66,245,0.6)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                dark:hover:shadow-[0_0_80px_rgba(91,66,245,0.8)]"
              style={{
                transform: isHovering
                  ? `translateZ(40px)`
                  : 'translateZ(0px)',
                transition: 'transform 0.3s ease-out',
              }}
            />

            {/* Shine overlay effect on hover */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* Previous Button */}
          <button
            onClick={() => setIndex((index - 1 + images.length) % images.length)}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 text-5xl md:text-6xl text-black dark:text-white hover:text-[#5b42f5] dark:hover:text-[#5b42f5] transition-all px-2 md:px-4 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            onClick={() => setIndex((index + 1) % images.length)}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 text-5xl md:text-6xl text-black dark:text-white hover:text-[#5b42f5] dark:hover:text-[#5b42f5] transition-all px-2 md:px-4 hover:scale-110 z-10"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Indicator Dots */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index 
                    ? "bg-[#5b42f5] w-8" 
                    : "bg-gray-400 dark:bg-gray-600 hover:bg-[#5b42f5] dark:hover:bg-[#5b42f5] w-2.5"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            <span
              className="
                font-extrabold 
                inline-block
                transition-transform duration-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                hover:scale-110
                whitespace-nowrap
              "
            >
              RALPH PABLO
            </span>
            <br className="hidden md:block" />
            <span
              className="
                font-extrabold 
                inline-block
                transition-transform duration-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                hover:scale-110
                whitespace-nowrap
              "
            >
              CARBO
            </span>
          </h2>

          <div
            className="
              bg-gray-200/70 dark:bg-slate-900/70
              backdrop-blur-md
              rounded-xl
              p-6 md:pr-4
              max-w-4xl mx-auto
            "
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-white">
              I'm a Computer Scientist from the Philippines
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I specialize in artificial intelligence, software engineering, and
              human-centered digital experiences. I build systems that combine
              strong mathematical foundations with modern machine learning and
              polished interface design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}