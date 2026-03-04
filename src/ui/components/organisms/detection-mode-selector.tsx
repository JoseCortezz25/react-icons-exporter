import { SectionHeading } from '@ui/components/atoms/section-heading';
import { DetectionModeOption } from '@ui/components/molecules/detection-mode-option';
import { Button } from '@ui/components/ui/button';
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
    title: 'Selección',
    description: 'Detecta iconos desde la selección activa del lienzo.'
  },
  {
    mode: 'page-analysis',
    title: 'Análisis de página completa',
    description:
      'Escanea todos los nodos de la página para encontrar candidatos.'
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
        label="React Icons Exporter"
        title="Modo de detección inicial"
        subtitle="Elige cómo quieres que empecemos a detectar iconos en tu archivo."
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
        {isLoading ? 'Iniciando...' : 'Comenzar detección'}
      </Button>
    </section>
  );
}
