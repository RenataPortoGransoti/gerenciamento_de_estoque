const expressSession = require('express-session');

const sessionMiddleware = expressSession({
    secret: 'admin',
    resave: false,
    saveUninitialized: true
});

module.exports = sessionMiddleware;