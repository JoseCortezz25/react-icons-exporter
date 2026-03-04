import { DetectedIconsPanel } from '@ui/components/organisms/detected-icons-panel';
import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { Button } from '@ui/components/ui/button';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';
import { useMemo, useState } from 'react';

export function IconsReviewPage() {
  const {
    mode,
    detectedIcons,
    groupedCount,
    selectedIconIds,
    toggleIconSelection,
    selectAllIcons,
    clearSelectedIcons,
    goToInitial
  } = useDetectionModeStore();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const selectedCount = selectedIconIds.length;
  const allSelected =
    detectedIcons.length > 0 && selectedCount === detectedIcons.length;

  const detectionScopeLabel = useMemo(() => {
    return mode === 'selection' ? 'selección activa' : 'página completa';
  }, [mode]);

  const handleToggleSelectAll = () => {
    if (allSelected) {
      clearSelectedIcons();
      return;
    }

    selectAllIcons();
  };

  const handleExport = () => {
    setInfoMessage(
      `Preparados ${selectedCount} íconos de ${detectionScopeLabel} para exportación.`
    );
  };

  return (
    <InitialViewTemplate>
      <section className="icons-review-page">
        <header className="icons-review-page__header">
          <div>
            <p className="icons-review-page__label">Listado detectado</p>
            <h2 className="icons-review-page__title">
              Selecciona los SVG a exportar
            </h2>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={goToInitial}
            className="icons-review-page__mode-btn"
          >
            Cambiar modo
          </Button>
        </header>

        <DetectedIconsPanel
          icons={detectedIcons}
          groupedCount={groupedCount}
          selectedIconIds={selectedIconIds}
          onToggleIcon={toggleIconSelection}
        />

        <div className="icons-review-page__actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleToggleSelectAll}
            className="icons-review-page__secondary-btn"
            disabled={detectedIcons.length === 0}
          >
            {allSelected ? 'Deseleccionar todos' : 'Seleccionar todos'}
          </Button>

          <Button
            type="button"
            onClick={handleExport}
            className="icons-review-page__primary-btn"
            disabled={selectedCount === 0}
          >
            Exportar seleccionados ({selectedCount})
          </Button>
        </div>

        {infoMessage && (
          <p className="icons-review-page__info">{infoMessage}</p>
        )}
      </section>
    </InitialViewTemplate>
  );
}
