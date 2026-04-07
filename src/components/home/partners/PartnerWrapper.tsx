import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface PartnerWrapperProps {
  partnerItems: React.ReactNode[];
  memberItems: React.ReactNode[];
}

export default function PartnerWrapper({
  partnerItems,
  memberItems,
}: PartnerWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const partnersWrapRef = useRef<HTMLDivElement>(null);
  const membersWrapRef = useRef<HTMLDivElement>(null);
  const partneringTitleRef = useRef<HTMLHeadingElement>(null);
  const membersTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = document.getElementById("partners-section");
      if (
        !section ||
        !partnersWrapRef.current ||
        !membersWrapRef.current ||
        !partneringTitleRef.current ||
        !membersTitleRef.current
      )
        return;

      function layoutCards(container: HTMLDivElement, count: number) {
        const cards = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll(".partner-card"),
        );
        if (cards.length === 0) return { cards: [], totalTravel: 0 };

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
          step * Math.ceil(count / 2) + colOffset + cardHeight;
        return { cards, totalTravel };
      }

      const { cards: partnerCards, totalTravel: partnerTravel } = layoutCards(
        partnersWrapRef.current,
        partnerItems.length,
      );
      const { cards: memberCards, totalTravel: memberTravel } = layoutCards(
        membersWrapRef.current,
        memberItems.length,
      );

      gsap.set(membersWrapRef.current, { y: "100%" });

      const isXl = window.innerWidth >= 1280;
      const partneringBig = isXl ? 60 : 36;
      const partneringSmall = isXl ? 16 : 14;
      const membersSmall = isXl ? 16 : 14;
      const membersBig = isXl ? 60 : 36;

      const partneringScaleDown = partneringSmall / partneringBig;
      const membersScaleUp = membersBig / membersSmall;

      const totalEnd = partnerTravel * 1.8 + memberTravel * 1.8;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalEnd}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(
        partnerCards,
        { y: `-=${partnerTravel}`, ease: "none", stagger: 0, duration: 1.8 },
        0,
      );

      tl.to(
        partneringTitleRef.current,
        {
          scale: partneringScaleDown,
          transformOrigin: "left top",
          duration: 0.5,
          ease: "power2.inOut",
        },
        1.4,
      )
        .to(
          membersTitleRef.current,
          {
            scale: membersScaleUp,
            y: -(membersBig - membersSmall) * 1.2,
            transformOrigin: "left top",
            duration: 0.5,
            ease: "power2.inOut",
          },
          1.4,
        )
        .to(
          partnersWrapRef.current,
          { y: "-100%", duration: 0.6, ease: "power2.inOut" },
          1.5,
        )
        .to(
          membersWrapRef.current,
          { y: "0%", duration: 0.6, ease: "power2.inOut" },
          1.5,
        );

      tl.to(
        memberCards,
        { y: `-=${memberTravel}`, ease: "none", stagger: 0, duration: 1.8 },
        2.1,
      );
    },
    {
      scope: sectionRef,
      dependencies: [partnerItems.length, memberItems.length],
    },
  );

  return (
    <div ref={sectionRef} className="contents">
      {/* Títulos — arriba en móvil/tablet, columna izquierda en xl */}
      <div
        className="
        relative z-10 w-fit mb-6
        xl:px-0 xl:pt-0 xl:mx-auto xl:mt-32
      "
      >
        <h3
          ref={partneringTitleRef}
          className="text-4xl xl:text-6xl"
          style={{ transformOrigin: "left top" }}
        >
          Partnering with
        </h3>
        <h3
          ref={membersTitleRef}
          className="text-sm xl:text-base"
          style={{ transformOrigin: "left top" }}
        >
          Members of
        </h3>
      </div>

      {/* Cards — debajo en móvil/tablet, columna derecha en xl */}
      <div
        className="
        relative flex-1 min-h-0
        xl:w-[70%] xl:ml-auto xl:mr-16
        overflow-hidden
      "
      >
        {/* Array 1: Partners */}
        <div ref={partnersWrapRef} className="absolute inset-0">
          <div className="relative w-full h-full">
            {partnerItems.map((item, i) => (
              <div
                key={i}
                className={`partner-card absolute ${i % 2 !== 0 ? "right-0" : "left-0"}`}
                style={{ top: 0 }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Array 2: Members */}
        <div ref={membersWrapRef} className="absolute inset-0">
          <div className="relative w-full h-full">
            {memberItems.map((item, i) => (
              <div
                key={i}
                className={`partner-card absolute ${i % 2 !== 0 ? "right-0" : "left-0"}`}
                style={{ top: 0 }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
