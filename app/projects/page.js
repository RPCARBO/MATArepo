"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const repos = [
  {
    name: "ELENA",
    url: "https://github.com/keanedalisay/elena",
    image: "/projects/elena.png",
    desc: "AI-powered emergency response chatbot.",
  },
  {
    name: "Emergency AI Agent",
    url: "https://github.com/RPCARBO/emergency-ai-agent",
    image: "/projects/emergencyai.png",
    desc: "Autonomous AI agent for dispatching emergency medical services.",
  },
  {
    name: "ExpressEats",
    url: "https://github.com/RPCARBO/ExpressEats",
    image: "/projects/expresseats.png",
    desc: "Food delivery console with full ordering, receipt, and restaurant workflow.",
  },
  {
    name: "Interactive Root Finder (Secant Method)",
    url: "https://github.com/RPCARBO/Interactive-Root-Finder-Secant-Method",
    image: "/projects/secant.png",
    desc: "Numerical methods visualizer for solving nonlinear equations using the Secant Method.",
  },
  {
    name: "Skin Cancer & Symptom Classifier",
    url: "https://github.com/RPCARBO/skin-cancer-classifier-starter",
    image: "/projects/skincancer.png",
    desc: "Symptom finder and Deep learning model for detecting malignant skin lesions.",
  },
  {
    name: "WVSU COOP System",
    url: "https://github.com/RPCARBO/WVSU_COOP",
    image: "/projects/wvsucoop.png",
    desc: "Cooperative management system built for West Visayas State University.",
  },
];

const featuredRepoNames = repos.map(r => {
  const urlParts = r.url.split('/');
  return urlParts[urlParts.length - 1].toLowerCase();
});

function ThreeScene() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;

    loader.load(
      "/animations/scene.gltf",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim;
        model.scale.setScalar(scale);
        
        model.position.sub(center.multiplyScalar(scale));
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );

    camera.position.z = 3;

    const controls = new OrbitControls(camera, containerRef.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 1.2;
    controls.maxDistance = 4;
    controls.listenToKeyEvents(window);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden bg-transparent"
      style={{ touchAction: 'pan-y' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
        text-[10px] sm:text-xs text-gray-600 dark:text-gray-400
        bg-gray-200/70 dark:bg-slate-900/80
        px-3 sm:px-4 py-1.5 sm:py-2
        rounded-lg sm:rounded-xl backdrop-blur max-w-[90%] text-center"
      >
        <p className="leading-tight">
          Drag to rotate • Scroll to zoom
        </p>

        <p className="text-[9px] sm:text-[10px] leading-tight">
          <a
            href="https://skfb.ly/6QXFq"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold tracking-wide hover:text-blue-500 transition"
          >
            ROBOT PLAYGROUND
          </a>{" "}
          by Hadrien59 is licensed under{" "}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold tracking-wide hover:text-blue-500 transition"
          >
            CREATIVE COMMONS ATTRIBUTION
          </a>
        </p>
      </div>
    </div>
  );
}

function ProjectCarousel({ items, videoUrl }) {
  const [index, setIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const isVideo = videoUrl && index === items.length - 1;

  return (
    <div className="relative flex justify-center items-center w-full">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-3xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-3"
        style={{
          transform: `perspective(1000px) rotateX(${parallax.y}deg) rotateY(${parallax.x}deg) translateY(${parallax.y !== 0 || parallax.x !== 0 ? '-12px' : '0'})`,
        }}
      >
        {isVideo ? (
          <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl dark:shadow-white/30">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${new URL(videoUrl).searchParams.get('v')}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <img
            src={items[index]}
            alt={`Project slide ${index + 1}`}
            className="w-full h-full object-contain rounded-xl shadow-2xl dark:shadow-white/30"
          />
        )}
      </div>

      <button
        onClick={() => setIndex((index - 1 + items.length) % items.length)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-3xl md:text-5xl text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition bg-white/80 dark:bg-slate-900/80 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg z-10"
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        onClick={() => setIndex((index + 1) % items.length)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-3xl md:text-5xl text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition bg-white/80 dark:bg-slate-900/80 rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg z-10"
        aria-label="Next"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              i === index 
                ? "bg-blue-500 w-6 md:w-8" 
                : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function GitHubRepos() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/RPCARBO/repos?sort=updated&per_page=100');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data = await response.json();
        
        const filteredRepos = data.filter(repo => 
          !repo.fork && 
          !featuredRepoNames.includes(repo.name.toLowerCase())
        );
        
        setGithubRepos(filteredRepos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-white dark:bg-slate-950 px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          More Projects from GitHub
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5b42f5]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-white dark:bg-slate-950 px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          More Projects from GitHub
        </h2>
        <div className="text-center text-red-500 py-20">
          <p>Unable to load GitHub repositories</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </section>
    );
  }

  if (githubRepos.length === 0) {
    return null;
  }

  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 px-6 md:px-12 py-16 md:py-24">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
        More Projects from GitHub
      </h2>
      <p className="text-center text-gray-600 dark:text-slate-400 mb-8 md:mb-12 text-sm md:text-base">
        Explore my other repositories and contributions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {githubRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#5b42f5]"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#5b42f5] transition-colors truncate flex-1">
                {repo.name}
              </h3>
              <svg className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-[#5b42f5] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>

            <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 line-clamp-2">
              {repo.description || 'No description available'}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-slate-400">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                  {repo.language}
                </span>
              )}
              
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {repo.stargazers_count}
                </span>
              )}
              
              {repo.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                  </svg>
                  {repo.forks_count}
                </span>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {formatDate(repo.updated_at)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
  };
  return colors[language] || '#8b949e';
}

export default function Projects() {
  const auscultaiImages = [
    "/projects/auscultai.png",
    "/projects/auscultai2.png",
    "/projects/auscultai3.png",
    "/projects/auscultaiposter.png"
  ];

  const elenaImages = [
    "/projects/elena.png",
    "/projects/elena2.png",
    "/projects/elena3.png"
  ];

return (
  <>
    <Navbar />
    <div className="bg-white dark:bg-slate-950 text-black dark:text-white font-[Inter]">
      {/* Intro with 3D Scene */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-16 py-12 lg:py-0 pt-24 lg:pt-0 gap-8 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <ThreeScene />
        </div>
        {/* Blurred background container for text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-block max-w-xl bg-gray-200/60 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              My Projects
            </h1>
            <p className="text-gray-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              These highlighted are intelligent systems I built to solve real-world problems using data, machine learning, and automation. 
              Each project demonstrates not only technical proficiency but also creativity in design, scalability in implementation, and a clear focus on delivering practical value. 
              These systems showcase how I bridge AI engineering and design to create solutions that are both powerful and intuitive.
            </p>
          </div>
        </div>
      </section>

        {/* AuscultAI with Carousel */}
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-16 py-12 md:py-0 bg-gray-50 dark:bg-slate-900">
          <div className="w-full md:w-1/2">
            <ProjectCarousel 
              items={auscultaiImages} 
              videoUrl="https://www.youtube.com/watch?v=2_6iVtDDKpw"
            />
          </div>
          <div className="w-full md:w-1/2 max-w-xl text-center md:text-left">
            <div className="inline-block w-full bg-gray-200/60 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6">
              <a 
                href="https://github.com/keanedalisay/auscult_ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
                  AuscultAI
                </h2>
              </a>
              <p className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                An AI-powered heart sound classification system that detects cardiovascular disease
                using deep learning on auscultation audio signals.
              </p>
              <p className="mt-4 text-blue-600 dark:text-blue-400 text-sm md:text-base">
                TensorFlow · Python · Dart · Flutter · Signal Processing · ML/DL
              </p>
            </div>
          </div>
        </section>

        {/* ELENA with Carousel */}
        <section className="min-h-screen flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 px-6 md:px-16 py-12 md:py-0 bg-white dark:bg-slate-800">
          <div className="w-full md:w-1/2">
            <ProjectCarousel items={elenaImages} />
          </div>
          <div className="w-full md:w-1/2 max-w-xl text-center md:text-left">
            <div className="inline-block w-full bg-gray-200/60 dark:bg-[#0f172b]/70 backdrop-blur-md rounded-xl p-6">
              <a 
                href="https://github.com/RPCARBO/ELENA" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
                  ELENA
                </h2>
              </a>
              <p className="text-gray-700 dark:text-slate-300 text-sm md:text-base">
                An AI-powered emergency response assistant that helps coordinate
                ambulance dispatch and critical incident management.
              </p>
              <p className="mt-4 text-blue-600 dark:text-blue-400 text-sm md:text-base">
                NLP · HTML/CSS · Chatbot · React · AI Agents · Web Sockets · ML/DL
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="min-h-screen bg-gray-50 dark:bg-slate-900 px-6 md:px-12 py-16 md:py-24">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Featured Engineering Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {repos.map((repo, i) => (
              <div
                key={i}
                className="relative group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 aspect-[4/3] border-4"
                style={{ borderColor: '#5b42f5' }}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={repo.image}
                    fill
                    className="object-contain p-4"
                    alt={repo.name}
                  />
                </div>

                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-center justify-center gap-4 p-6 md:p-8"
                  style={{ backgroundColor: '#5b42f5' }}
                >
                  <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold text-center leading-tight">
                    {repo.name}
                  </h3>

                  <p className="text-white/90 text-xs md:text-sm text-center leading-relaxed">
                    {repo.desc}
                  </p>

                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-6 py-2 bg-white text-[#5b42f5] rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub API Repos */}
        <GitHubRepos />
      </div>
    </>
  );
}