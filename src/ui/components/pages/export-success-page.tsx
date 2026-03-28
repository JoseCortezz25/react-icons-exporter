import { InitialViewTemplate } from '@ui/components/templates/initial-view-template';
import { Button } from '@ui/components/ui/button';
import { messages } from '@ui/messages';
import { useDetectionModeStore } from '@ui/store/useDetectionModeStore';

const FORMAT_LABELS: Record<string, string> = {
  svg: messages.exportSuccessPage.formatLabels.svg,
  typescript: messages.exportSuccessPage.formatLabels.typescript,
  javascript: messages.exportSuccessPage.formatLabels.javascript
};

const STRUCTURE_LABELS: Record<string, string> = {
  individual: messages.exportSuccessPage.structureLabels.individual,
  'single-file': messages.exportSuccessPage.structureLabels.singleFile
};

export function ExportSuccessPage() {
  const {
    exportedCount,
    zipName,
    exportFormat,
    namingConvention,
    fileStructure,
    reset
  } = useDetectionModeStore();

  const safeZipName = zipName || messages.exportSuccessPage.defaultZipName;

  return (
    <InitialViewTemplate>
      <section className="export-success-page">
        <div className="export-success-page__check">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="export-success-page__content">
          <p className="export-success-page__label">
            {messages.exportSuccessPage.heading.label}
          </p>
          <h2 className="export-success-page__count">
            {messages.exportSuccessPage.heading.exportedCount(exportedCount)}
          </h2>

          <p className="export-success-page__filename">
            <span className="export-success-page__filename-icon">↓</span>
            {safeZipName}.zip
          </p>
        </div>

        <ul className="export-success-page__meta">
          <li className="export-success-meta-item">
            <span className="export-success-meta-item__key">
              {messages.exportSuccessPage.meta.format}
            </span>
            <span className="export-success-meta-item__value">
              {FORMAT_LABELS[exportFormat] ?? exportFormat}
            </span>
          </li>
          <li className="export-success-meta-item">
            <span className="export-success-meta-item__key">
              {messages.exportSuccessPage.meta.naming}
            </span>
            <span className="export-success-meta-item__value">
              {namingConvention}
            </span>
          </li>
          <li className="export-success-meta-item">
            <span className="export-success-meta-item__key">
              {messages.exportSuccessPage.meta.structure}
            </span>
            <span className="export-success-meta-item__value">
              {STRUCTURE_LABELS[fileStructure] ?? fileStructure}
            </span>
          </li>
        </ul>

        <Button
          type="button"
          onClick={reset}
          className="export-success-page__restart-btn"
        >
          {messages.exportSuccessPage.actions.newExport}
        </Button>
      </section>
    </InitialViewTemplate>
  );
}
