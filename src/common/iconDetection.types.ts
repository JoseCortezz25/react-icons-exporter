export type DetectionMode = 'selection' | 'page-analysis';

export type DetectedIcon = {
  id: string;
  name: string;
  preview: string;
  isInGroup: boolean;
};

export type DetectIconsResponse = {
  mode: DetectionMode;
  totalDetected: number;
  groupedCount: number;
  icons: DetectedIcon[];
};
