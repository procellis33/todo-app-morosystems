const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
    {
        entry: "./src/client/index.tsx",
        mode: "development",
        target: "web",
        output: {
            path: path.resolve(__dirname, "dist/client"),
            filename: "client_bundle.js",
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/client/index.html"
            })
        ],
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".jsx"],
            alias: {
                "@api": path.resolve(__dirname, "src/client/api"),
                "@assets": path.resolve(__dirname, "src/client/assets"),
                "@components": path.resolve(__dirname, "src/client/components"),
                "@hooks": path.resolve(__dirname, "src/client/hooks"),
                "@interfaces-types": path.resolve(__dirname, "src/client/interfaces-types"),
                "@pages": path.resolve(__dirname, "src/client/pages"),
                "@redux": path.resolve(__dirname, "src/client/redux"),
                "@constants.ts": path.resolve(__dirname, "src/client/constants.ts"),
            }

        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', "@babel/preset-react", "@babel/preset-typescript"],
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|ttf|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                }
            ]
        }
    }
]