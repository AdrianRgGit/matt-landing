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
      src: "/media/home/mockup-img-1.webp",
      alt: "Imagen de una ventaja",
    },
    {
      title: "PGM-free materials",
      src: "/media/home/mockup-img-1.webp",
      alt: "Imagen de una ventaja",
    },
    {
      title: "Industrial scalability",
      src: "/media/home/mockup-img-1.webp",
      alt: "Imagen de una ventaja",
    },
  ];

  return (
    <div className="space-y-5">
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
