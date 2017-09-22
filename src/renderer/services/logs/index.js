var log4js = require('log4js')
var path = require('path')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    error: {
      type: 'file',
      filename: path.join(__dirname, '../../../../logs/errors/error.error'),
      maxLogSize: 1024,
      encoding: 'utf-8'
    },
    normal:
    {
      type: 'dateFile',
      filename: path.join(__dirname, '../../../../logs/logs/log'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8'
    }
  },
  categories: {
    default: { appenders: ['console', 'normal', 'error'], level: 'info' }
  }
})

function logInfo (message) {
  var logger = log4js.getLogger('normal')
  logger.info(message)
}

function logError (message) {
  var logger = log4js.getLogger('error')
  logger.info(message)
}

export default {
  logInfo,
  logError
}
