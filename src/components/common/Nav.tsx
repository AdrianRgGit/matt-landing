import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomButton from "../ui/customButton/CustomButton";
import XIcon from "../../assets/XIcon";
import MenuIcon from "../../assets/MenuIcon";
import { openPanel } from "../../stores/panelStores";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "solution", label: "Solution" },
  { id: "advantages", label: "Advantages" },
  { id: "value", label: "Value" },
  { id: "partners", label: "Partners" },
  { id: "aboutus", label: "About" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("Intro");

  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const currentSectionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (
        !overlayRef.current ||
        !containerRef.current ||
        !menuContentRef.current ||
        !logoRef.current ||
        !pillRef.current ||
        !closeButtonRef.current
      )
        return;

      const menuItems =
        menuContentRef.current.querySelectorAll("h3, a, button");

      if (isOpen) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            onStart: () => {
              overlayRef.current!.style.pointerEvents = "auto";
            },
          },
        );

        gsap.to(pillRef.current, {
          scaleX: 0.2,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onStart: () => {
            pillRef.current!.style.pointerEvents = "none";
          },
        });

        gsap.fromTo(
          containerRef.current,
          {
            opacity: 0,
            scaleY: 0.3,
            scaleX: 0.5,
            transformOrigin: "bottom center",
          },
          {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            duration: 0.45,
            ease: "expo.out",
            delay: 0.15,
            onStart: () => {
              containerRef.current!.style.pointerEvents = "auto";
            },
          },
        );

        gsap.fromTo(
          menuItems,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.04,
            delay: 0.3,
          },
        );

        gsap.fromTo(
          closeButtonRef.current,
          {
            opacity: 0,
            scale: 0.7,
            y: 10,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "expo.out",
            delay: 0.25,
            onStart: () => {
              closeButtonRef.current!.style.pointerEvents = "auto";
            },
          },
        );
      } else {
        gsap.to(menuItems, {
          opacity: 0,
          y: -6,
          duration: 0.2,
          ease: "power2.in",
          stagger: 0.02,
        });

        gsap.to(containerRef.current, {
          scaleY: 0.3,
          scaleX: 0.5,
          opacity: 0,
          transformOrigin: "bottom center",
          duration: 0.3,
          ease: "expo.in",
          delay: 0.1,
          onComplete: () => {
            containerRef.current!.style.pointerEvents = "none";
          },
        });

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            overlayRef.current!.style.pointerEvents = "none";
          },
        });

        gsap.fromTo(
          pillRef.current,
          { scaleX: 0.2, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.4,
            ease: "expo.out",
            delay: 0.3,
            onStart: () => {
              pillRef.current!.style.pointerEvents = "auto";
            },
          },
        );

        gsap.to(closeButtonRef.current, {
          opacity: 0,
          scale: 0.7,
          y: 10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            closeButtonRef.current!.style.pointerEvents = "none";
          },
        });
      }
    },
    { dependencies: [isOpen] },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const activeSection = sections.find(
          (section) => section.id === visibleEntry.target.id,
        );

        if (!activeSection || activeSection.label === currentSection) return;

        if (currentSectionRef.current) {
          gsap.to(currentSectionRef.current, {
            opacity: 0,
            y: 6,
            duration: 0.14,
            ease: "power2.in",
            onComplete: () => {
              setCurrentSection(activeSection.label);
            },
          });
        } else {
          setCurrentSection(activeSection.label);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentSection]);

  useEffect(() => {
    if (!currentSectionRef.current) return;

    gsap.fromTo(
      currentSectionRef.current,
      {
        opacity: 0,
        y: -6,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: "power2.out",
      },
    );
  }, [currentSection]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-50 bg-theme-black/40 opacity-0 pointer-events-none"
      />

      {/* Menú expandido */}
      <div
        ref={containerRef}
        className="w-80 fixed z-100 bottom-20 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none"
        style={{ transformOrigin: "bottom center" }}
      >
        <div
          ref={logoRef}
          className="h-14 w-14 border-4 border-theme-white rounded-lg mx-auto mb-5"
        />

        <div
          ref={menuContentRef}
          className="bg-theme-white/80 backdrop-blur-sm p-5 space-y-2.5 rounded-lg"
        >
          <h3>Menu</h3>

          <nav className="flex flex-col gap-y-2.5 ml-2.5 text-2xl">
            <a href="#intro" onClick={() => setIsOpen(false)}>
              Intro
            </a>
            <a href="#solution" onClick={() => setIsOpen(false)}>
              Solution
            </a>
            <a href="#advantages" onClick={() => setIsOpen(false)}>
              Advantages
            </a>
            <a href="#value" onClick={() => setIsOpen(false)}>
              Value
            </a>
            <a href="#partners" onClick={() => setIsOpen(false)}>
              Partners
            </a>
            <a href="#aboutus" onClick={() => setIsOpen(false)}>
              About
            </a>
          </nav>

          <CustomButton onClick={openPanel} className="mx-auto" />
        </div>
      </div>

      {/* Botón abrir */}
      <div
        ref={pillRef}
        className="fixed z-100 bottom-2.5 left-1/2 -translate-x-1/2"
        style={{ transformOrigin: "center center" }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-14 w-80 px-2.5 rounded-lg bg-theme-white/80 border border-theme-blue backdrop-blur-sm cursor-pointer flex justify-between items-center"
        >
          <div className="h-7 w-7 border-4 border-theme-blue rounded-lg" />

          <div className="relative h-6 overflow-hidden flex items-center justify-center">
            <p
              ref={currentSectionRef}
              className="font-spacegrotesk-light whitespace-nowrap"
            >
              {currentSection}
            </p>
          </div>

          <MenuIcon color="#6984a9" />
        </button>
      </div>

      {/* Botón cerrar */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={() => setIsOpen(false)}
        className="fixed z-100 bottom-2.5 left-1/2 -translate-x-1/2 h-14 w-14 rounded-lg bg-theme-white/80 backdrop-blur-sm cursor-pointer opacity-0 pointer-events-none flex items-center justify-center"
      >
        <XIcon color="black" />
      </button>
    </>
  );
}
