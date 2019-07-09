const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  nativeImage,
  Menu
} = require('electron')
const AutoLaunch = require('auto-launch')

const { onOnlineStatusChange } = require('./lib/online-status')

let tray = undefined
let window = undefined

let autoLauncher = new AutoLaunch({
  name: 'Gem'
})

let autoLaunchEnabled = false

autoLauncher.isEnabled().then(function(isEnabled) {
  autoLaunchEnabled = isEnabled
})

const appUrl = 'http://gem.cserdean.com'

// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app

app.setName('Gem')

onOnlineStatusChange(app, (_, status) => {
  if (status === 'offline')
    window.loadURL(`file://${__dirname}/views/offline.html`)
  if (status === 'online') window.loadURL(appUrl)
})

app.on('ready', () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        type: 'submenu',
        label: 'Gem',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
              app.quit()
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
          {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            selector: 'redo:'
          },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            selector: 'selectAll:'
          }
        ]
      }
    ])
  )

  // Setup the menubar with an icon
  tray = new Tray(`${__dirname}/icons/trayTemplate.png`)

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', function(event) {
    toggleWindow()

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' })
    }
  })

  tray.on('right-click', function(event) {
    if (window.isVisible()) toggleWindow()

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Preferences',
        type: 'submenu',
        submenu: [
          {
            label: 'Launch at login',
            type: 'checkbox',
            checked: autoLaunchEnabled,
            click: () => {
              if (autoLaunchEnabled) {
                autoLauncher.disable()
                autoLaunchEnabled = false
              } else {
                autoLauncher.enable()
                autoLaunchEnabled = true
              }
            }
          }
        ]
      },
      { type: 'separator' },
      {
        type: 'normal',
        label: 'Open Developer Tools',
        click: () => window.openDevTools({ mode: 'detach' })
      },
      {
        type: 'normal',
        label: 'Reload',
        click: () => window.reload()
      },
      { type: 'separator' },
      {
        label: 'Quit Gem',
        type: 'normal',
        accelerator: 'CmdOrCtrl+Q',
        click: () => app.quit()
      }
    ])

    tray.popUpContextMenu(contextMenu)
  })

  // Make the popup window for the menubar
  window = new BrowserWindow({
    width: 400,
    height: 700,
    title: 'Gem',
    resizable: false,
    show: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    frame: false,
    movable: false,
    backgroundColor: 'white',
    webPreferences: {
      partition: 'persist:sitePoller'
    }
  })

  window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  // Tell the popup window to load our index.html file
  window.loadURL(appUrl)

  // Only close the window on blur if dev tools isn't opened
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })

  const handleRedirect = (e, url) => {
    const appHost = new URL(appUrl).href
    const urlHost = new URL(url).href

    if (appHost !== urlHost) {
      e.preventDefault()
      require('electron').shell.openExternal(url)
    }
  }

  window.webContents.on('will-navigate', handleRedirect)
  window.webContents.on('new-window', handleRedirect)
})

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const trayPos = tray.getBounds()
  const windowPos = window.getBounds()
  let x,
    y = 0
  if (process.platform == 'darwin') {
    const verticalPadding = 8

    x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2)
    y = Math.round(trayPos.y + trayPos.height + verticalPadding)
  } else {
    x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2)
    y = Math.round(trayPos.y + trayPos.height * 10)
  }

  window.setPosition(x, y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Tray Icon as Base64 so tutorial has less overhead
let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACeSURBVHgBvZENCcMwEIXfTUHnIBIiYU42CXOwOtgkTMKmoBIiIRIq4foKLT1oKfkp/eAICXcf5B1wEGIvqnrncUMafxH5rV4pcaxe0xl7/ZYkaj6R1VhRp+V0s+Sl9bwvdF1RjxzxtWAzarQ8bFe7ubiSGJnPEPnd1NjwSJA8kQIb2x1Jixw48N2QfFACB4ORBJSiyybHcqhhkjmcxQCxlGBIJWYHzwAAAABJRU5ErkJggg==`
