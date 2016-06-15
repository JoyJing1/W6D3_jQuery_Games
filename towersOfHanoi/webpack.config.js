module.exports = {
  entry: "./js/main.js",
  output: {
    path: "./",/* where `index.html` can find your bundle */
    filename: "bundle.js"/* your `bundle` */
  },
  devtool: "source-map",
  /* add 'source-map' to get line-sourced errors in Dev Tools*/
};

// NOTE: `context` and `path` are relative to this config file.
