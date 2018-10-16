'use strict';

const Router = require('koa-router');
let router = new Router();

let postRouter = require('./post.router');

router.use('/', async (ctx, next) => {
    ctx.body = {
        "status": "success",
        "url": ctx.url,
        "timestamp": Date.now(),
        "data": {}
    };

    await next();
});

router.use('/post', postRouter.routes());

module.exports = router;
