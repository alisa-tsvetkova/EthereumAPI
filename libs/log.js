var winston = require('winston');

module.exports = function logger(module) {

    return new winston.createLogger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: process.cwd() + '/logs/all.log',
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }), winston.format.json()),
                maxSize: 5242880, //5mb
                maxFiles: 2
            }),
            new winston.transports.File({
                level: 'error',
                filename: process.cwd() + '/logs/errors.log',
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }), winston.format.json()),
                maxSize: 52428800, //50mb
                maxFiles: 10
            }),
            new winston.transports.Console({
                level: 'debug',
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.splat(),
                    winston.format.label({ label: getFilePath(module) }),
                    winston.format.colorize(),
                    winston.format.printf(info => {
                        return `${info.level}: [${info.label}] ${JSON.stringify(info.message)}`;
                    })
                )
            })
        ],
        exitOnError: false
    });
}

function getFilePath(module) {
    // Add filename in log statements
    return module.filename.split('/').slice(-2).join('/');
}