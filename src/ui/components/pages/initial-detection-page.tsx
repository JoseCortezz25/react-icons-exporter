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

  const handleStart = async (selectedMode: DetectionMode) => {
    setIsLoading(true);

    try {
      const result = await UI_CHANNEL.request(PLUGIN, 'detectIcons', [
        selectedMode
      ]);

      if (result.icons.length === 0) {
        UI_CHANNEL.request(PLUGIN, 'notify', [
          'No se encontraron íconos con el modo seleccionado',
          { error: true }
        ]);
      } else {
        UI_CHANNEL.request(PLUGIN, 'notify', [
          `${result.icons.length} íconos detectados correctamente`
        ]);
      }

      setDetectionResults(result);
    } catch (err) {
      const fallbackMessage =
        'No se pudo iniciar la detección de iconos con el modo elegido.';
      const message =
        err instanceof NetworkError
          ? err.message || fallbackMessage
          : fallbackMessage;

      UI_CHANNEL.request(PLUGIN, 'notify', [message, { error: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InitialViewTemplate>
      <DetectionModeSelector onStart={handleStart} isLoading={isLoading} />
    </InitialViewTemplate>
  );
}
