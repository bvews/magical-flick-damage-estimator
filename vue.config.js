const path = require('path');
require('dotenv').config();

const publicPath = process.env.PUBLIC_PATH || '/';
const outputDir = process.env.OUTPUT_DIR || 'dist';

module.exports = {
    publicPath,
    outputDir,
    filenameHashing: false,
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    configureWebpack: {
        devtool: 'source-map',
        // devServer: {
        //     contentBase: path.join(__dirname, 'dist')
        // },
    }
};