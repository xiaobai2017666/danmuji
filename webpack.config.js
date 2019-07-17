const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        add: './src/add.js'
    },
    output: {
        filename: '[name].bundle.js', //编译后的文件
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|ico|gif|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'asserts/'
                    }
                }
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    externals: [
        (function() {
            var IGNORES = [
                'electron'
            ];
            return function(context,request,callback) {
                if(IGNORES.indexOf(request) >= 0) {
                    return callback(null,"require('"+request+"')");
                }
                return callback();
            }
        })()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), //编译好的文件放在这里
        compress: true,
        port: 9999 //本地开发服务器端口
    }
}