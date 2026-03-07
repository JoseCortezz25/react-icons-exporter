import type {
  ColorMode,
  ExportFormat,
  FileStructure,
  NamingConvention
} from '@ui/store/useDetectionModeStore';

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
    label: 'Un archivo por ícono',
    description: 'Cada ícono en su propio archivo.'
  },
  {
    value: 'single-file',
    label: 'Todos en un archivo',
    description: 'SVG sprite o barrel file con todos los íconos.'
  }
];

const COLOR_MODE_OPTIONS: Array<{
  value: ColorMode;
  label: string;
  description: string;
}> = [
  {
    value: 'preserve',
    label: 'Preservar colores',
    description: 'Mantiene los colores originales del diseño.'
  },
  {
    value: 'currentColor',
    label: 'Usar currentColor',
    description: 'Reemplaza colores para herencia CSS dinámica.'
  }
];

const EXPORT_FORMAT_OPTIONS: Array<{
  value: ExportFormat;
  label: string;
  description: string;
}> = [
  { value: 'svg', label: 'SVG', description: 'Archivos .svg puros.' },
  {
    value: 'typescript',
    label: 'TypeScript',
    description: 'Componentes React .tsx'
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    description: 'Componentes React .jsx'
  }
];

const NAMING_OPTIONS: Array<{
  value: NamingConvention;
  label: string;
  preview: string;
}> = [
  { value: 'PascalCase', label: 'PascalCase', preview: 'ArrowRight' },
  { value: 'camelCase', label: 'camelCase', preview: 'arrowRight' },
  { value: 'snake_case', label: 'snake_case', preview: 'arrow_right' },
  { value: 'kebab-case', label: 'kebab-case', preview: 'arrow-right' }
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
      {/* Resumen */}
      <p className="export-config-panel__summary">
        <span className="export-config-panel__summary-count">
          {selectedCount}
        </span>{' '}
        {selectedCount === 1 ? 'ícono seleccionado' : 'íconos seleccionados'}
      </p>

      {/* Nombre del export */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">Nombre del archivo</p>
        <input
          type="text"
          className="export-config-input"
          value={zipName}
          onChange={e => onZipNameChange(e.target.value)}
          placeholder="icons"
          spellCheck={false}
        />
      </div>

      {/* Formato de exportación */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">Formato</p>
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
              Incluir definición de tipos (Props interface)
            </span>
          </label>
        )}
      </div>

      {/* Estructura de archivos */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          Estructura de archivos
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

      {/* Modo de color */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          Tratamiento de color
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

      {/* Convención de nombres */}
      <div className="export-config-panel__section">
        <p className="export-config-panel__section-title">
          Convención de nombres
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
