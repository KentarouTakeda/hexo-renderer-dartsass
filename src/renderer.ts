import Hexo = require('hexo');
import sass = require('sass');
import type { StoreFunctionData } from 'hexo/dist/extend/renderer';

function getProperty(obj: any, name: string) {
    name = name.replace(/\[(\w+)]/g, '.$1').replace(/^\./, '');

    const split = name.split('.');
    let key = split.shift();

    if (!key || !Object.prototype.hasOwnProperty.call(obj, key)) return '';
    let result = obj[key];
    const len = split.length;

    if (!len) return result || '';
    if (typeof result !== 'object') return '';

    for (let i = 0; i < len; i++) {
        key = split[i];
        if (!Object.prototype.hasOwnProperty.call(result, key)) return '';

        result = result[split[i]];
        if (typeof result !== 'object') return result;
    }

    return result;
}

export const make = async function (this: Hexo, data: StoreFunctionData, options: object) {
    if(data.path == null) {
        return '';
    }

    const self = this;
    const themeCfg = self.theme.config || {};

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

                    if (Array.isArray(val)) {
                        const vals = val.map(x => new sass.SassString(x));
                        return new sass.SassList(vals);
                    }

                    return new sass.SassString(val, {quotes:false});
                },
                'hexo-config($ckey)': function ([arg]: sass.Value[]) {
                    if(!(arg instanceof sass.SassString)) {
                        return sass.sassNull;
                    }

                    const val = getProperty(self.config, arg.text);

                    if (Array.isArray(val)) {
                        const vals = val.map(x => new sass.SassString(x));
                        return new sass.SassList(vals);
                    }

                    return new sass.SassString(val, {quotes:false});
                },
            },
        },
    );

    return sass.compileAsync(data.path, config).then(result => result.css)
}
