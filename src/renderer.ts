import Hexo = require('hexo');
import sass = require('sass');

export const make = function(data: Hexo.extend.RendererData, options: Object){
    return new Promise<string>((resolve, reject)=>{
        sass.render({data: data.text}, (err, result) => {
            if(err) {
                reject(err);
            }
            resolve(result.css.toString());
        });
    });
}
