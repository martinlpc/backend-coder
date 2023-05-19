import winston from 'winston'

const logFileName = './errors.log'
let customLevelOpt, transportsArray

if (process.env.NODE_ENV = 'dev') {
    customLevelOpt = {
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            http: 4,
            debug: 5
        },
        colors: {
            fatal: 'red',
            error: 'red',
            warning: 'yellow',
            info: 'blue',
            http: 'blue',
            debug: 'blue'
        }
    }

    transportsArray = [
        new winston.transports.Console({
            level: 'fatal',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'warning',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'http',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        })
    ]

} else {
    customLevelOpt = {
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3
        },
        colors: {
            fatal: 'red',
            error: 'red',
            warning: 'yellow',
            info: 'blue'
        }
    }

    transportsArray = [
        new winston.transports.File({
            level: 'fatal',
            filename: logFileName,
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: logFileName,
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'warning',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOpt.colors }),
                winston.format.simple()
            )
        })
    ]
}


const logger = winston.createLogger({
    levels: customLevelOpt.levels, //Defino que los levels del logger sean los propios
    //Defino los transportes que va a contener mi logger (no definido, no utilizable)

    transports: transportsArray
})

export const addLogger = (req, res, next) => {
    req.logger = logger //Poder utilizar el logger definido previamente
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} `)
    next()
}