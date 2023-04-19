'use strict'

const { app, BroserWindon, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
	const win = new BroserWindon ({
		width: 800,
		height: 600,
		webPreferences: {
			preload : path.join(__dirname, 'preload.js'),
		},

	})
	ipcMain.handle('ping', () => 'pong')
	win.loadFile('index.html')
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BroserWindon.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', ()  => {
	if(process.platform !== 'darwin'){
		app.quit
	}
})