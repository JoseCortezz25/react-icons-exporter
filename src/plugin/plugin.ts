import { PLUGIN, UI } from '@common/networkSides';
import { PLUGIN_CHANNEL } from '@plugin/plugin.network';
import { Networker } from 'monorepo-networker';

async function bootstrap() {
  Networker.initialize(PLUGIN, PLUGIN_CHANNEL);

  if (figma.editorType === 'figma') {
    figma.showUI(__html__, {
      width: 450,
      height: 650,
      title: 'Icons to React'
    });
  }

  PLUGIN_CHANNEL.emit(UI, 'hello', ['Hey there, UI!']);
}

bootstrap();
