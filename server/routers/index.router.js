'use strict';

const Router = require('koa-router');
let router = new Router();

let siteRouter = require('./site.router');
let postRouter = require('./post.router');
let commentRouter = require('./comment.router');

router.use('/', async (ctx, next) => {
    ctx.body = {
        "status": "success",
        "url": ctx.url,
        "timestamp": Date.now(),
        "data": {}
    };

    await next();
});

router.use('/s', siteRouter.routes());
router.use('/post', postRouter.routes());
router.use('/post', commentRouter.routes());

router.use('/api', router.routes());

module.exports = router;
