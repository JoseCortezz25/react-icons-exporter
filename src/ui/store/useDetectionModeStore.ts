import { create } from 'zustand';

import type {
  DetectIconsResponse,
  DetectedIcon,
  DetectionMode
} from '@common/iconDetection.types';

type DetectionStep = 'initial' | 'icons-review' | 'export-config';

export type FileStructure = 'individual' | 'single-file';
export type ColorMode = 'preserve' | 'currentColor';
export type NamingConvention = 'PascalCase' | 'camelCase' | 'snake_case' | 'kebab-case';

type DetectionModeState = {
  mode: DetectionMode | null;
  step: DetectionStep;
  detectedIcons: DetectedIcon[];
  groupedCount: number;
  selectedIconIds: string[];
  fileStructure: FileStructure;
  colorMode: ColorMode;
  namingConvention: NamingConvention;
  setMode: (mode: DetectionMode) => void;
  setDetectionResults: (payload: DetectIconsResponse) => void;
  toggleIconSelection: (iconId: string) => void;
  selectAllIcons: () => void;
  clearSelectedIcons: () => void;
  goToInitial: () => void;
  goToExportConfig: () => void;
  setFileStructure: (value: FileStructure) => void;
  setColorMode: (value: ColorMode) => void;
  setNamingConvention: (value: NamingConvention) => void;
  reset: () => void;
};

export const useDetectionModeStore = create<DetectionModeState>(set => ({
  mode: null,
  step: 'initial',
  detectedIcons: [],
  groupedCount: 0,
  selectedIconIds: [],
  fileStructure: 'individual',
  colorMode: 'preserve',
  namingConvention: 'PascalCase',
  setMode: mode => set({ mode }),
  setDetectionResults: payload =>
    set({
      mode: payload.mode,
      step: 'icons-review',
      detectedIcons: payload.icons,
      groupedCount: payload.groupedCount,
      selectedIconIds: payload.icons.map(icon => icon.id)
    }),
  toggleIconSelection: iconId =>
    set(state => {
      const isSelected = state.selectedIconIds.includes(iconId);

      return {
        selectedIconIds: isSelected
          ? state.selectedIconIds.filter(id => id !== iconId)
          : [...state.selectedIconIds, iconId]
      };
    }),
  selectAllIcons: () =>
    set(state => ({
      selectedIconIds: state.detectedIcons.map(icon => icon.id)
    })),
  clearSelectedIcons: () => set({ selectedIconIds: [] }),
  goToInitial: () =>
    set({
      step: 'initial',
      detectedIcons: [],
      groupedCount: 0,
      selectedIconIds: []
    }),
  goToExportConfig: () => set({ step: 'export-config' }),
  setFileStructure: value => set({ fileStructure: value }),
  setColorMode: value => set({ colorMode: value }),
  setNamingConvention: value => set({ namingConvention: value }),
  reset: () =>
    set({
      mode: null,
      step: 'initial',
      detectedIcons: [],
      groupedCount: 0,
      selectedIconIds: [],
      fileStructure: 'individual',
      colorMode: 'preserve',
      namingConvention: 'PascalCase'
    })
}));
