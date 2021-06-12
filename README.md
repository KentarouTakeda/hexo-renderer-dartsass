[Sass] renderer plugin for [Hexo] using [Dart Sass]
==

[![npm version](https://badge.fury.io/js/hexo-renderer-dartsass.svg)](https://badge.fury.io/js/hexo-renderer-dartsass)

## Install
```sh
$ npm install --save hexo-renderer-dartsass
```

## Config
Anything specified under the key `sass` in your `_config.yml` files will be passed directly to the `sass.render()` call. Check out the [Dart Sass API docs](https://github.com/sass/dart-sass#javascript-api) for all available settings.

### _config.yml
```yaml
sass:
  outputStyle: expanded # "expanded" or "compressed"
```

### Inheritance
The config object passed to dart sass is constructed by merging properties from
the following locations using a least-specific-first order:

1. Theme specific `_config.yml`
2. Blog root `_config.yml`
3. Since `file` is the path to be rendered, config is ignored. The same applies to data.

## Thanks
This plugin was created with reference to [knksmith57/hexo-renderer-sass]. Thank you for publishing the nice software.

[Hexo]: http://hexo.io
[Sass]: http://sass-lang.com/
[Dart Sass]: https://sass-lang.com/dart-sass
[node-sass]: https://github.com/andrew/node-sass
[Dart Sass API docs]: https://github.com/sass/dart-sass#javascript-api
[knksmith57/hexo-renderer-sass]: https://github.com/knksmith57/hexo-renderer-sass