'use strict';

function handler() {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            ctx.app.emit('error', err, ctx);
            ctx.body.status = "error";

            switch(err.name) {
            case 'PostNotFoundError':
                ctx.status = 404;
                ctx.body.data = {
                    "status": "error",
                    "msg": "Post not found."
                };
                break;
            case 'InvalidURLError':
                ctx.status = 404;
                ctx.body.data = {
                    "status": "error",
                    "msg": "Invalid URL."
                };
                break;
            case 'InvalidInputError':
                ctx.body.data = {
                    "status": "error",
                    "msg": "Invalid value."
                };
                break;
            case 'PostValidationError':
                ctx.body.data = {
                    "status": "error",
                    "msg": err.message
                };
                break;
            case 'PostRepeatURLError':
                break;
            default:
                //console.log(err);
                ctx.status = err.status || err.statusCode || 500;
                ctx.body = "500 - Internal Server Error.";
                break;
            }
        }
    };
}

function logger() {
    return (err, ctx) => {
        //console.log(err);
    };
}

module.exports.handler = handler;
module.exports.logger = logger;
