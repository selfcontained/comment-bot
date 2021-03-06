module.exports = {
    production: {
        port: process.env.PORT,
        spreadsheet: {
            ttl: '15 minutes',
            id: '1gn9Cpk7H8uK5ADhlUSHvNqdzwBLsLIYe0JY7IjOomyg',
            sheet: 1
        },
        slack: {
            verifyToken: process.env.SLACK_VERIFY_TOKEN
        },
        cache: {
            store: 'memory'
        },
        logging: {
            colorize: false,
            timestamp: true,
            loggers: {
                debug: 'rainbow',
                beepboop: 'magenta',
                botkit: 'yellow',
                info: 'green',
                error: 'red'
            },
            enabled: {
                debug: false,
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
