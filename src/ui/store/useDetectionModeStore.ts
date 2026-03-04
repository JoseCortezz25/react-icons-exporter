import { create } from 'zustand';

import type {
  DetectIconsResponse,
  DetectedIcon,
  DetectionMode
} from '@common/iconDetection.types';

type DetectionStep = 'initial' | 'icons-review';

type DetectionModeState = {
  mode: DetectionMode | null;
  step: DetectionStep;
  detectedIcons: DetectedIcon[];
  groupedCount: number;
  selectedIconIds: string[];
  setMode: (mode: DetectionMode) => void;
  setDetectionResults: (payload: DetectIconsResponse) => void;
  toggleIconSelection: (iconId: string) => void;
  selectAllIcons: () => void;
  clearSelectedIcons: () => void;
  goToInitial: () => void;
  reset: () => void;
};

export const useDetectionModeStore = create<DetectionModeState>(set => ({
  mode: null,
  step: 'initial',
  detectedIcons: [],
  groupedCount: 0,
  selectedIconIds: [],
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
  reset: () =>
    set({
      mode: null,
      step: 'initial',
      detectedIcons: [],
      groupedCount: 0,
      selectedIconIds: []
    })
}));
