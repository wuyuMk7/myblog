'use strict';

const Comment = require('../data/comment.data'),
      Token = require('../data/token.data');

const Router = require('koa-router');
let router = new Router();

router.use('/', async (ctx, next) => {
    await next();
});

router
    .get('/:url/comments', async (ctx, next) => {
        let comment = new Comment();
        let comments = [];

        try {
            let doc = await comment.list(ctx.db, ctx.params.url);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "comments": doc.comments
                };
            } else {
                let error = new Error('Post Not Found Error');
                error.name = 'PostNotFoundError';
                throw error;
            }
        } catch(err) {
            throw err;
        }
    })
    .get('/:url/comment/:id', async (ctx, next) => {})
    .post('/:url/comment', async (ctx, next) => {
        let data = ctx.request.body;

        let comment = new Comment();
        comment.author = data.author || "Anonymous";
        comment.email = data.email || "";
        comment.content = data.content;

        // TODO: Set IP
        comment.ip = "127.0.0.1";

        try {
            let doc = await comment.create(ctx.db, ctx.params.url, data.parent);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "comment": {
                        "url": doc.url,
                        "parent": doc.parent,
                        "id": doc.id
                    }
                };
            } else {
                let error = new Error();
                error.name = 'PostOrCommentNotFoundError';
                throw error;
            }
        } catch(err) {
            throw err;
        }
    })
    .use(Token.authenticate())
    .patch('/:url/comment/:id/hide', async (ctx, next) => {
        let data = ctx.request.body;
        let comment = new Comment();

        try {
            let doc = await comment.visibility(ctx.db, ctx.params.url, ctx.params.id, data.visibility);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "comment": {
                        "url": doc.url,
                        "parent": doc.parent,
                        "id": doc.id
                    }
                };
            } else {
                let error = new Error();
                error.name = 'PostOrCommentNotFoundError';
                throw error;
            }
        } catch(err) {
            throw err;
        }
    })
    .del('/:url/comment/:id', async (ctx, next) => {
        let comment = new Comment();

        try {
            let doc = await comment.delete(ctx.db, ctx.params.url, ctx.params.id);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "comment": {
                        "url": doc.url,
                        "parent": doc.parent,
                        "id": doc.id
                    }
                };
            } else {
                let error = new Error();
                error.name = 'PostOrCommentNotFoundError';
                throw error;
            }
        } catch (err) {
            throw err;
        }
    });

module.exports = router;
