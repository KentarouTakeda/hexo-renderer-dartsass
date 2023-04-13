import Hexo = require('hexo');
import sass = require('sass');
import { LegacyOptions } from 'sass/types/legacy/options';

export const make = function (this: Hexo, data: Hexo.extend.RendererData, options: {
    [key: string]: any
}) {

    const self = this;
    const themeCfg = self.theme.config || {};

    // support global and theme-specific config
    const userConfig = Object.assign(
        themeCfg.node_sass || {},
        self.config.node_sass || {},
    );

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

    const config: LegacyOptions<'async'> = Object.assign(
        this.theme.config.sass || {},
        this.config.sass || {},
        {file: data.path},
        {
            functions: {
                'hexo-theme-config($ckey)': function (ckey: any) {
                    const val = getProperty(themeCfg, ckey.getValue()),
                        sassVal = new sass.types.String(val);
                    if (userConfig.debug) {
                        console.log('hexo-theme-config.' + ckey.getValue(), val);
                    }
                    return sassVal;
                },
                'hexo-config($ckey)': function (ckey: any) {
                    const val = getProperty(self.config, ckey.getValue()),
                        sassVal = new sass.types.String(val);
                    if (userConfig.debug) {
                        console.log('hexo-config.' + ckey.getValue(), val);
                    }
                    return sassVal;
                },
            },
        },
    );

    return new Promise<string>((resolve, reject) => {
        sass.render(config, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result) {
                resolve(result.css.toString());
            }
        });
    });
}
