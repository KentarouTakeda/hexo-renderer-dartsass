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
        hexo.config.sass = {style: "compressed"};
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body{width:100%}')
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
        hexo.theme.config.names = ["asa", "barry", "carlo"];
        hexo.config.color = '#FFF';
        hexo.config.colors = ["white", "black", "orange"]
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default-spec-config.scss',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n  background: #000;\n  color: #fff;\n  --asa: asa;\n  --barry: barry;\n  --carlo: carlo;\n  --white: white;\n  --black: black;\n  --orange: orange;\n}')
    });

    it('compile sass with default settings and spec config', async () => {
        const hexo = new Hexo();
        hexo.theme.config.color = '#000';
        hexo.theme.config.names = ["asa", "barry", "carlo"];
        hexo.config.color = '#FFF';
        hexo.config.colors = ["white", "black", "orange"]
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default-spec-config.sass',
            text: '',
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n  background: #000;\n  color: #fff;\n  --asa: asa;\n  --barry: barry;\n  --carlo: carlo;\n  --white: white;\n  --black: black;\n  --orange: orange;\n}')
    });
});
