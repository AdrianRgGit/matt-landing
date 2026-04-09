import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Intro() {
  const [visible, setVisible] = useState(true);

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
      },
    });

    tl.fromTo(
      logoRef.current,
      { rotate: 0, opacity: 0, scale: 0.8 },
      {
        rotate: 360,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      },
    )
      .fromTo(
        textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .to({}, { duration: 0.5 })
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
      });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-theme-white"
    >
      <div className="flex items-center gap-4">
        <div
          ref={logoRef}
          className="h-14 w-14 border-4 border-theme-blue rounded-lg opacity-0"
        />

        <h1
          ref={textRef}
          className="text-6xl text-font-blue tracking-widest opacity-0"
        >
          MATT
        </h1>
      </div>
    </div>
  );
}
