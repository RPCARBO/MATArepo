"use client";
import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
export default function Page() {
  const [hover, setHover] = useState<"artificial" | "intelligence" | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const maskImgRef = useRef<HTMLImageElement | null>(null);

  // Mouse parallax (syncs BOTH images)
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const transform = `translate(${x}px, ${y}px)`;

    if (imgRef.current) imgRef.current.style.transform = transform;
    if (maskImgRef.current) maskImgRef.current.style.transform = transform;
  };

  return (
    <>
      <Navbar />

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">

        {/* SECTION 1 */}
        <section
          onMouseMove={handleMove}
          className="snap-start h-screen relative flex items-end justify-center overflow-hidden"
        >
          {/* Fixed gradient background (top portion, not affected by dark mode) */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(to bottom, #1a0f6b 0%, #2a1f9d 40%, #4a3fcf 60%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 65%)',
            }}
          />
          
          {/* Toggleable background (bottom portion, affected by dark mode) */}
          <div 
            className="absolute inset-0 bg-white dark:bg-slate-950 z-0"
            style={{
              clipPath: 'polygon(0 65%, 100% 50%, 100% 100%, 0 100%)',
            }}
          />
            
          {/* INTERACTIVE TEXT */}
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center z-30 font-extrabold leading-none text-[10rem] md:text-[14rem] select-none"> */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 font-extrabold leading-none select-none text-[clamp(2.5rem,12vw,14rem)]">


            <div
              onMouseEnter={() => setHover("artificial")}
              onMouseLeave={() => setHover(null)}
              className={`whitespace-nowrap transition-all duration-500 ${
                hover === "artificial" ? "text-transparent" : "text-white dark:text-white"
              }`}
              style={{ WebkitTextStroke: "2px black" }}
            >
              ARTIFICIAL
            </div>

            <div
              onMouseEnter={() => setHover("intelligence")}
              onMouseLeave={() => setHover(null)}
              className={`whitespace-nowrap transition-all duration-500 ${
                hover === "intelligence" ? "text-transparent" : "text-white dark:text-white"
              }`}
              style={{ WebkitTextStroke: "2px black" }}
            >
              INTELLIGENCE
            </div>

          </div>

          {/* REAL VISIBLE IMAGE */}
          <img
            src="/BWprofile1.2.png"
            ref={imgRef}
            className="hero-image"
            draggable={false}
          />

        </section>
        <AboutSection />
        <SkillsSection />
      </div>
    </>
  );
}