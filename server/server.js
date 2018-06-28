const Koa = require('koa');
const app = new Koa();

const serve = require('koa-static');

const staticFiles = __dirname + '/../public/dist';
const opts = {};

if (app.env != 'production') {
    const koaWebpack = require('koa-webpack');
    const historyFallback = require('koa2-history-api-fallback');
    const webpackConfig = require('../client/config/webpack.dev');
    
    koaWebpack({ config: webpackConfig, devMiddleware: { publicPath: '/' }, hotClient: { hmr: false, reload: true } })
        .then((middleware) => {
            app.use(historyFallback());
            app.use(middleware);
        });
}

//app.use(require('koa-static')(staticFiles, opts));
app.listen(4000);

console.log('Listening port 4000.');
