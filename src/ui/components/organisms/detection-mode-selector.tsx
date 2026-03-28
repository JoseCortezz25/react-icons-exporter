import { SectionHeading } from '@ui/components/atoms/section-heading';
import { DetectionModeOption } from '@ui/components/molecules/detection-mode-option';
import { Button } from '@ui/components/ui/button';
import { messages } from '@ui/messages';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';
import type { DetectionMode } from '@ui/types/detectionMode';

type DetectionModeSelectorProps = {
  onStart: (mode: DetectionMode) => Promise<void>;
  isLoading: boolean;
};

const modeOptions: Array<{
  mode: DetectionMode;
  title: string;
  description: string;
}> = [
  {
    mode: 'selection',
    title: messages.detectionModeSelector.options.selection.title,
    description: messages.detectionModeSelector.options.selection.description
  },
  {
    mode: 'page-analysis',
    title: messages.detectionModeSelector.options.pageAnalysis.title,
    description: messages.detectionModeSelector.options.pageAnalysis.description
  }
];

export function DetectionModeSelector({
  onStart,
  isLoading
}: DetectionModeSelectorProps) {
  const { mode, setMode } = useDetectionModeStore();

  const handleStart = async () => {
    if (!mode || isLoading) return;

    await onStart(mode);
  };

  return (
    <section className="mode-selector">
      <SectionHeading
        label={messages.detectionModeSelector.heading.label}
        title={messages.detectionModeSelector.heading.title}
        subtitle={messages.detectionModeSelector.heading.subtitle}
      />

      <div className="mode-selector__grid">
        {modeOptions.map(option => (
          <DetectionModeOption
            key={option.mode}
            mode={option.mode}
            title={option.title}
            description={option.description}
            selected={mode === option.mode}
            onSelect={setMode}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={handleStart}
        disabled={!mode || isLoading}
        className="mode-selector__start-btn"
      >
        {isLoading
          ? messages.detectionModeSelector.actions.starting
          : messages.detectionModeSelector.actions.startDetection}
      </Button>
    </section>
  );
}
