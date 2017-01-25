process.env.NODE_ENV === 'production' ? module.exports = require('./webpack.prod.config.js') : module.exports = require('./webpack.dev.config.js');
