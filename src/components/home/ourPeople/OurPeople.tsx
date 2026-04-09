import { useState } from "react";
import NameTag from "./NameTag";

const TEAM = [
  {
    name: "Adrián Ramírez Galera",
    role: "CTO & Co-founder",
    image: "/media/home/mockup-img-1.webp",
  },
  {
    name: "Manolo Martínez Escobar",
    role: "CEO & Co-founder",
    image: "/media/home/mockup-img-2.webp",
  },
  {
    name: "Adrián Ramírez Galera",
    role: "CTO & Co-founder",
    image: "/media/home/mockup-img-1.webp",
  },
  {
    name: "Manolo Martínez Escobar",
    role: "CEO & Co-founder",
    image: "/media/home/mockup-img-2.webp",
  },
  {
    name: "Adrián Ramírez Galera",
    role: "CTO & Co-founder",
    image: "/media/home/mockup-img-1.webp",
  },
  {
    name: "Manolo Martínez Escobar",
    role: "CEO & Co-founder",
    image: "/media/home/mockup-img-2.webp",
  },
];

export default function OurPeople() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-svh flex flex-col justify-center xl:flex-row xl:items-center xl:justify-center xl:gap-16">
      <div className="space-y-10 w-fit">
        {TEAM.map((member, i) => (
          <NameTag
            key={i}
            name={member.name}
            role={member.role}
            isActive={activeIndex === i}
            onActivate={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <div
        className="
        absolute bottom-5 right-2.5 w-48 h-64 -z-10
        xl:relative xl:w-72 xl:h-80
      "
      >
        {TEAM.map((member, i) => (
          <img
            key={i}
            src={member.image}
            alt={`Foto de ${member.name}`}
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
              activeIndex === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
