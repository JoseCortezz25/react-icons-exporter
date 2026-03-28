import { PLUGIN } from '@common/networkSides';
import { UI_CHANNEL } from '@ui/app.network';
import { DetectionModeSelector } from '@ui/components/organisms/detection-mode-selector';
import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { messages } from '@ui/messages';
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
          messages.initialDetectionPage.notifications.noIconsFound,
          { error: true }
        ]);
      } else {
        UI_CHANNEL.request(PLUGIN, 'notify', [
          messages.initialDetectionPage.notifications.iconsDetected(
            result.icons.length
          )
        ]);
      }

      setDetectionResults(result);
    } catch (err) {
      const fallbackMessage =
        messages.initialDetectionPage.notifications.detectionStartFailed;
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
