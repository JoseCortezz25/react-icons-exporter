type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle: string;
};

export function SectionHeading({
  label,
  title,
  subtitle
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      {label && <p className="section-heading__label">{label}</p>}
      <h1 className="section-heading__title">{title}</h1>
      <p className="section-heading__subtitle">{subtitle}</p>
    </header>
  );
}
