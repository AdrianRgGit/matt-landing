import { useState } from "react";
import NameTag from "./NameTag";

const TEAM = [
  {
    name: "Claudia Ferrer Molina",
    role: "Chief Materials Scientist",
    image: "/media/home/team-claudia-ferrer.webp",
  },
  {
    name: "Diego Soler Navarro",
    role: "Process Scale-up Lead",
    image: "/media/home/team-diego-soler.webp",
  },
  {
    name: "Nora Vidal Torres",
    role: "Product Engineering Lead",
    image: "/media/home/team-nora-vidal.webp",
  },
  {
    name: "Hugo Martín Sáez",
    role: "Partnerships & Impact Director",
    image: "/media/home/team-hugo-martin.webp",
  },
  {
    name: "Pablo Serra Llorens",
    role: "CTO & Systems Architect",
    image: "/media/home/team-technical-founder.webp",
  },
  {
    name: "Lucas Marín Ortega",
    role: "Operations & Strategy Lead",
    image: "/media/home/team-business-founder.webp",
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
