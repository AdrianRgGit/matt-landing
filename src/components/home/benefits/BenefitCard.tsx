export default function BenefitCard({
  title,
  src,
  alt,
}: {
  title: string;
  src: string;
  alt: string;
}) {
  return (
    <button type="button" className="w-full h-40 cursor-pointer relative">
      <h3 className="text-3xl absolute bottom-2.5 text-font-white mix-blend-difference">
        {title}
      </h3>

      <img
        src={src}
        alt={alt}
        className="w-[80%] h-full object-cover ml-auto"
      />
    </button>
  );
}
