'use strict';

const nameReg = /[^\w\.@-]/g,
      pwdReg = /[^a-fA-F0-9]/g;

const Router = require('koa-router');
let router = new Router();

const crypto = require('crypto');
const saltPwd = "a68P1h903vsaeUdmX";

const Token = require('../data/token.data');

router.use('/', async (ctx, next) => {
    await next();
});

router.
    post('/signin', async (ctx, next) => {
        let data = ctx.request.body;

        let username = data.username;
        let password = crypto.createHmac('sha256', saltPwd).update(data.pwd).digest('hex');


        if (username.length > 64 || username.match(nameReg) != null || password.match(pwdReg) != null) {
            let error = new Error('Invalid Input');
            error.name = 'InvalidInputError';
            throw error;
        }

        if (ctx.credential.username != username || ctx.credential.password != password) {
            let error = new Error('Invalid credential');
            error.name = 'InvalidCredentialError';
            throw error;
        }

        try {
            let token = new Token();
            await token.new({ip: ctx.request.ip, key: ctx.tokenSalt, aud: username});

            // TODO: Update it with redis
            let hash = crypto
                .createHash('md5')
                .update(
                    JSON.stringify({
                        "ip": token.ip,
                        "device": token.device,
                        "content": token.content
                    })
                )
                .digest('hex');
            ctx.tokens[hash] = token.refresh;
            ctx.body.data = {
                "status": "success",
                "token": token.content
            };
        } catch (err) {
            throw err;
        }
    });

module.exports = router;
