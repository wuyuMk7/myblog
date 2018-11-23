'use strict';

/*
 *
 * Data Model Token
 *
 * field auth: usage of this token, for login or other operations
 */

const jwt = require("jsonwebtoken"),
      crypto = require("crypto");

// Refresh time unit: second. Default: 60s.

const secret = "6pa8a01n4pAn&4B322Eqr9",
      refresh_duration = 1000 * 60,
      auth_duration = 1000 * 60 * 60 * 8,
      op_duration = 1000 * 60 * 60,
      tmp_duration = 1000 * 60;

class Token {
    constructor(token) {
        this.ip = "";
        this.device = "";
        this.auth = "auth";

        this.refresh = 0;
        this.createdAt = Date.now();

        this.content = "";
    }

    new({db, key = "", iss = "",
        aud = "", ip = "", device = "",
         auth = "auth", refresh = true} = {})
    {
        this.ip = ip;
        this.device = device;
        this.auth = auth;

        let now = new Date();
        this.createdAt = now.toISOString();

        let payload = {};
        payload.iss = iss == "" ? "observer" : iss;
        payload.sub = auth;
        payload.aud = aud;

        payload.iat = now.getTime();
        payload.nbf = payload.iat;
        payload.ref = 0;

        if (auth == "auth") {
            payload.exp = payload.iat + auth_duration;
            if (refresh) {
                payload.ref = payload.iat + refresh_duration * 60 * 24 * 90;
                this.refresh = payload.ref;
            }
        } else if (auth == "event"){
            payload.exp = payload.iat + op_duration;
        } else {
            payload.exp = payload.iat + tmp_duration;
        }

        return new Promise(async (resolve, reject) => {
            try {
                let _secret = (key == undefined || key == "") ? secret : key;
                let token = await this.generate(payload, _secret, 'HS256');

                // TODO: save token to database
                this.content = token;
                resolve(token);
            } catch(err) {
                reject(err);
                return;
            }
        });
    }

    verify(db, key = "") {
        let _secret = key == "" ? secret : key;

        return new Promise((resolve, reject) => {
            jwt.verify(
                this.content,
                _secret,
                { clockTimestamp: Date.now() },
                (err, decoded) => {
                    if (err)
                        reject(err);
                    else
                        resolve(decoded);
                }
            );
        }).then((decoded) => {
            // TODO: check token in database
            return new Promise((resolve, reject) => {
                resolve(decoded);
            });
        }).catch((err) => {
            console.log(this.decode());
            return Promise.reject(err);
        });
    }

    decode() {
        return jwt.decode(this.content, { clockTimestamp: Date.now() });
    }

    generate(payload, secret, alg) {
        return new Promise((resolve, reject) => {
            let algorithm = (alg == undefined || alg == "") ? 'HS256' : alg;
            jwt.sign(
                payload,
                secret,
                { algorithm: algorithm },
                (err, token) => {
                    if(err)
                        reject(err);
                    else
                        resolve(token);
                }
            );
        });
    }

    static authenticate() {
        let token = new Token();
        token.auth = "auth";
        token.refresh = 0;

        return async function(ctx, next) {
            token.ip = ctx.request.ip;
            token.device = "";
            token.content = ctx.token;

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

            if (ctx.tokens[hash] == undefined) {
                let error = new Error('Token expired.');
                error.name = "TokenExpiredError";
                throw error;
            } else {
                token.refresh = ctx.tokens[hash];
            }

            try {
                let decoded = await token.verify();
                await next();
            } catch (err) {
                delete ctx.tokens[hash];

                if (err.name == "TokenExpiredError") {
                    let info = token.decode();
                    info.exp = Date.now();
                    if (info.exp <= token.refresh) {
                        info.exp += auth_duration;
                        try {
                            let _secret = (ctx.tokenSalt == undefined || ctx.tokenSalt == "") ? secret : ctx.tokenSalt;
                            let newToken = await token.generate(info, _secret, 'HS256');

                            let newHash = crypto
                                .createHash('md5')
                                .update(
                                    JSON.stringify({
                                        "ip": token.ip,
                                        "device": token.device,
                                        "content": newToken
                                    })
                                )
                                .digest('hex');

                            ctx.tokens[newHash] = token.refresh;
                            ctx.set('X-Auth-Token', newToken);

                            await next();
                            return;
                        } catch (err) {
                            throw err;
                        }
                    }
                }

                throw err;
            }
        };
    }
}

module.exports = Token;
