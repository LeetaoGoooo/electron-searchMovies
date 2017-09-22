'use strict'

import { app, BrowserWindow } from 'electron'

const nativeImage = require('electron').nativeImage
var image = nativeImage.createFromPath(require('path').join(__dirname, '/src/renderer/assets/logo.jpg'))

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let loadingScreen
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/`
  : `file://${__dirname}/index.html`

const loadingURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/loading`
  : `file://${__dirname}/index.html#loading`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    minWidth: 780,
    icon: image,
    show: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()

    if (loadingScreen) {
      let loadingScreenBounds = loadingScreen.getBounds()
      mainWindow.setBounds(loadingScreenBounds)
      loadingScreen.close()
    }
  })
}

function createLoadingScreen () {
  loadingScreen = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    minWidth: 780,
    icon: image,
    show: false,
    parent: mainWindow
  })

  console.log(loadingURL)
  loadingScreen.loadURL(loadingURL)
  loadingScreen.on('closed', () => {
    loadingScreen = null
  })
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show()
  })
}

app.on('ready', () => {
  createLoadingScreen()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
