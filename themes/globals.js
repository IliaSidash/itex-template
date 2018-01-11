/**
 * Created by nihilis on 3/4/17.
 */

module.exports = (function () {
    var g = require('./globals.json');

    var twigConfig = {
        base: g.vars.base,
        data: {
            isGulp: true,
            'this': {
                pageH1: g.vars.siteName,
                getPageH1: function () {
                    return this.pageH1;
                }
            },
            cms: {
                block: function (name, defaultValue) {
                    return g.blocks[name] || defaultValue || '';
                },
                settings: function (name1, name2, defaultValue) {
                    return g.settings[name1][name2] || defaultValue || '';
                }
            }
        },
        functions: [
            {
                name: 'registerThemeScript',
                func: function (src) {
                    return '<script src="{url}public/{src}"></script>'
                        .replace(/\{src}/g, src)
                        .replace(/\{url}/g, g.vars.baseUrl);
                }
            }, {
                name: 'registerThemeCss',
                func: function (src) {
                    return '<link rel="stylesheet" href="{url}public/{src}">'
                        .replace(/\{src}/g, src)
                        .replace(/\{url}/g, g.vars.baseUrl);
                }
            },
            {
                name: 'gen',
                func: function (item, iterationsCount, startValue) {
                    var total = [];
                    var start = startValue || 1;
                    for (var i = start; i < iterationsCount + start; i++) {
                        var totalItem = JSON.parse(JSON.stringify(item));
                        for (var key in totalItem) {
                            if (typeof totalItem[key] == 'string') {
                                totalItem[key] = totalItem[key].replace(/\{n}/g, '' + i);
                            }
                        }
                        total.push(totalItem);
                    }

                    return total;
                }
            }
        ],
        filters: [
            {
                name: 'url',
                func: function (url) {
                    var baseUrl = g.vars.baseUrl.replace(/\/$/g, '');
                    var currentUrl = url.replace(/^\//g, '');
                    return baseUrl + '/' + currentUrl;
                }
            },
            {
                name: 'getimg',
                func: function (url) {
                    return url;
                }
            }
        ]
    };

    return {
        twigConfig: twigConfig
    }
})();
