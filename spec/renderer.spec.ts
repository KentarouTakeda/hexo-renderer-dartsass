import Hexo = require('hexo');
import { make } from '../src/renderer';

describe('Function `make`', ()=>{
    it('compile scss with default settings', async () => {
        const hexo = new Hexo();
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: ''
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n}')
    });

    it('compile scss with custom config', async () => {
        const hexo = new Hexo();
        hexo.config.sass = { indentWidth: 4 };
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: ''
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n    width: 100%;\n}')
    });

    it('compile scss with custom theme config', async () => {
        const hexo = new Hexo();
        hexo.config.sass = { indentWidth: 1 };
        hexo.theme.config.sass = { indentWidth: 4 };
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: ''
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n width: 100%;\n}')
    });
});