import sass = require('sass');

hexo.extend.renderer.register('scss', 'css', function(data, options){
    return new Promise((resolve, reject)=>{
        sass.render({data: data.text}, (err, result) => {
            if(err) {
                reject(err);
            }
            resolve(result.css.toString());
        });
    });
});
