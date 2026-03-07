import { ExportConfigPage } from '@ui/components/pages/export-config-page';
import { IconsReviewPage } from '@ui/components/pages/icons-review-page';
import { InitialDetectionPage } from '@ui/components/pages/initial-detection-page';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';

import '@ui/styles/main.css';

function App() {
  const step = useDetectionModeStore(state => state.step);

  if (step === 'export-config') {
    return <ExportConfigPage />;
  }

  if (step === 'icons-review') {
    return <IconsReviewPage />;
  }

  return <InitialDetectionPage />;
}

export default App;
