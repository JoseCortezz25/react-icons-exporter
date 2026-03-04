import { PLUGIN } from '@common/networkSides';
import { UI_CHANNEL } from '@ui/app.network';
import { DetectionModeSelector } from '@ui/components/organisms/detection-mode-selector';
import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';
import type { DetectionMode } from '@ui/types/detectionMode';
import { NetworkError } from 'monorepo-networker';
import { useState } from 'react';

export function InitialDetectionPage() {
  const setDetectionResults = useDetectionModeStore(
    state => state.setDetectionResults
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async (selectedMode: DetectionMode) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await UI_CHANNEL.request(PLUGIN, 'detectIcons', [
        selectedMode
      ]);
      setDetectionResults(result);
    } catch (err) {
      const fallbackMessage =
        'No se pudo iniciar la detección de iconos con el modo elegido.';

      if (err instanceof NetworkError) {
        setError(err.message || fallbackMessage);
      } else {
        setError(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InitialViewTemplate>
      <DetectionModeSelector onStart={handleStart} isLoading={isLoading} />
      {error && <p className="mode-selector__error">{error}</p>}
    </InitialViewTemplate>
  );
}
