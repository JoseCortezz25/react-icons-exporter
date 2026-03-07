import { ExportConfigPanel } from '@ui/components/organisms/export-config-panel';
import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { Button } from '@ui/components/ui/button';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';
import { useState } from 'react';

export function ExportConfigPage() {
  const {
    selectedIconIds,
    fileStructure,
    colorMode,
    namingConvention,
    setFileStructure,
    setColorMode,
    setNamingConvention,
    reset
  } = useDetectionModeStore();

  const [exported, setExported] = useState(false);

  const selectedCount = selectedIconIds.length;

  const handleExport = () => {
    // TODO: trigger actual export via plugin channel
    setExported(true);
  };

  const handleBack = () => {
    useDetectionModeStore.setState({ step: 'icons-review' });
  };

  return (
    <InitialViewTemplate>
      <section className="export-config-page">
        <header className="export-config-page__header">
          <div>
            <p className="export-config-page__label">Paso 3 de 3</p>
            <h2 className="export-config-page__title">
              Configura la exportación
            </h2>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="export-config-page__back-btn"
          >
            Volver
          </Button>
        </header>

        <ExportConfigPanel
          selectedCount={selectedCount}
          fileStructure={fileStructure}
          colorMode={colorMode}
          namingConvention={namingConvention}
          onFileStructureChange={setFileStructure}
          onColorModeChange={setColorMode}
          onNamingConventionChange={setNamingConvention}
        />

        <div className="export-config-page__actions">
          <Button
            type="button"
            onClick={handleExport}
            className="export-config-page__export-btn"
            disabled={selectedCount === 0 || exported}
          >
            {exported
              ? '¡Exportación lista!'
              : `Exportar ${selectedCount} ${selectedCount === 1 ? 'ícono' : 'íconos'}`}
          </Button>

          {exported && (
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              className="export-config-page__restart-btn"
            >
              Nueva exportación
            </Button>
          )}
        </div>

        {exported && (
          <p className="export-config-page__success">
            {selectedCount}{' '}
            {selectedCount === 1 ? 'ícono exportado' : 'íconos exportados'} con
            éxito usando <strong>{namingConvention}</strong>,{' '}
            {fileStructure === 'individual'
              ? 'un archivo por ícono'
              : 'en un solo archivo'}{' '}
            y colores en modo{' '}
            <strong>
              {colorMode === 'preserve' ? 'preservado' : 'currentColor'}
            </strong>
            .
          </p>
        )}
      </section>
    </InitialViewTemplate>
  );
}
