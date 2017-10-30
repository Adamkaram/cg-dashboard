// Karma configuration
// Generated on Mon Jul 27 2015 12:17:38 GMT-0400 (EDT)

const webpackConfig = require("./webpack.config");

module.exports = function(config) {
  config.set({
    browsers: ["Chrome"],

    frameworks: ["jasmine", "jasmine-matchers", "jasmine-sinon"],

    files: ["./static_src/tests.bundle.js"],

    exclude: [],

    plugins: [
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-jasmine-matchers",
      "karma-jasmine-sinon",
      "karma-sourcemap-loader",
      "karma-webpack"
    ],

    preprocessors: {
      "static_src/tests.bundle.js": ["webpack"]
    },

    webpack: {
      ...webpackConfig,
      devtool: "inline-source-map"
    },

    reporters: ["progress"],

    client: {
      captureConsole: process.env.CAPTURE_TEST_CONSOLE || false
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_ERROR,

    autoWatch: true,

    singleRun: false
  });
};
