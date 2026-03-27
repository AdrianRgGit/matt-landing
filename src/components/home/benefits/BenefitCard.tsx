import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type BenefitCardProps = {
  title: string;
  src: string;
  alt: string;
  isActive: boolean;
  onToggle: () => void;
};

export default function BenefitCard({
  title,
  src,
  alt,
  isActive,
  onToggle,
}: BenefitCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current || !imageRef.current) return;

      // Imagen crece / encoge
      gsap.to(imageRef.current, {
        width: isActive ? "100%" : "80%",
        scale: isActive ? 1.05 : 1,
        duration: 0.45,
        ease: "power3.out",
      });

      // Texto desaparece / aparece
      gsap.to(titleRef.current, {
        opacity: isActive ? 0 : 1,
        y: isActive ? 16 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    { dependencies: [isActive], scope: cardRef },
  );

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onToggle}
      className="relative w-full h-40 cursor-pointer overflow-hidden text-left"
    >
      <h3
        ref={titleRef}
        className="absolute bottom-2.5 left-0 z-10 text-3xl text-font-white mix-blend-difference"
      >
        {title}
      </h3>

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="ml-auto h-full w-[80%] object-cover"
      />
    </button>
  );
}
