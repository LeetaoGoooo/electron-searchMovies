var fs = require('fs')
var path = require('path')
var request = require('request')
const {shell} = require('electron')

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
  shell.openExternal('https://github.com/lt94/electron-searchMovies/releases')
}

export default {
  getCurrentVersion,
  getLocalVersion,
  getUpdate
}
