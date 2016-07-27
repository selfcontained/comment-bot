module.exports = {
  production: {
    port: process.env.PORT,
    cache: {
      store: 'memory'
    },
    spreadsheet: {
      ttl: '15 minutes',
      id: '1gn9Cpk7H8uK5ADhlUSHvNqdzwBLsLIYe0JY7IjOomyg',
      sheet: 1
    },
    slack: {
      verifyToken: process.env.SLACK_VERIFY_TOKEN
    },
    // If you use the redis cache, you don't have to pull from the Google API all the time
    // port: process.env.PORT,
    // cache: {
    //   store: 'redis',
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   options: {
    //     password: process.env.REDIS_PASS
    //   }
    // },
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
