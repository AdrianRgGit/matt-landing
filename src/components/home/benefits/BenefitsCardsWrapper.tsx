import { useState } from "react";
import BenefitCard from "./BenefitCard";

export default function BenefitsCardsWrapper() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const cards = [
    {
      title: "High efficiency",
      src: "/media/home/benefit-high-efficiency.webp",
      alt: "Electrolysis lab setup showing efficient green hydrogen technology",
    },
    {
      title: "PGM-free materials",
      src: "/media/home/benefit-pgm-free-materials.webp",
      alt: "Precious-metal-free catalyst samples and electrode materials",
    },
    {
      title: "Industrial scalability",
      src: "/media/home/benefit-industrial-scalability.webp",
      alt: "Industrial electrode production line for scalable green hydrogen",
    },
  ];

  return (
    <div className="gap-5 flex flex-col justify-between">
      {cards.map((card, index) => (
        <BenefitCard
          key={index}
          title={card.title}
          src={card.src}
          alt={card.alt}
          isActive={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
