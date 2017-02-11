const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
var path = require('path');

module.exports = {
    entry: './src/mebot.jsx',
    output: {
        path: path.resolve(__dirname),
        filename: 'mebot.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]    
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    devtool: "source-map"
};
