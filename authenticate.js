const corsMiddleware = require('cors');

function authenticate(required) {
    return function(req, res, next) {
        next();
    };
}

function withRole(role) {
    return function(req, res, next) {
        next();
    }
}

const corsPerRoute = corsMiddleware({
    origin: ['http://localhost', 'https://www.mezinamiridici.cz'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // preflightContinue: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});

module.exports.optional = authenticate(false);
module.exports.required = authenticate(true);
module.exports.poll_admin = withRole('admin:poll');
module.exports.cors = corsPerRoute;
