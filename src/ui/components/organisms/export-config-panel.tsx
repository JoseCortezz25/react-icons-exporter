import type {
  ColorMode,
  ExportFormat,
  FileStructure,
  NamingConvention
} from '@ui/store/useDetectionModeStore';
import { messages } from '@ui/messages';

type ExportConfigPanelProps = {
  selectedCount: number;
  zipName: string;
  fileStructure: FileStructure;
  colorMode: ColorMode;
  namingConvention: NamingConvention;
  exportFormat: ExportFormat;
  includeTypes: boolean;
  onZipNameChange: (value: string) => void;
  onFileStructureChange: (value: FileStructure) => void;
  onColorModeChange: (value: ColorMode) => void;
  onNamingConventionChange: (value: NamingConvention) => void;
  onExportFormatChange: (value: ExportFormat) => void;
  onIncludeTypesChange: (value: boolean) => void;
};

const FILE_STRUCTURE_OPTIONS: Array<{
  value: FileStructure;
  label: string;
  description: string;
}> = [
  {
    value: 'individual',
    label: messages.exportConfigPanel.options.fileStructure.individual.label,
    description:
      messages.exportConfigPanel.options.fileStructure.individual.description
  },
  {
    value: 'single-file',
    label: messages.exportConfigPanel.options.fileStructure.singleFile.label,
    description:
      messages.exportConfigPanel.options.fileStructure.singleFile.description
  }
];

const COLOR_MODE_OPTIONS: Array<{
  value: ColorMode;
  label: string;
  description: string;
}> = [
  {
    value: 'preserve',
    label: messages.exportConfigPanel.options.colorMode.preserve.label,
    description:
      messages.exportConfigPanel.options.colorMode.preserve.description
  },
  {
    value: 'currentColor',
    label: messages.exportConfigPanel.options.colorMode.currentColor.label,
    description:
      messages.exportConfigPanel.options.colorMode.currentColor.description
  }
];

const EXPORT_FORMAT_OPTIONS: Array<{
  value: ExportFormat;
  label: string;
  description: string;
}> = [
  {
    value: 'svg',
    label: messages.exportConfigPanel.options.exportFormat.svg.label,
    description: messages.exportConfigPanel.options.exportFormat.svg.description
  },
  {
    value: 'typescript',
    label: messages.exportConfigPanel.options.exportFormat.typescript.label,
    description:
      messages.exportConfigPanel.options.exportFormat.typescript.description
  },
  {
    value: 'javascript',
    label: messages.exportConfigPanel.options.exportFormat.javascript.label,
    description:
      messages.exportConfigPanel.options.exportFormat.javascript.description
  }
];

const NAMING_OPTIONS: Array<{
  value: NamingConvention;
  label: string;
  preview: string;
}> = [
  {
    value: 'PascalCase',
    label: messages.exportConfigPanel.options.namingConvention.pascalCase.label,
    preview:
      messages.exportConfigPanel.options.namingConvention.pascalCase.preview
  },
  {
    value: 'camelCase',
    label: messages.exportConfigPanel.options.namingConvention.camelCase.label,
    preview:
      messages.exportConfigPanel.options.namingConvention.camelCase.preview
  },
  {
    value: 'snake_case',
    label: messages.exportConfigPanel.options.namingConvention.snakeCase.label,
    preview:
      messages.exportConfigPanel.options.namingConvention.snakeCase.preview
  },
  {
    value: 'kebab-case',
    label: messages.exportConfigPanel.options.namingConvention.kebabCase.label,
    preview:
      messages.exportConfigPanel.options.namingConvention.kebabCase.preview
  }
];

export function ExportConfigPanel({
  selectedCount,
  zipName,
  fileStructure,
  colorMode,
  namingConvention,
  exportFormat,
  includeTypes,
  onZipNameChange,
  onFileStructureChange,
  onColorModeChange,
  onNamingConventionChange,
  onExportFormatChange,
  onIncludeTypesChange
}: ExportConfigPanelProps) {
  return (
    <div className="export-config-panel">
      {/* Summary */}
      <p className="export-config-panel__summary">
        <span className="export-config-panel__summary-count">
          {selectedCount}
        </span>{' '}
        {messages.exportConfigPanel.summary.selected(selectedCount)}
      </p>

      {/* Export name */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          {messages.exportConfigPanel.sections.fileName}
        </p>
        <input
          type="text"
          className="export-config-input"
          value={zipName}
          onChange={e => onZipNameChange(e.target.value)}
          placeholder={messages.exportConfigPanel.placeholders.zipName}
          spellCheck={false}
        />
      </div>

      {/* Export format */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          {messages.exportConfigPanel.sections.format}
        </p>
        <div className="export-config-panel__options">
          {EXPORT_FORMAT_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onExportFormatChange(option.value)}
              className={`config-option ${exportFormat === option.value ? 'config-option--selected' : ''}`}
            >
              <span className="config-option__label">{option.label}</span>
              <span className="config-option__description">
                {option.description}
              </span>
            </button>
          ))}
        </div>

        {exportFormat === 'typescript' && (
          <label className="export-config-toggle">
            <input
              type="checkbox"
              className="export-config-toggle__input"
              checked={includeTypes}
              onChange={e => onIncludeTypesChange(e.target.checked)}
            />
            <span className="export-config-toggle__label">
              {messages.exportConfigPanel.toggles.includeTypes}
            </span>
          </label>
        )}
      </div>

      {/* File structure */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          {messages.exportConfigPanel.sections.fileStructure}
        </p>
        <div className="export-config-panel__options">
          {FILE_STRUCTURE_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFileStructureChange(option.value)}
              className={`config-option ${fileStructure === option.value ? 'config-option--selected' : ''}`}
            >
              <span className="config-option__label">{option.label}</span>
              <span className="config-option__description">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color mode */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          {messages.exportConfigPanel.sections.colorHandling}
        </p>
        <div className="export-config-panel__options">
          {COLOR_MODE_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onColorModeChange(option.value)}
              className={`config-option ${colorMode === option.value ? 'config-option--selected' : ''}`}
            >
              <span className="config-option__label">{option.label}</span>
              <span className="config-option__description">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Naming convention */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          {messages.exportConfigPanel.sections.namingConvention}
        </p>
        <div className="export-config-panel__naming-grid">
          {NAMING_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onNamingConventionChange(option.value)}
              className={`naming-option ${namingConvention === option.value ? 'naming-option--selected' : ''}`}
            >
              <span className="naming-option__label">{option.label}</span>
              <span className="naming-option__preview">{option.preview}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
