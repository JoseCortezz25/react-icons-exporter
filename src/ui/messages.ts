export const messages = {
  initialDetectionPage: {
    notifications: {
      noIconsFound: 'No icons were found with the selected mode.',
      iconsDetected: (count: number) =>
        `${count} ${count === 1 ? 'icon' : 'icons'} detected successfully`,
      detectionStartFailed:
        'Could not start icon detection with the selected mode.'
    }
  },
  detectionModeSelector: {
    heading: {
      label: 'Icons to React',
      title: 'Initial detection mode',
      subtitle: 'Choose how we should start detecting icons in your file.'
    },
    options: {
      selection: {
        title: 'Selection',
        description: 'Detect icons from the current active canvas selection.'
      },
      pageAnalysis: {
        title: 'Full page analysis',
        description: 'Scan all nodes on the page to find icon candidates.'
      }
    },
    actions: {
      starting: 'Starting...',
      startDetection: 'Start detection'
    }
  },
  iconsReviewPage: {
    heading: {
      label: 'Detected list',
      title: 'Select the SVGs to export'
    },
    actions: {
      changeMode: 'Change mode',
      deselectAll: 'Deselect all',
      selectAll: 'Select all',
      exportSelected: (count: number) => `Export selected (${count})`
    }
  },
  detectedIconsPanel: {
    stats: {
      detectedIcons: 'Detected icons',
      inGroup: 'Inside groups'
    },
    emptyState: 'No icons were detected in this mode.'
  },
  detectedIconItem: {
    previewAlt: (name: string) => `Preview of ${name}`,
    tags: {
      inGroup: 'Inside group',
      standaloneNode: 'Standalone node'
    }
  },
  exportConfigPage: {
    notifications: {
      exportSuccess: (count: number) =>
        `${count} ${count === 1 ? 'icon' : 'icons'} exported successfully`,
      exportError: 'Failed to generate the export file.'
    },
    heading: {
      step: 'Step 3 of 3',
      title: 'Configure export'
    },
    actions: {
      back: 'Back',
      exporting: 'Exporting…',
      exportNow: 'Export now'
    }
  },
  exportConfigPanel: {
    summary: {
      selected: (count: number) =>
        `${count} ${count === 1 ? 'icon selected' : 'icons selected'}`
    },
    sections: {
      fileName: 'File name',
      format: 'Format',
      fileStructure: 'File structure',
      colorHandling: 'Color handling',
      namingConvention: 'Naming convention'
    },
    placeholders: {
      zipName: 'icons'
    },
    toggles: {
      includeTypes: 'Include type definitions (Props interface)'
    },
    options: {
      fileStructure: {
        individual: {
          label: 'One file per icon',
          description: 'Each icon in its own file.'
        },
        singleFile: {
          label: 'Single file',
          description: 'SVG sprite or barrel file with all icons.'
        }
      },
      colorMode: {
        preserve: {
          label: 'Preserve colors',
          description: 'Keeps original colors from the design.'
        },
        currentColor: {
          label: 'Use currentColor',
          description: 'Replaces colors for dynamic CSS inheritance.'
        }
      },
      exportFormat: {
        svg: {
          label: 'SVG',
          description: 'Pure .svg files.'
        },
        typescript: {
          label: 'TypeScript',
          description: 'React .tsx components'
        },
        javascript: {
          label: 'JavaScript',
          description: 'React .jsx components'
        }
      },
      namingConvention: {
        pascalCase: {
          label: 'PascalCase',
          preview: 'ArrowRight'
        },
        camelCase: {
          label: 'camelCase',
          preview: 'arrowRight'
        },
        snakeCase: {
          label: 'snake_case',
          preview: 'arrow_right'
        },
        kebabCase: {
          label: 'kebab-case',
          preview: 'arrow-right'
        }
      }
    }
  },
  exportSuccessPage: {
    defaultZipName: 'icons',
    formatLabels: {
      svg: 'SVG',
      typescript: 'TypeScript',
      javascript: 'JavaScript'
    },
    structureLabels: {
      individual: 'One file per icon',
      singleFile: 'Single file'
    },
    heading: {
      label: 'Export completed',
      exportedCount: (count: number) =>
        `${count} ${count === 1 ? 'icon exported' : 'icons exported'}`
    },
    meta: {
      format: 'Format',
      naming: 'Naming',
      structure: 'Structure'
    },
    actions: {
      newExport: 'New export'
    }
  }
} as const;
