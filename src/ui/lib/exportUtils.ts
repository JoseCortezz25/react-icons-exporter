import JSZip from 'jszip';

import type {
  ColorMode,
  ExportFormat,
  FileStructure,
  NamingConvention
} from '@ui/store/useDetectionModeStore';
import type { DetectedIcon } from '@common/iconDetection.types';

export type ExportFile = {
  filename: string;
  content: string;
};

export type ExportConfig = {
  fileStructure: FileStructure;
  colorMode: ColorMode;
  namingConvention: NamingConvention;
  exportFormat: ExportFormat;
  includeTypes: boolean;
};

// ── Naming convention ─────────────────────────────────────────────────────────

export function applyNamingConvention(
  name: string,
  convention: NamingConvention
): string {
  const words = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_./\\]/g, ' ')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);

  if (words.length === 0) return 'icon';

  switch (convention) {
    case 'PascalCase':
      return words.map(w => w[0].toUpperCase() + w.slice(1)).join('');
    case 'camelCase':
      return words
        .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
        .join('');
    case 'snake_case':
      return words.join('_');
    case 'kebab-case':
      return words.join('-');
  }
}

// ── SVG decoding ──────────────────────────────────────────────────────────────

export function decodeSvgFromDataUrl(dataUrl: string): string {
  const base64 = dataUrl.split(',')[1];
  return atob(base64);
}

// ── SVG color transformation ──────────────────────────────────────────────────

export function applyCurrentColor(svgContent: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');

  doc.querySelectorAll('*').forEach(el => {
    const fill = el.getAttribute('fill');
    const stroke = el.getAttribute('stroke');

    if (fill && fill !== 'none' && fill !== 'currentColor') {
      el.setAttribute('fill', 'currentColor');
    }
    if (stroke && stroke !== 'none' && stroke !== 'currentColor') {
      el.setAttribute('stroke', 'currentColor');
    }

    // Also handle inline style colors
    const style = el.getAttribute('style');
    if (style) {
      const updated = style
        .replace(/fill\s*:\s*(?!none|currentColor)[^;]+/g, 'fill:currentColor')
        .replace(
          /stroke\s*:\s*(?!none|currentColor)[^;]+/g,
          'stroke:currentColor'
        );
      el.setAttribute('style', updated);
    }
  });

  return new XMLSerializer().serializeToString(doc.documentElement);
}

// ── SVG content helpers ───────────────────────────────────────────────────────

function extractViewBox(svgContent: string): string {
  const match = svgContent.match(/viewBox\s*=\s*["']([^"']+)["']/);
  return match ? match[1] : '0 0 24 24';
}

function extractInnerSvg(svgContent: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  return Array.from(doc.documentElement.childNodes)
    .map(node => new XMLSerializer().serializeToString(node))
    .join('\n    ');
}

// ── Component generators ──────────────────────────────────────────────────────

function generateTsxComponent(
  componentName: string,
  svgContent: string,
  includeTypes: boolean
): string {
  const viewBox = extractViewBox(svgContent);
  const inner = extractInnerSvg(svgContent);

  const propsType = includeTypes
    ? `\ninterface ${componentName}Props extends React.SVGProps<SVGSVGElement> {}\n`
    : '';
  const propsAnnotation = includeTypes
    ? `: React.FC<${componentName}Props>`
    : '';

  return `import React from 'react';
${propsType}
const ${componentName}${propsAnnotation} = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewBox}"
    fill="currentColor"
    {...props}
  >
    ${inner}
  </svg>
);

export default ${componentName};
`;
}

function generateJsxComponent(
  componentName: string,
  svgContent: string
): string {
  const viewBox = extractViewBox(svgContent);
  const inner = extractInnerSvg(svgContent);

  return `import React from 'react';

const ${componentName} = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="${viewBox}"
    fill="currentColor"
    {...props}
  >
    ${inner}
  </svg>
);

export default ${componentName};
`;
}

// ── Multi-icon generators ─────────────────────────────────────────────────────

function generateSvgSprite(
  icons: Array<{ id: string; svgContent: string; namingConvention: NamingConvention }>
): string {
  const symbols = icons
    .map(({ id, svgContent, namingConvention }) => {
      const safeId = applyNamingConvention(id, namingConvention);
      const viewBox = extractViewBox(svgContent);
      const inner = extractInnerSvg(svgContent);
      return `  <symbol id="${safeId}" viewBox="${viewBox}">\n    ${inner}\n  </symbol>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols}\n</svg>\n`;
}

function generateBarrelFile(
  componentNames: string[],
  format: 'typescript' | 'javascript'
): string {
  const ext = format === 'typescript' ? '.tsx' : '.jsx';
  return (
    componentNames
      .map(name => `export { default as ${name} } from './${name}${ext}';`)
      .join('\n') + '\n'
  );
}

// ── Main export function ──────────────────────────────────────────────────────

export function generateExportFiles(
  icons: DetectedIcon[],
  config: ExportConfig
): ExportFile[] {
  const { fileStructure, colorMode, namingConvention, exportFormat, includeTypes } =
    config;

  const processed = icons.map(icon => {
    let svgContent = decodeSvgFromDataUrl(icon.preview);
    if (colorMode === 'currentColor') {
      svgContent = applyCurrentColor(svgContent);
    }
    const baseName = applyNamingConvention(icon.name, namingConvention);
    return { icon, svgContent, baseName };
  });

  if (exportFormat === 'svg') {
    if (fileStructure === 'single-file') {
      const spriteContent = generateSvgSprite(
        processed.map(p => ({
          id: p.baseName,
          svgContent: p.svgContent,
          namingConvention
        }))
      );
      return [{ filename: 'sprite.svg', content: spriteContent }];
    }

    return processed.map(p => ({
      filename: `${p.baseName}.svg`,
      content: p.svgContent
    }));
  }

  if (exportFormat === 'typescript') {
    const componentFiles: ExportFile[] = processed.map(p => ({
      filename: `${p.baseName}.tsx`,
      content: generateTsxComponent(p.baseName, p.svgContent, includeTypes)
    }));

    if (fileStructure === 'single-file') {
      const barrel: ExportFile = {
        filename: 'index.ts',
        content: generateBarrelFile(
          processed.map(p => p.baseName),
          'typescript'
        )
      };
      return [...componentFiles, barrel];
    }

    return componentFiles;
  }

  // javascript
  const componentFiles: ExportFile[] = processed.map(p => ({
    filename: `${p.baseName}.jsx`,
    content: generateJsxComponent(p.baseName, p.svgContent)
  }));

  if (fileStructure === 'single-file') {
    const barrel: ExportFile = {
      filename: 'index.js',
      content: generateBarrelFile(
        processed.map(p => p.baseName),
        'javascript'
      )
    };
    return [...componentFiles, barrel];
  }

  return componentFiles;
}

// ── Zip download ──────────────────────────────────────────────────────────────

export async function downloadAsZip(
  files: ExportFile[],
  zipName: string
): Promise<void> {
  const zip = new JSZip();

  files.forEach(f => zip.file(f.filename, f.content));

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${zipName || 'icons'}.zip`;
  anchor.click();
  URL.revokeObjectURL(url);
}
