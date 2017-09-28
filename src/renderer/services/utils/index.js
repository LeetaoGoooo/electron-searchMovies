const {dialog} = require('electron').remote
const clipboard = require('electron').clipboard
const request = require('request')

function showMessage (message) {
  dialog.showMessageBox({type: 'info', message: message})
}

function copy2Board (text) {
  clipboard.clear()
  clipboard.writeText(text.toString())
}

function checkNetStatus () {
  var url = 'https://avatars1.githubusercontent.com/u/10162120?v=4&s=460'
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      if (response.statusCode !== 200) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

export default {
  showMessage,
  copy2Board,
  checkNetStatus
}
