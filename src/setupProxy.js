const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://travelplanetserver.herokuapp.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
};

//'http://localhost:5000'