import Hexo from 'hexo';
import sass = require('sass');

export const make = async function (this: Hexo, data: Hexo.extend.RendererData, options: {
    [key: string]: any
}) {
    if(data.path == null) {
        return '';
    }

    const self = this;
    const themeCfg = self.theme.config || {};

    function getProperty(obj: any, name: string) {
        name = name.replace(/\[(\w+)]/g, '.$1').replace(/^\./, '');

        const split = name.split('.');
        let key = split.shift();

        if (!obj.hasOwnProperty(key)) return '';
        if (!key) {
            return '';
        }
        let result = obj[key];
        const len = split.length;

        if (!len) return result || '';
        if (typeof result !== 'object') return '';

        for (let i = 0; i < len; i++) {
            key = split[i];
            if (!result.hasOwnProperty(key)) return '';

            result = result[split[i]];
            if (typeof result !== 'object') return result;
        }

        return result;
    }

    const config: sass.Options<'async'> = Object.assign(
        this.theme.config.sass || {},
        this.config.sass || {},
        {
            functions: {
                'hexo-theme-config($ckey)': function ([arg]: sass.Value[]) {
                    if(!(arg instanceof sass.SassString)) {
                        return sass.sassNull;
                    }

                    const val = getProperty(themeCfg, arg.text);

                    return new sass.SassString(val, {quotes:false});
                },
                'hexo-config($ckey)': function ([arg]: sass.Value[]) {
                    if(!(arg instanceof sass.SassString)) {
                        return sass.sassNull;
                    }

                    const val = getProperty(self.config, arg.text);

                    return new sass.SassString(val, {quotes:false});
                },
            },
        },
    );

    return sass.compileAsync(data.path, config).then(result => result.css)
}
