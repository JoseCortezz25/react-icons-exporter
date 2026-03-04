import type { DetectionMode } from '@ui/types/detectionMode';

type DetectionModeOptionProps = {
  mode: DetectionMode;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (mode: DetectionMode) => void;
};

export function DetectionModeOption({
  mode,
  title,
  description,
  selected,
  onSelect
}: DetectionModeOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mode)}
      className={`mode-option ${selected ? 'mode-option--selected' : ''}`}
    >
      <span className="mode-option__title">{title}</span>
      <span className="mode-option__description">{description}</span>
    </button>
  );
}
