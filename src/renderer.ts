import Hexo = require('hexo');
import sass = require('sass');

export const make = function(this: Hexo, data: Hexo.extend.RendererData, options: {[key:string]:any}){

    const config = Object.assign(
        this.theme.config.sass || {},
        this.config.sass || {},
        {file: data.path}
    );

    return new Promise<string>((resolve, reject)=>{
        sass.render(config, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result.css.toString());
        });
    });
}
