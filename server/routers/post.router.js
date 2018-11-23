'use strict';

const Post = require('../data/post.data'),
      Token = require('../data/token.data');

const Router = require('koa-router');
let router = new Router();

router.use('/', async (ctx, next) => {
    await next();
});

router
    .get('/:url', async (ctx, next) => {
        let post = new Post();

        try {
            let doc = await post.detail(ctx.db, ctx.params.url);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "post": {
                        title: doc.title,
                        author: doc.author,
                        url: doc.url,
                        tag: doc.tag,
                        cate: doc.cate,
                        desc: doc.desc,
                        content: doc.content,
                        createdAt: doc.createdAt,
                        modifiedAt: doc.modifiedAt,
                        likeCount: doc.likeCount,
                        viewCount: doc.viewCount,
                        comments: doc.comments
                    }
                };
            } else {
                let error = new Error('Post Not Found');
                error.name = 'PostNotFoundError';
                throw error;
            }
        } catch(err) {
            throw err;
        }
    })
    .patch('/:url/like', async (ctx, next) => {
        let data = ctx.request.body;
        let post = new Post();

        try {
            let doc = await post.updateLike(ctx.db, ctx.params.url, data.like);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "like": doc.likeCount
                };
            } else {
                let error = new Error('Post Not Found');
                error.name = 'PostNotFoundError';
                throw error;
            }
        } catch (err) {
            throw err;
        }
    })
    .use(Token.authenticate())
    .post('/', async (ctx, next) => {
        let data = ctx.request.body;

        let post = new Post();
        post.title = data.title;
        post.author = data.author;
        post.tag = data.tag.split(",");
        post.content = data.content;

        try {
            let doc = await post.create(ctx.db);
            if (doc != undefined && doc != null && doc.ops != null) {
                doc = doc.ops[0];
                if (doc != undefined && doc.title == post.title) {
                    ctx.body.data = {
                        "status": "success",
                        "url": doc.url
                    };
                }
            }
        } catch (err) {
            throw err;
        }
    })
    .put('/:url', async (ctx, next) => {
        let data = ctx.request.body;

        let post = new Post();
        post.title = data.title;
        post.author = data.author;
        post.tag = data.tag.split(",");
        post.content = data.content;

        try {
            // TODO: Validation
            let doc = await post.update(ctx.db, ctx.params.url);
            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "post": {
                        title: doc.title,
                        author: doc.author,
                        url: doc.url,
                        tag: doc.tag,
                        cate: doc.cate,
                        desc: doc.desc,
                        content: doc.content,
                        createdAt: doc.createdAt,
                        modifiedAt: doc.modifiedAt,
                        likeCount: doc.likeCount,
                        viewCount: doc.viewCount,
                        comments: doc.comments
                    }
                };
            } else {
                let error = new Error('Post Not Found');
                error.name = 'PostNotFoundError';
                throw error;
            }
        } catch (err) {
            throw err;
        }
    })
    .del('/:url', async (ctx, next) => {
        let post = new Post();

        try {
            let doc = await post.delete(ctx.db, ctx.params.url);

            if (doc != null) {
                ctx.body.data = {
                    "status": "success",
                    "post": {
                        title: doc.title,
                        url: doc.url
                    }
                };
            } else {
                let error = new Error('Post Not Found');
                error.name = 'PostNotFoundError';
                throw error;
            }
        } catch (err) {
            throw err;
        }
    });

module.exports = router;
