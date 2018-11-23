'use strict';

const Koa = require('koa');
const app = new Koa();

const serve = require('koa-static'),
      bodyParser = require('koa-bodyparser'),
      mongo = require('koa-mongo'),
      crypto = require('crypto');

const config = require('./config'),
      info = require('./site');

let tokenSalt = Math.random().toString(36);
tokenSalt = crypto.createHash('md5').update(tokenSalt + Date.now()).digest('hex');
let tokensHashTable = {};

const routers = require('./routers/index.router');
const errors = require('./libs/error.lib');

const staticFiles = __dirname + '/../public/dist';
const opts = {};

app.proxy = true;
app.use(errors.handler());

if (app.env != 'production' && app.env != 'backend_dev') {
    const koaWebpack = require('koa-webpack');
    const historyFallback = require('koa2-history-api-fallback');
    const webpackConfig = require('../client/config/webpack.dev');

    koaWebpack(
        {
            config: webpackConfig,
            devMiddleware: { publicPath: '/' }, hotClient: { hmr: false, reload: true }
        })
        .then((middleware) => {
            app.use(historyFallback());
            app.use(middleware);
        });
}

const database = ((config) => {
    let env = (app.env == 'frontend_dev' || app.env == 'backend_dev') ? 'development' : app.env;
    let c = config.database[env];
    let db = c.db || 'test_blog',
        port = c.port || '27017',
        host = c.host.join(`:${port},`) || 'localhost',
        user = c.user || '',
        pwd = c.pwd || '',
        extra = c.extra || '';

    return {
        "db": db, "port": port, "host": host,
        "user": user, "pwd": pwd, "extra": extra
    };
})(config);
const databaseUrl = ((db) => {
    let userString = '';
    if (db.user != '' && db.pwd != '')
        userString = `${db.user}:${db.pwd}@`;

    let url = `mongodb://${userString}${db.host}:${db.port}/${db.db}`;
    if (db.extra != '')
        url += `?${db.extra}`;

    return url;
})(database);

app.use(mongo({
    uri: databaseUrl,
    max: 100,
    min: 1
}));
app.use(async (ctx, next) => {
    ctx.db = ctx.mongo.db(database.db);
    await next();
});

app.use(async (ctx, next) => {
    ctx.info = {};
    ctx.info.site = info.site;
    ctx.credential = info.admin;
    ctx.tokenSalt = tokenSalt;
    ctx.tokenSalt = "";

    ctx.tokens = tokensHashTable;

    let token = ctx.request.headers['authorization'];
    if (token != undefined && token.search('Bearer ') === 0)
        ctx.token = token.substr(7);

    await next();
});

app.use(bodyParser());
app.use(routers.routes());

//app.use(require('koa-static')(staticFiles, opts));

app.on('error', errors.logger());
app.listen(4000);

console.log('Listening port 4000.');
