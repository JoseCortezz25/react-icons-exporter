import type {
  DetectIconsResponse,
  DetectedIcon,
  DetectionMode
} from '@common/iconDetection.types';
import { PLUGIN, UI } from '@common/networkSides';

const MAX_ICONS_IN_RESPONSE = 200;

const VECTOR_NODE_TYPES = new Set<SceneNode['type']>([
  'VECTOR',
  'BOOLEAN_OPERATION',
  'STAR',
  'LINE',
  'POLYGON',
  'ELLIPSE',
  'RECTANGLE'
]);

type ExportableSceneNode = SceneNode & ExportMixin;

function isExportableNode(node: SceneNode): node is ExportableSceneNode {
  return typeof (node as ExportableSceneNode).exportAsync === 'function';
}

function canMeasureNode(
  node: SceneNode
): node is SceneNode & DimensionAndPositionMixin {
  return 'width' in node && 'height' in node;
}

function hasChildren(node: SceneNode): node is SceneNode & ChildrenMixin {
  return typeof (node as SceneNode & ChildrenMixin).findAll === 'function';
}

function isLikelySvgIcon(node: SceneNode): boolean {
  if (!isExportableNode(node) || !node.visible) {
    return false;
  }

  const hasIconLikeName = /\b(icon|ico|svg)\b/i.test(node.name);
  const hasCompactSize = canMeasureNode(node)
    ? node.width > 0 &&
      node.height > 0 &&
      node.width <= 256 &&
      node.height <= 256
    : false;

  if (!hasCompactSize) {
    return false;
  }

  return VECTOR_NODE_TYPES.has(node.type) || hasIconLikeName;
}

function dedupeNodesById(nodes: readonly SceneNode[]): SceneNode[] {
  const uniqueNodes = new Map<string, SceneNode>();

  for (const node of nodes) {
    if (!uniqueNodes.has(node.id)) {
      uniqueNodes.set(node.id, node);
    }
  }

  return Array.from(uniqueNodes.values());
}

function removeCoveredChildren(candidates: SceneNode[]): SceneNode[] {
  const ids = new Set(candidates.map(n => n.id));
  return candidates.filter(node => {
    let ancestor = node.parent;
    while (ancestor && ancestor.type !== 'PAGE') {
      if (ids.has(ancestor.id)) return false;
      ancestor = ancestor.parent;
    }
    return true;
  });
}

function collectSelectionCandidates(): SceneNode[] {
  const selectedNodes = figma.currentPage.selection;

  if (selectedNodes.length === 0) {
    throw new Error('No hay selección activa para detectar iconos.');
  }

  const candidates: SceneNode[] = [];

  for (const node of selectedNodes) {
    if (isLikelySvgIcon(node)) {
      candidates.push(node);
    }

    if (hasChildren(node)) {
      candidates.push(...node.findAll(child => isLikelySvgIcon(child)));
    }
  }

  return removeCoveredChildren(dedupeNodesById(candidates));
}

function collectPageCandidates(): SceneNode[] {
  const candidates = figma.currentPage.findAll(node => isLikelySvgIcon(node));
  return removeCoveredChildren(dedupeNodesById(candidates));
}

function hasGroupAncestor(node: SceneNode): boolean {
  let currentParent: BaseNode | null = node.parent;

  while (currentParent && currentParent.type !== 'PAGE') {
    if (currentParent.type === 'GROUP') {
      return true;
    }

    currentParent = currentParent.parent;
  }

  return false;
}

async function toDetectedIcon(node: SceneNode): Promise<DetectedIcon | null> {
  if (!isExportableNode(node)) {
    return null;
  }

  try {
    const svgBytes = await node.exportAsync({
      format: 'SVG',
      contentsOnly: true
    });

    return {
      id: node.id,
      name: node.name.trim() || 'Sin nombre',
      preview: 'data:image/svg+xml;base64,' + figma.base64Encode(svgBytes),
      isInGroup: hasGroupAncestor(node)
    };
  } catch {
    return null;
  }
}

async function detectIcons(mode: DetectionMode): Promise<DetectIconsResponse> {
  const nodes =
    mode === 'selection'
      ? collectSelectionCandidates()
      : collectPageCandidates();

  const icons = await Promise.all(
    nodes.slice(0, MAX_ICONS_IN_RESPONSE).map(node => toDetectedIcon(node))
  );

  const detectedIcons = icons.filter(
    (icon): icon is DetectedIcon => icon !== null
  );
  const groupedCount = detectedIcons.filter(icon => icon.isInGroup).length;

  return {
    mode,
    totalDetected: detectedIcons.length,
    groupedCount,
    icons: detectedIcons
  };
}

export const PLUGIN_CHANNEL = PLUGIN.channelBuilder()
  .emitsTo(UI, message => {
    figma.ui.postMessage(message);
  })
  .receivesFrom(UI, next => {
    const listener: MessageEventHandler = event => next(event);
    figma.ui.on('message', listener);
    return () => figma.ui.off('message', listener);
  })
  .startListening();

// ---------- Message handlers

PLUGIN_CHANNEL.registerMessageHandler('ping', () => {
  return 'pong';
});

PLUGIN_CHANNEL.registerMessageHandler('hello', text => {
  console.log('UI side said:', text);
});

PLUGIN_CHANNEL.registerMessageHandler('createRect', (width, height) => {
  if (figma.editorType === 'figma') {
    const rect = figma.createRectangle();
    rect.x = 0;
    rect.y = 0;
    rect.name = 'Plugin Rectangle # ' + Math.floor(Math.random() * 9999);
    rect.fills = [
      {
        type: 'SOLID',
        color: {
          r: Math.random(),
          g: Math.random(),
          b: Math.random()
        }
      }
    ];
    rect.resize(width, height);
    figma.currentPage.appendChild(rect);
    figma.viewport.scrollAndZoomIntoView([rect]);
    figma.closePlugin();
  }
});

PLUGIN_CHANNEL.registerMessageHandler('exportSelection', async () => {
  const selectedNodes = figma.currentPage.selection;
  if (selectedNodes.length === 0) {
    throw new Error('No selection is present.');
  }

  const selection = selectedNodes[0];
  const bytes = await selection.exportAsync({
    format: 'PNG',
    contentsOnly: false
  });

  return 'data:image/png;base64,' + figma.base64Encode(bytes);
});

PLUGIN_CHANNEL.registerMessageHandler('analyzeCurrentPage', async () => {
  const allNodes = figma.currentPage.findAll();
  const iconCandidates = collectPageCandidates();

  return {
    totalNodes: allNodes.length,
    iconCandidates: iconCandidates.length
  };
});

PLUGIN_CHANNEL.registerMessageHandler('detectIcons', async mode => {
  return detectIcons(mode);
});

PLUGIN_CHANNEL.registerMessageHandler('notify', (message, options) => {
  figma.notify(message, options);
});
