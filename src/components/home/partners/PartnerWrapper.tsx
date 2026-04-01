import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, Children } from "react";

gsap.registerPlugin(ScrollTrigger);

interface PartnerWrapperProps {
  children: React.ReactNode;
}

export default function PartnerWrapper({ children }: PartnerWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const childCount = Children.count(children);

  useGSAP(
    () => {
      const section = document.getElementById("partners-section");
      if (!section || !wrapperRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        wrapperRef.current.querySelectorAll(".partner-card"),
      );

      if (cards.length === 0) return;

      const cardHeight = cards[0].offsetHeight;
      const step = cardHeight - 60;
      const colOffset = step / 2;
      const colIndex = { left: 0, right: 0 };

      cards.forEach((card, i) => {
        const isRight = i % 2 !== 0;
        const col = isRight ? "right" : "left";
        const indexInCol = colIndex[col];
        colIndex[col]++;
        const y = indexInCol * step + (isRight ? colOffset : 0);
        gsap.set(card, { y });
      });

      const totalTravel =
        step * Math.ceil(childCount / 2) + colOffset + cardHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalTravel * 1.8}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(cards, {
        y: `-=${totalTravel}`,
        ease: "none",
        stagger: 0,
      });
    },
    { scope: sectionRef, dependencies: [childCount] },
  );

  return (
    <div
      ref={sectionRef}
      className="w-full relative shrink-0 xl:w-[70%] xl:ml-auto xl:mr-16"
    >
      <div ref={wrapperRef} className="absolute inset-0">
        <div className="relative w-full h-full">
          {Children.map(children, (child, i) => {
            const isRight = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`partner-card absolute ${
                  isRight ? "right-0" : "left-0"
                }`}
                style={{ top: 0 }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
