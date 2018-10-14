'use strict';

/*
 * 
 * Data Model Post
 *
 */

const descLength = 300;

const urlTable = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6',
    '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function generateUrl(title) {
    let crypto = require('crypto');
    let url = crypto.createHash('md5').update(title + "5a680ak4I_f@" + Date.now()).digest('hex');
    let ret = "";

    for (let i = 0;i < (url.length / 2); ++i) {
        ret += urlTable[parseInt(url.substr(2 * i, 2), 16) % 62];
    }

    return ret;
}

function generateDesc(content) {
    if (content.length <= 300)
        return content;

    return content;
}

class Post {
    constructor() {
        this.objectId = "";
        this.author = "";
        this.title = "";
        this.url = "";
        this.tag = [];
        this.cate = "";
        this.desc = "";
        this.content = "";

        this.createdAt = Date.now();
        this.modifiedAt = Date.now();

        this.likeCount = 0;
        this.viewCount = 0;

        this.comments = [];
    }

    all() {}
    list() {}

    create(db) {
        let now = new Date();

        this.createdAt = now.toISOString();
        this.modifiedAt = now.toISOString();

        this.url = generateUrl(this.title);
        this.desc = generateDesc(this.content);

        return db.collection('posts').insertOne(
            {
                title: this.title,
                author: this.author,
                url: this.url,
                tag: this.tag,
                cate: now.getFullYear().toString() + now.getMonth().toString().padStart(2, '0'),
                desc: this.desc,
                content: this.content,
                createdAt: this.createdAt,
                modifiedAt: this.modifiedAt,
                likeCount: this.likeCount,
                viewCount: this.viewCount,
                comments: this.comments
            }
        );
    }

    delete(url) {}

    update(url, content) {
        let now = new Date();

        this.modifiedAt = now.toISOString();
    }

    detail(db, url) {
        return new Promise((resolve, reject) => {
            if (url.length != 16 && url.replace(/[a-zA-Z1-9]/, '').length != 0) {
                let error = new Error('Invalid URL');
                error.name = "InvalidURLError";
                reject(error);
            }

            db.collection('posts').findOneAndUpdate(
                { url: url },
                { $inc: { quantity: 1, 'viewCount': 1 }}
            ).then((doc) => { resolve(doc.value); }).catch(reject);
        });
    }

    validate() {

    }
}

module.exports = Post;
