module.exports = {
    production: {
        port: process.env.PORT,
        spreadsheet: {
            ttl: '15 minutes',
            id: process.env.GOOGLE_DOC,
            sheet: 1
        },
        slack: {
            verifyToken: process.env.SLACK_VERIFY_TOKEN
        },
        cache: {
            store: 'redis',
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            options: {
                password: process.env.REDIS_PASS
            }
        },
        logging: {
            colorize: false,
            timestamp: true,
            loggers: {
                debug: 'rainbow',
                beepboop: 'magenta',
                botkit: 'yellow',
                facebook: 'blue',
                info: 'green',
                error: 'red'
            },
            enabled: {
                debug: false,
                facebook: true,
                beepboop: true,
                botkit: true,
                info: true,
                error: true
            }
        }
    },
  // Applied over production values
    development: {
        port: 8080,
        cache: {
            store: 'memory'
        },
        logging: {
            colorize: true,
            timestamp: true,
            enabled: {
                debug: true
            }
        }
    }
}
