var fs = require('fs')
var path = require('path')
var request = require('request')
var async = require('async')
var updatefiles = []
var updatefilesIndex = 0
var updateCount = 0
var updatefilesCount = 0

function getLocalVersion () {
  try {
    // 未打包前的路径
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../package.json')).toString())
  } catch (error) {
    // 打包后的路径
    data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../resources/app.asar/package.json')).toString())
  }
  return data.version
}

function getCurrentVersion () {
  var versionUrl = 'https://raw.githubusercontent.com/lt94/electron-searchMovies/master/package.json'
  return new Promise(function (resolve, reject) {
    request(versionUrl, function (error, response, body) {
      if (typeof response === 'undefined' || response.statusCode !== 200) {
        reject(error.code)
      } else {
        var data = JSON.parse(body.toString())
        resolve(data.version)
      }
    })
  })
}

function getUpdate () {
  var versionUrl = 'https://raw.githubusercontent.com/lt94/electron-searchMovies/master/package.json'
  return new Promise(function (resolve, reject) {
    request(versionUrl, function (error, response, body) {
      if (response.statusCode !== 200) {
        reject(error)
      } else {
        var data = JSON.parse(body.toString())
        if (data.changes === 'undefined') {
          resolve(100)
          return
        }
        updatefiles = data['changes']
        updatefilesCount = updatefiles.length
        updateApp(resolve)
      }
    })
  })
}

function updateApp (resolve) {
  var tasks = []
  for (var i = 0; i < updatefiles.length; i++) {
    tasks[i] = updateFile()
  }
  async.parallel(tasks, function (error, result) {
    if (error) {
      console.log(error)
    }
    if (result) {
      updateCount += 1
      resolve(updateCount / updatefilesCount * 100)
    } else {
      updatefilesCount -= 1
    }
  })
}

function updateFile (callback) {
  var fileUrl = 'https://raw.githubusercontent.com/lt94/electron-searchMovies/master/' + updatefiles[updatefilesIndex++]
  request(fileUrl, function (error, response, body) {
    if (response.statusCode !== 200) {
      console.log(error)
      callback(error, false)
    } else {
      fs.writeFileSync(path.join(__dirname, '../../../../', updatefiles[updatefilesIndex++]))
      callback(error, true)
    }
  })
}

export default {
  getCurrentVersion,
  getLocalVersion,
  getUpdate
}
