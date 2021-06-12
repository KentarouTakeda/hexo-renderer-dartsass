import Hexo = require('hexo');
import { make } from '../src/renderer';

describe('Function `make`', ()=>{
    it('compile scss', async () => {
        const hexo = new Hexo();
        const data: Hexo.extend.RendererData = {
            path: __dirname + '/files/default.scss',
            text: ''
        };
        const result = await make.call(hexo, data, {});
        expect(result).toBe('html body {\n  width: 100%;\n}')
    });
});