import { PLUGIN } from '@common/networkSides';
import { UI_CHANNEL } from '@ui/app.network';
import { ExportConfigPanel } from '@ui/components/organisms/export-config-panel';
import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { Button } from '@ui/components/ui/button';
import { downloadAsZip, generateExportFiles } from '@ui/lib/exportUtils';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';
import { useState } from 'react';

export function ExportConfigPage() {
  const {
    detectedIcons,
    selectedIconIds,
    fileStructure,
    colorMode,
    namingConvention,
    exportFormat,
    includeTypes,
    zipName,
    setFileStructure,
    setColorMode,
    setNamingConvention,
    setExportFormat,
    setIncludeTypes,
    setZipName,
    goToSuccess
  } = useDetectionModeStore();

  const [isExporting, setIsExporting] = useState(false);

  const selectedCount = selectedIconIds.length;

  const handleBack = () => {
    useDetectionModeStore.setState({ step: 'icons-review' });
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const selectedIcons = detectedIcons.filter(icon =>
        selectedIconIds.includes(icon.id)
      );

      const files = generateExportFiles(selectedIcons, {
        fileStructure,
        colorMode,
        namingConvention,
        exportFormat,
        includeTypes
      });

      await downloadAsZip(files, zipName || 'icons');

      UI_CHANNEL.request(PLUGIN, 'notify', [
        `${selectedIcons.length} íconos exportados correctamente`
      ]);

      goToSuccess(selectedIcons.length);
    } catch {
      UI_CHANNEL.request(PLUGIN, 'notify', [
        'Error al generar el archivo de exportación',
        { error: true }
      ]);
    } finally {
      setIsExporting(false);
    }
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
          zipName={zipName}
          fileStructure={fileStructure}
          colorMode={colorMode}
          namingConvention={namingConvention}
          exportFormat={exportFormat}
          includeTypes={includeTypes}
          onZipNameChange={setZipName}
          onFileStructureChange={setFileStructure}
          onColorModeChange={setColorMode}
          onNamingConventionChange={setNamingConvention}
          onExportFormatChange={setExportFormat}
          onIncludeTypesChange={setIncludeTypes}
        />

        <Button
          type="button"
          onClick={handleExport}
          className="export-config-page__export-btn"
          disabled={selectedCount === 0 || isExporting}
        >
          {isExporting ? 'Exportando…' : 'Exportar ahora'}
        </Button>
      </section>
    </InitialViewTemplate>
  );
}
