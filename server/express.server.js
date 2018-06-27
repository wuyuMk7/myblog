const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('../client/config/webpack.dev');
const compiler = webpack(config);

const express = require('express');
const app = express();

app.use(middleware(compiler, {}));

app.listen(4000, () => console.log('Running'));

