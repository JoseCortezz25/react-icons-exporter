type MiniStatChipProps = {
  label: string;
  value: number;
};

export function MiniStatChip({ label, value }: MiniStatChipProps) {
  return (
    <article className="mini-stat-chip">
      <p className="mini-stat-chip__value">{value}</p>
      <p className="mini-stat-chip__label">{label}</p>
    </article>
  );
}
