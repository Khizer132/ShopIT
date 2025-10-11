const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        zlib: require.resolve("browserify-zlib"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        assert: require.resolve("assert/"),
        querystring: require.resolve("querystring-es3"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
      };
      return webpackConfig;
    },
  },
};