const path = require('path');

module.exports = {
    entry: [
        // "webpack-dev-server/client?http://localhost:8080/",
        "./src/app.tsx"
    ],

    output: {
        filename: "app.js",
        path: path.resolve(__dirname, '../web/build')
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    module: {
        loaders: [{
            test: /\.tsx$/,
            loader: 'ts-loader',
            options: {
                configFile: 'tsconfig.web.json'
            }
        }]
    },
    devtool: 'inline-source-map'
};