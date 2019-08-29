'use strict';

const APIPATH = '/api';

const fs = require('fs');
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { 'encoding': 'utf-8' }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  });
}

const Router = require('koa-router');
let router = new Router();
let apiRouter = new Router();

let siteRouter = require('./site.router');
let postRouter = require('./post.router');
let commentRouter = require('./comment.router');

apiRouter.prefix(APIPATH);
apiRouter.use('/', async (ctx, next) => {
    ctx.body = {
        "status": "success",
        "url": ctx.url,
        "timestamp": Date.now(),
        "data": {}
    };

    await next();
});

apiRouter.use('/s', siteRouter.routes());
apiRouter.use('/post', postRouter.routes());
apiRouter.use('/post', commentRouter.routes());

module.exports = (usingStaticFiles, staticFiles) => {
  router.use(apiRouter.routes());

  router.all(`*`, async (ctx, next) => {
    if (usingStaticFiles) {
      try {
        ctx.body = await readFile(`${staticFiles}/index.html`);
      } catch(err) {
	throw err;
      }
    } else {
      ctx.throw(404, 'PageNotFound');
    }
  });

  return router;
};
