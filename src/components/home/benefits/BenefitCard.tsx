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
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useGSAP(
    () => {
      if (!titleRef.current || !imageWrapperRef.current) return;

      const isDesktop = window.innerWidth >= 1280;
      const collapsedWidth = isDesktop ? "70%" : "80%";
      const expandedWidth = "100%";
      const imageWrapper = imageWrapperRef.current;
      const titleEl = titleRef.current;

      const duration = hasMountedRef.current ? 0.45 : 0;

      gsap.fromTo(
        imageWrapper,
        {
          width: isActive ? collapsedWidth : expandedWidth,
        },
        {
          width: isActive ? expandedWidth : collapsedWidth,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        },
      );

      gsap.fromTo(
        titleEl,
        {
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 16,
        },
        {
          opacity: isActive ? 0 : 1,
          y: isActive ? 16 : 0,
          duration: hasMountedRef.current ? 0.3 : 0,
          ease: "power2.out",
          overwrite: "auto",
        },
      );

      hasMountedRef.current = true;
    },
    { dependencies: [isActive], scope: cardRef },
  );

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onToggle}
      className="relative h-40 w-full cursor-pointer overflow-hidden text-left xl:h-48"
    >
      <h3
        ref={titleRef}
        className="absolute bottom-2.5 left-0 z-10 text-3xl text-font-white mix-blend-difference xl:text-5xl"
      >
        {title}
      </h3>

      <div
        ref={imageWrapperRef}
        className="ml-auto h-full w-[80%] overflow-hidden xl:w-[70%]"
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    </button>
  );
}
