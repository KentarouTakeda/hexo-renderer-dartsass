const sass = require('sass');

hexo.extend.renderer.register('scss', 'css', function(data, options, callback){
    sass.render({data: data.text}, (err, result) => {
        callback(err, result.css.toString());
    });
});
