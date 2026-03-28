import type { DetectedIcon } from '@common/iconDetection.types';
import { messages } from '@ui/messages';

type DetectedIconItemProps = {
  icon: DetectedIcon;
  checked: boolean;
  onToggle: (iconId: string) => void;
};

export function DetectedIconItem({
  icon,
  checked,
  onToggle
}: DetectedIconItemProps) {
  return (
    <label className={`detected-icon-item ${checked ? 'is-selected' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(icon.id)}
        className="detected-icon-item__checkbox"
      />

      <div className="detected-icon-item__preview-wrap">
        <img
          src={icon.preview}
          alt={messages.detectedIconItem.previewAlt(icon.name)}
          className="detected-icon-item__preview"
        />
      </div>

      <div className="detected-icon-item__meta">
        <p className="detected-icon-item__name">{icon.name}</p>
        <p className="detected-icon-item__tag">
          {icon.isInGroup
            ? messages.detectedIconItem.tags.inGroup
            : messages.detectedIconItem.tags.standaloneNode}
        </p>
      </div>
    </label>
  );
}
