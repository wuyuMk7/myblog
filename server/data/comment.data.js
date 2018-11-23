'use strict';

/*
 *
 * Data Model Comment
 *
 */

const ObjectID = require('mongodb').ObjectID;

function checkUrl(url) {
    if (url.length != 16 || url.replace(/[a-zA-Z1-9]/g, '').length != 0) {
        let error = new Error('Invalid URL');
        error.name = "InvalidURLError";
        throw error;
    }
}

function checkObjectId(object) {
    if (object != undefined && object != 0 && (object.length != 24 || object.replace(/[0-9a-f]/g, '').length != 0)) {
        let error = new Error('Invalid ID');
        error.name = "InvalidIDError";
        throw error;
    }
}

class Comment {
    constructor() {
        this.objectId = "";
        this.author = "";
        this.email = "";
        this.content = "";

        this.createdAt = Date.now();

        this.visible = true;

        this.comments = [];

        this.ip = "";
    }

    list(db, url) {
        return new Promise(async (resolve, reject) => {
            try {
                checkUrl(url);
            } catch (err) {
                reject(err);
                return;
            }

            db.collection('posts').findOne(
                { url: url },
                { projection: { 'desc': 0, 'content': 0, 'comments.ip': 0, 'comments.comments.ip': 0 }}
            ).then((doc) => { resolve(doc); }).catch(reject);
        });
    }

    create(db, url, parent) {
        // TODO: Check comments created from same IP in a short period.
        let now = new Date();

        this.createdAt = now.toISOString();

        return new Promise(async (resolve, reject) => {
            try {
                checkUrl(url);

                if (parent != undefined)
                    checkObjectId(parent);

                await this.validate();
            } catch(err) {
                reject(err);
                return;
            }

            let insert = {
                '_id': new ObjectID(),
                'author': this.author,
                'email': this.email,
                'content': this.content,
                'createdAt': this.createdAt,
                'visible': this.visible,
                'ip': this.ip,
                'comments': this.comments
            };

            if (parent == undefined || parent == 0) {
                db.collection('posts').findOneAndUpdate(
                    { url: url },
                    { $push: { 'comments': insert } },
                    {
                        returnOriginal: false,
                        projection: { 'desc': 0, 'content': 0, 'comments.ip': 0, 'comments.comments.ip': 0 }
                    }
                ).then((doc) => {
                    //resolve(doc.value);
                    if (doc.value != null)
                        resolve({ url: url, parent: parent, id: insert._id });
                    else
                        resolve(null);
                }).catch(reject);
            } else {
                db.collection('posts').findOneAndUpdate(
                    { $and: [ { url: url }, { 'comments._id': ObjectID(parent) } ]},
                    { $push: { 'comments.$.comments': insert } },
                    {
                        returnOriginal: false,
                        projection: { 'desc': 0, 'content': 0, 'comments.ip': 0, 'comments.comments.ip': 0 }
                    }
                ).then((doc) => {
                    //resolve(doc.value);
                    if (doc.value != null)
                        resolve({ url: url, parent: parent, id: insert._id });
                    else
                        resolve(null);
                }).catch(reject);
            }
        });
    }

    detail(db, url, id) {
        return new Promise((resolve, reject) => {
            try {
                checkUrl(url);
                checkObjectId(id);
            } catch(err) {
                reject(err);
                return;
            }

            // TODO: Incomplete Implementation.
            db.collection('posts').find(
                { $and: [ { url: url }, { 'comments._id': ObjectID(id) } ]}
            ).toArray().then((doc) => { resolve(doc.value); }).catch(reject);
        });
    }

    visibility(db, url, id, visibility) {
        return new Promise((resolve, reject) => {
            try {
                checkUrl(url);
                checkObjectId(id);

                if (visibility != true && visibility != false) {
                    let error = new Error('Invalid Visibility Input');
                    error.name = "InvalidInputError";
                    throw error;
                }
            } catch(err) {
                reject(err);
                return;
            }

            db.collection('posts').findOneAndUpdate(
                { $and: [ { url: url }, { 'comments._id': ObjectID(id) } ]},
                { $set:
                  {
                      'comments.$.visible': false,
                      'comments.$.content': 'Comment has been removed.'
                  }
                }
            ).then(async (doc) => {
                if (doc.value != null) {
                    resolve({ "url": url, "parent": 0, "id": id });
                } else {
                    try {
                        let anotherDoc = await db.collection('posts').findOneAndUpdate(
                            { $and: [ { url: url }, { 'comments.comments._id': ObjectID(id) } ] },
                            { $set:
                              {
                                  'comments.$.comments.$[cc].visible': false,
                                  'comments.$.comments.$[cc].content': 'Comment has been removed'
                              }
                            },
                            {
                                projection: { 'comments.$': 1 },
                                arrayFilters: [ 
                                    { "cc._id": ObjectID(id) }
                                ]
                            }
                        );

                        if (anotherDoc.value != null) 
                            resolve({ "url": url, "parent": anotherDoc.value.comments[0]._id, "id": id });
                        else 
                            resolve(null);
                    } catch(err){
                        throw err;
                    }
                }
            }).catch(reject);
        });
    }

    delete(db, url, id) {
        return new Promise((resolve, reject) => {
            try {
                checkUrl(url);
                checkObjectId(id);
            } catch(err) {
                reject(err);
                return;
            }

            db.collection('posts').findOneAndUpdate(
                { $and: [{ url: url }, { 'comments._id': ObjectID(id) }]},
                { $pull: { 'comments': { '_id': ObjectID(id) } } }
            ).then((doc) => {
                if (doc.value == null) {
                    db.collection('posts').findOneAndUpdate(
                        { $and: [{ url: url }, { 'comments.comments._id': ObjectID(id) }]},
                        { $pull: { 'comments.$.comments': { '_id': ObjectID(id) }} },
                        { projection: { 'comments.$': 1 } }
                    ).then((doc) => {
                        if(doc.value != null) {
                            resolve({ url: url, parent: doc.value.comments[0]._id, id: id });
                        } else {
                            resolve(null);
                        }
                    }).catch(reject);
                } else {
                    resolve({ url: url, parent: 0, id: id });
                }
            }).catch(reject);
        });
    }

    validate(db) {
        let error = new Error();
        error.name = "CommentValidationError";

        let msgs = [];
        if (this.content == undefined || this.content == "")
            msgs.push("Please enter the comment content.");

        return new Promise((resolve, reject) => {
            if (msgs.length > 0) {
                error.message = msgs.join("\n");
                reject(error);
                return;
            }

            resolve(true);
        });
    }
}

module.exports = Comment;
