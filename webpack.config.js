const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
    entry: [
        path.join(__dirname, 'src/app.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
            test: /\.js/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.s?[ac]ss$/,
            include: path.join(__dirname, 'src'),
            sideEffects: true,
            use: [
                'style-loader',
                'css-loader',
                // 'postcss-loader',
                'sass-loader',
            ]
        }
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'MyApp',
            template: path.join(__dirname, 'src/index.html')
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    mode:"development",
    devServer: {
            contentBase: './dist',
            inline:true,
            port: 3000 //my prefered port for development, but change as you see fit
    }
};