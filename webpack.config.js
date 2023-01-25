const path = require("node:path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MyPlugin = require("./my-plugin");

const isProd = process.env.NODE_ENV === "production";

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: isProd ? "production" : "development",
    devtool: isProd ? false : "inline-source-map",
    entry: {
        // index: "./src/index",
        home: "./src/home",
    },
    output: {
        clean: true,
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    "ts-loader",
                    // path.resolve("./my-loader/index.js")
                ],
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: "html-loader",
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env", { stage: 0 }]],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env", { stage: 0 }]],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.txt$/,
                type: "asset/source",
            },
            // {
            //     test: /\.(ico|png)$/,
            //     type: "asset/resource",
            //     // type: "asset/inline",
            //     generator: {
            //         filename: "images/[hash]_[name][ext]",
            //     },
            // },
            {
                test: /\.(ico|png)$/,
                type: "asset",
                generator: {
                    filename: "images/[hash]_[name][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        // Inline anything less than maxSize
                        maxSize: 10 * 1024,
                    },
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCSSExtractPlugin({
            filename: "bundle.css",
        }),
        // new CopyWebpackPlugin({
        //     patterns: [{ from: "./src/images", to: "images" }],
        // }),
        // new BundleAnalyzerPlugin(),
        new MyPlugin(),
    ],
    resolve: {
        extensions: [".ts", ".js"],
    },
    ...(!isProd && {
        devServer: {
            watchFiles: ["src/**/*"],
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    pathRewrite: {
                        "^/api": "",
                    },
                },
            },
        },
    }),
};
