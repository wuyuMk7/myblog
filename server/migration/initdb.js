'use strict';

const mongodb = require('mongodb');

const config = require('../config');

let env = process.env.NODE_ENV;
if (env == undefined || env == "")
    env = "development";

const database = ((config) => {
    let c = config.database[env];
    let db = c.db || 'test_blog',
        port = c.port || '27017',
        host = c.host.join(`:${port},`) || 'localhost',
        user = c.user || '',
        pwd = c.pwd || '',
        extra = c.extra || '';

    return {
        "db": db, "port": port, "host": host,
        "user": user, "pwd": pwd, "extra": extra
    };
})(config);

const dbConnection = ((db) => {
    let userString = '';
    if (db.user != '' && db.pwd != '')
        userString = `${db.user}:${db.pwd}@`;
    
    let connection = `mongodb://${userString}${db.host}:${db.port}/${db.db}`;
    if (db.extra != '')
        connection += `?${db.extra}`;

    return mongodb.connect(connection, { useNewUrlParser: true });
})(database);

dbConnection
    .then((connection) => {
        return connection.db(database.db);
    })
    .then((db) => {
        return new Promise((resolve, reject) => {
            Promise.all([
                db.collection('posts').createIndex({ 'url': 1 }, { unique: true })
            ]).then(() => resolve(db)).catch(reject);
        });
    })
    .then((db) => {
        let Post = require('../data/post.data');
        let post = new Post();
        post.author = "Site";
        post.title = "Welcome";
        post.tag = ["First"];
        post.content = "Welcome to my blog";

        return new Promise((resolve, reject) => {
            post.create(db).then(() => { resolve(db); }).catch(reject);
        });
    })
    .then(() => {
        console.log("Database initialization completed.");
    })
    .catch((err) => {
        console.log(err);
    });
