import type { DetectedIcon } from '@common/iconDetection.types';
import { MiniStatChip } from '@ui/components/atoms/mini-stat-chip';
import { DetectedIconItem } from '@ui/components/molecules/detected-icon-item';

type DetectedIconsPanelProps = {
  icons: DetectedIcon[];
  groupedCount: number;
  selectedIconIds: string[];
  onToggleIcon: (iconId: string) => void;
};

export function DetectedIconsPanel({
  icons,
  groupedCount,
  selectedIconIds,
  onToggleIcon
}: DetectedIconsPanelProps) {
  return (
    <section className="detected-icons-panel">
      <div className="detected-icons-panel__stats">
        <MiniStatChip label="Íconos detectados" value={icons.length} />
        <MiniStatChip label="Dentro de grupo" value={groupedCount} />
      </div>

      <div className="detected-icons-panel__list">
        {icons.length === 0 && (
          <p className="detected-icons-panel__empty">
            No se detectaron íconos en este modo.
          </p>
        )}

        {icons.map(icon => (
          <DetectedIconItem
            key={icon.id}
            icon={icon}
            checked={selectedIconIds.includes(icon.id)}
            onToggle={onToggleIcon}
          />
        ))}
      </div>
    </section>
  );
}
