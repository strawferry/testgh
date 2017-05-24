const pxtorem = require('postcss-pxtorem');

module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer'),
        pxtorem({rootValue: 100, propWhiteList: [],})
    ]
};
