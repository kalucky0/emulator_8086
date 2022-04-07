import path from "path";

const webpackConfig = () => ({
  mode: "production",
  entry: path.resolve(path.resolve(), "./src/index.ts"),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "script.js",
    path: path.resolve(path.resolve(), "public", "static", "bundle"),
  }
});

export default webpackConfig;
