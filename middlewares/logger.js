const moment = require('moment');           // get the api call datetime ${moment().format()}

const logger = (req, res, next) => {
    console.log('-----express-log------');
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}    ${moment().format()}`);
    next();
};

module.exports = logger;
