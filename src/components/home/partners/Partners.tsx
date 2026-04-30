import PartnerCard from "./PartnerCard";
import PartnerWrapper from "./PartnerWrapper";

export default function Partners() {
  const partners = [
    <PartnerCard
      key="p1"
      name="H2Grid"
      category="Electrolyzer systems"
      variant="grid"
    />,
    <PartnerCard
      key="p2"
      name="Catalyx"
      category="Catalyst scale-up"
      variant="molecule"
    />,
    <PartnerCard
      key="p3"
      name="StackForge"
      category="Industrial stacks"
      variant="stack"
    />,
    <PartnerCard
      key="p4"
      name="VoltMatter"
      category="Power materials"
      variant="spark"
    />,
    <PartnerCard
      key="p5"
      name="AquaCell"
      category="Water electrolysis"
      variant="cell"
    />,
  ];
  const members = [
    <PartnerCard
      key="m1"
      name="Hydrogen Valley"
      category="Innovation cluster"
      variant="wave"
    />,
    <PartnerCard
      key="m2"
      name="ElectroLab"
      category="Testing network"
      variant="cell"
    />,
    <PartnerCard
      key="m3"
      name="Clean Molecule"
      category="Industry alliance"
      variant="molecule"
    />,
    <PartnerCard
      key="m4"
      name="NetZero Works"
      category="Climate industry"
      variant="spark"
    />,
    <PartnerCard
      key="m5"
      name="Green Ports Hub"
      category="Maritime hydrogen"
      variant="wave"
    />,
    <PartnerCard
      key="m6"
      name="Materials Loop"
      category="Circular materials"
      variant="grid"
    />,
    <PartnerCard
      key="m7"
      name="H2 Foundry"
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
