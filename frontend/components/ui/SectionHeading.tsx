interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-cormorant text-4xl md:text-5xl text-textPrimary mb-4">{title}</h2>
      {subtitle && (
        <p className="font-cinzel text-xs tracking-widest uppercase text-gold">{subtitle}</p>
      )}
      <div className="w-16 h-px bg-gold mx-auto mt-6"></div>
    </div>
  );
}
