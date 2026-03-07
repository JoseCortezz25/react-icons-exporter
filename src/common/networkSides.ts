import { Networker } from 'monorepo-networker';

import type { DetectIconsResponse, DetectionMode } from './iconDetection.types';

export const UI = Networker.createSide('UI-side').listens<{
  ping(): 'pong';
  hello(text: string): void;
}>();

export const PLUGIN = Networker.createSide('Plugin-side').listens<{
  ping(): 'pong';
  hello(text: string): void;
  createRect(width: number, height: number): void;
  exportSelection(): Promise<string>;
  analyzeCurrentPage(): Promise<{
    totalNodes: number;
    iconCandidates: number;
  }>;
  detectIcons(mode: DetectionMode): Promise<DetectIconsResponse>;
  notify(
    message: string,
    options?: { error?: boolean; timeout?: number }
  ): void;
}>();
