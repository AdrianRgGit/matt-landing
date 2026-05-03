import PartnerCard from "./PartnerCard";
import PartnerWrapper from "./PartnerWrapper";

export default function Partners() {
  const partners = [
    <PartnerCard
      key="p1"
      name="Matt"
      category="Electrolyzer systems"
      variant="grid"
    />,
    <PartnerCard
      key="p2"
      name="Matt"
      category="Catalyst scale-up"
      variant="molecule"
    />,
    <PartnerCard
      key="p3"
      name="Matt"
      category="Industrial stacks"
      variant="stack"
    />,
    <PartnerCard
      key="p4"
      name="Matt"
      category="Power materials"
      variant="spark"
    />,
    <PartnerCard
      key="p5"
      name="Matt"
      category="Water electrolysis"
      variant="cell"
    />,
  ];
  const members = [
    <PartnerCard
      key="m1"
      name="Matt"
      category="Innovation cluster"
      variant="wave"
    />,
    <PartnerCard
      key="m2"
      name="Matt"
      category="Testing network"
      variant="cell"
    />,
    <PartnerCard
      key="m3"
      name="Matt"
      category="Industry alliance"
      variant="molecule"
    />,
    <PartnerCard
      key="m4"
      name="Matt"
      category="Climate industry"
      variant="spark"
    />,
    <PartnerCard
      key="m5"
      name="Matt"
      category="Maritime hydrogen"
      variant="wave"
    />,
    <PartnerCard
      key="m6"
      name="Matt"
      category="Circular materials"
      variant="grid"
    />,
    <PartnerCard
      key="m7"
      name="Matt"
      category="Scale-up network"
      variant="stack"
    />,
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
