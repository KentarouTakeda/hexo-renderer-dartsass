import Hexo from 'hexo';
import { make } from '../src/renderer';

describe('Function `make`', () => {
    it('compile scss with default settings', async () => {
        const hexo = new Hexo();
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n}')
    });

    it('compile scss with custom config', async () => {
        const hexo = new Hexo();
        hexo.config.sass = {indentWidth: 4};
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n    width: 100%;\n}')
    });

    it('compile scss with custom theme config', async () => {
        const hexo = new Hexo();
        hexo.config.sass = {indentWidth: 1};
        hexo.theme.config.sass = {indentWidth: 4};
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n width: 100%;\n}')
    });

    it('throw error with invalid scss syntax', async () => {
        const hexo = new Hexo();
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/error.scss',
            text: '',
        };

        const fnuc = make.call(hexo, data, {});
        await expectAsync(fnuc).toBeRejectedWithError();
    });

    it('compile sass with default settings', async () => {
        const hexo = new Hexo();
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.sass',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n}')
    });

    it('compile scss with default settings and spec config', async () => {
        const hexo = new Hexo();
        hexo.theme.config.color = '#000';
        hexo.theme.config.node_sass = {debug: true};
        hexo.config.color = '#FFF';
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default-spec-config.scss',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n  background: #000;\n  color: #fff;\n}')
    });

    it('compile sass with default settings and spec config', async () => {
        const hexo = new Hexo();
        hexo.theme.config.color = '#000';
        hexo.theme.config.node_sass = {debug: true};
        hexo.config.color = '#FFF';
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default-spec-config.sass',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n  background: #000;\n  color: #fff;\n}')
    });
});
