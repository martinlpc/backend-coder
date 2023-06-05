import winston from 'winston'

const logFileName = './errors.log'

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
}
// Color only applied on dev logger, they break logfiles in production
const colors = {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'cyan'
};

// Error file transport config
const errorTransport = new winston.transports.File({
    filename: logFileName,
    level: 'error' // 'Error' level and higher are stored in the file
})

// Log output config
const outputPrintfFormat = winston.format.printf(info => {
    return `[${info.level}] ${[info.timestamp]}: ${info.message}`
})

// Development logger config
const devLogger = winston.createLogger({
    levels,
    format: winston.format.combine(
        winston.format.colorize({ colors: colors }),
        winston.format.timestamp({
            format: 'DD-MMM-YYYY HH:mm:ss'
        }),
        outputPrintfFormat
    ),
    transports: [new winston.transports.Console({ level: 'debug' })]
})

// Production logger config
const prodLogger = winston.createLogger({
    levels,
    format: winston.format.combine(
        //winston.format.colorize({ colors: colors }),
        winston.format.timestamp({
            format: 'DD-MMM-YYYY HH:mm:ss'
        }),
        outputPrintfFormat
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        errorTransport
    ]
})

// Logger selection depending on the environment
const getLogger = () => {
    if (process.env.NODE_ENV === 'prod') {
        return prodLogger
    }
    return devLogger
}

// Exporting to mw folder
export const logger = getLogger()
