const {dialog} = require('electron').remote
const clipboard = require('electron').clipboard

function showMessage (message) {
  dialog.showMessageBox({type: 'info', message: message})
}

function copy2Board (text) {
  clipboard.clear()
  clipboard.writeText(text.toString())
}

export default {
  showMessage,
  copy2Board
}
