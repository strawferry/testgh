const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const path = require('path');
const config = require('./config');

const publicPath = '/';
const publicUrl = '';

module.exports = {
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        config.entryJS
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        pathinfo: true,
        filename: 'static/js/bundle.js',
        publicPath: publicPath
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader',
                    options: { fix: true }
                },{
                    loader: 'source-map-loader',
                }],
                include: path.resolve(__dirname, './src/**/*.js'),
                exclude: /node_modules/
            },
            {
                test: /\.js[x]?$/,
                // exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader:'babel-loader',
                        options: { presets: ['es2015', 'stage-0', 'react'] },
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader', options: {
                        limit: 1000,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                    },
                    'img-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),

        new webpack.HotModuleReplacementPlugin(),

        // // new ExtractTextPlugin('style.css'),     // 指定css文件名 打包成一个css
        // // 分开打包多个css
        // new ExtractTextPlugin({
        //     filename: '[name].[contenthash:8].bundle.css',
        //     allChunks: true,
        // }),

        // css压缩
        // new OptimizeCssAssetsPlugin({}),

        // new CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.[hash:6].js'
        // }),

        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'src/public/index.html'
        }),

        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(path.resolve(__dirname, 'node_modules'))
    ]

};