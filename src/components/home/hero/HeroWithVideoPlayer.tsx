import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomOverlay from "../../ui/customOverlay/CustomOverlay";
import CustomButton from "../../ui/customButton/CustomButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abrir modal y reproducir
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cerrar modal y pausar
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  // Reproducir cuando el modal esté montado
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play();
    }
  }, [isModalOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const videoContainer = videoContainerRef.current;
      if (!section || !videoContainer) return;

      gsap.set(videoContainer, {
        top: "50%",
        right: "2.5rem",
        width: "56.25rem",
        height: "31.25rem",
        yPercent: -50,
        xPercent: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        [textRef.current, buttonRef.current],
        { opacity: 0, duration: 0.3 },
        0,
      );
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, 0);
      tl.to(
        videoContainer,
        {
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          yPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-svh container mx-auto bg-theme-white overflow-hidden"
      >
        {/* Texto */}
        <div
          ref={textRef}
          className="absolute z-20 left-25 top-1/2 -translate-y-1/2 max-w-225 space-y-14 mix-blend-difference"
        >
          <h1 className="text-6xl text-font-white">
            Making green hydrogen affordable through advanced materials
          </h1>
          <p className="text-2xl text-font-white">
            More than ever we need materials technology and innovation to help
            us tackle some of our pressing challenges, such as climate change,
            for humans and the planet.
          </p>
        </div>

        {/* Contenedor video */}
        <div
          ref={videoContainerRef}
          className="absolute group cursor-pointer"
          onClick={openModal}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            
            <source src="https://4cs0hh1kvklgjnqz.public.blob.vercel-storage.com/matt/hero-vid.mp4" type="video/mp4" />
          </video>

          {/* Icono play — aparece en hover */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* OVERLAY */}
          <div
            ref={overlayRef}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <CustomOverlay />
          </div>
        </div>

        {/* BOTÓN */}
        <div ref={buttonRef} className="absolute bottom-5 right-10 z-30">
          <CustomButton
            text="Partner with us"
            onClick={() => console.log("Click!")}
          />
        </div>
      </section>

      {/* Modal fullscreen */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeModal}
        >
          <video
            ref={modalVideoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
            onClick={(e) => e.stopPropagation()} // evita cerrar al clickar el vídeo
          >
            <source src="/media/home/hero-vid-full.mp4" type="video/webm" />
            <source src="/media/home/hero-vid-full.mp4" type="video/mp4" />
          </video>

          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
