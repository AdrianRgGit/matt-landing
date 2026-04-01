import PartnerCard from "./PartnerCard";
import PartnerWrapper from "./PartnerWrapper";

export default function Partners() {
  return (
    <section
      id="partners-section"
      className="relative h-svh overflow-hidden xl:grid xl:grid-cols-2 xl:justify-center"
    >
      {/* Mitad izquierda: títulos siempre visibles */}
      <div className="relative shrink-0 z-10 xl:mx-auto xl:mt-32">
        <h2 className="text-4xl xl:text-6xl">
          Partnering with
        </h2>
        <p className="text-sm xl:text-base">Members of</p>
      </div>

      {/* Mitad derecha: cards animadas */}
      <PartnerWrapper>
        <PartnerCard />
        <PartnerCard />
        <PartnerCard />
      </PartnerWrapper>
    </section>
  );
}
