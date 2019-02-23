const { BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

function onOnlineStatusChange(app, onChange) {
  app.on('ready', () => {
    onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
    onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
  })

  ipcMain.on('online-status-changed', onChange)
}

module.exports = { onOnlineStatusChange }
