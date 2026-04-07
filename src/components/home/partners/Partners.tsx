import PartnerCard from "./PartnerCard";
import PartnerWrapper from "./PartnerWrapper";

export default function Partners() {
  const partners = [
    <PartnerCard key="p1" />,
    <PartnerCard key="p2" />,
    <PartnerCard key="p3" />,
  ];
  const members = [
    <PartnerCard key="m1" />,
    <PartnerCard key="m2" />,
    <PartnerCard key="m3" />,
    <PartnerCard key="m4" />,
  ];

  return (
    <section
      id="partners"
      className="relative h-svh overflow-hidden flex flex-col xl:grid xl:grid-cols-2 xl:justify-center"
    >
      <PartnerWrapper partnerItems={partners} memberItems={members} />
    </section>
  );
}
