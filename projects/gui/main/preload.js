const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
		ipcRenderer.on(channel, callback);
	},
	send: (channel, args) => {
		ipcRenderer.send(channel, args);
	},
	installEA: (arg) => ipcRenderer.send('install-ea', arg),
	responseOfInstallEA: (callback) => ipcRenderer.on('install-ea-function-response', (event, ...args) => {
		callback(...args)
	})
});
