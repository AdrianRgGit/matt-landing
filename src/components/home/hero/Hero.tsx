import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomOverlay from "../../ui/customOverlay/CustomOverlay";
import CustomButton from "../../ui/customButton/CustomButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const videoContainer = videoContainerRef.current;
      const video = videoRef.current;

      if (!section || !videoContainer || !video) return;

      const buildAnimation = () => {
        // Mata triggers anteriores por si refresca/rehidrata
        ScrollTrigger.getAll().forEach((st) => st.kill());

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
            invalidateOnRefresh: true,
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

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      const handleReady = () => {
        // Espera un frame extra para que DOM/layout terminen de asentarse
        requestAnimationFrame(() => {
          buildAnimation();
        });
      };

      if (video.readyState >= 2) {
        handleReady();
      } else {
        video.addEventListener("loadeddata", handleReady, { once: true });
      }

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        video.removeEventListener("loadeddata", handleReady);
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh container mx-auto bg-theme-white overflow-hidden"
    >
      <div
        ref={textRef}
        className="absolute z-20 left-25 top-1/2 -translate-y-1/2 max-w-225 space-y-14 mix-blend-difference"
      >
        <h1 className="text-6xl text-font-white">
          Making green hydrogen affordable through advanced materials
        </h1>
        <p className="text-2xl text-font-white">
          More than ever we need materials technology and innovation to help us
          tackle some of our pressing challenges, such as climate change, for
          humans and the planet.
        </p>
      </div>

      <div
        ref={videoContainerRef}
        className="absolute top-1/2 right-10 w-[56.25rem] h-[31.25rem] -translate-y-1/2"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/media/home/hero-vid.webm" type="video/webm" />
          <source src="/media/home/hero-vid.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <CustomOverlay />
        </div>
      </div>

      <div ref={buttonRef} className="absolute bottom-5 right-10 z-30">
        <CustomButton
          text="Partner with us"
          onClick={() => console.log("Click!")}
        />
      </div>
    </section>
  );
}
