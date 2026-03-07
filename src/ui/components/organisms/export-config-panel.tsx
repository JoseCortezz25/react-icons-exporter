import type {
  ColorMode,
  FileStructure,
  NamingConvention
} from '@ui/store/useDetectionModeStore';

type ExportConfigPanelProps = {
  selectedCount: number;
  fileStructure: FileStructure;
  colorMode: ColorMode;
  namingConvention: NamingConvention;
  onFileStructureChange: (value: FileStructure) => void;
  onColorModeChange: (value: ColorMode) => void;
  onNamingConventionChange: (value: NamingConvention) => void;
};

const FILE_STRUCTURE_OPTIONS: Array<{
  value: FileStructure;
  label: string;
  description: string;
}> = [
  {
    value: 'individual',
    label: 'Un archivo por ícono',
    description: 'Cada ícono se exporta como un archivo SVG independiente.'
  },
  {
    value: 'single-file',
    label: 'Todos en un solo archivo',
    description: 'Todos los íconos se agrupan en un único archivo SVG sprite.'
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
    description: 'Mantiene los colores originales del diseño en el SVG.'
  },
  {
    value: 'currentColor',
    label: 'Usar currentColor',
    description:
      'Reemplaza los colores con currentColor para herencia CSS dinámica.'
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
  fileStructure,
  colorMode,
  namingConvention,
  onFileStructureChange,
  onColorModeChange,
  onNamingConventionChange
}: ExportConfigPanelProps) {
  return (
    <div className="export-config-panel">
      <div className="export-config-panel__summary">
        <span className="export-config-panel__summary-count">
          {selectedCount}
        </span>
        <span className="export-config-panel__summary-label">
          {selectedCount === 1 ? 'ícono seleccionado' : 'íconos seleccionados'}
        </span>
      </div>

      {/* Estructura de archivos */}
      <fieldset className="export-config-panel__group">
        <legend className="export-config-panel__group-title">
          Estructura de archivos
        </legend>
        <div className="export-config-panel__options">
          {FILE_STRUCTURE_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onFileStructureChange(option.value)}
              className={`export-option ${fileStructure === option.value ? 'export-option--selected' : ''}`}
            >
              <span className="export-option__label">{option.label}</span>
              <span className="export-option__description">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Modo de color */}
      <fieldset className="export-config-panel__group">
        <legend className="export-config-panel__group-title">
          Tratamiento de color
        </legend>
        <div className="export-config-panel__options">
          {COLOR_MODE_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => onColorModeChange(option.value)}
              className={`export-option ${colorMode === option.value ? 'export-option--selected' : ''}`}
            >
              <span className="export-option__label">{option.label}</span>
              <span className="export-option__description">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Convención de nombres */}
      <fieldset className="export-config-panel__group">
        <legend className="export-config-panel__group-title">
          Convención de nombres
        </legend>
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
      </fieldset>
    </div>
  );
}
