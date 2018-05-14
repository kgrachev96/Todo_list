const path = require('path');
const argv = require('yargs').argv;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/build');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: isDevelopment
});
const htmlWebpack = new HtmlWebpackPlugin({
    template: './src/index.html',
});

const config = {
    entry: {
        main: "./src/app.tsx"
    },

    output: {
        filename: "app.js",
        path: distPath
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.web.json'
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction
                            }
                        },
                        'resolve-url-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: isProduction
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        extractSass,
        htmlWebpack,
    ],
    optimization: isProduction ? {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false,
                        warnings: false,
                        drop_console: true,
                        unsafe: true
                    },
                },
            }),
        ],
    } : {},
    devServer: {
        contentBase: distPath,
        port: 8080,
        compress: true,
        open: true
    },
    devtool: 'inline-source-map'
};

module.exports = config;