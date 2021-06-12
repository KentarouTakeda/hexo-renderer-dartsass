import { make } from './renderer';

hexo.extend.renderer.register('scss', 'css', make);
hexo.extend.renderer.register('sass', 'css', make);
