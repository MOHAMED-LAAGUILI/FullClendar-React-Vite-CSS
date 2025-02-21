// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/restcountries',
    createProxyMiddleware({
      target: 'https://restcountries.com',
      changeOrigin: true,
      pathRewrite: {
        '^/restcountries': '', // remove /restcountries from the URL
      },
    })
  );
};
