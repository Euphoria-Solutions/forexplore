const { app, BrowserWindow, ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const fs = require('fs');
const os = require('os');

const homeDirectory = os.homedir();

const platformRaw = os.platform();
const platform = platformRaw == 'darwin' ? 'mac' : platformRaw == 'win32' ? 'windows' : 'other';
const mtPaths = {
    mac: {
        mt5: `${homeDirectory}/Library/Application\ Support/net.metaquotes.wine.metatrader5/drive_c/Program\ Files/MetaTrader\ 5/MQL5/Experts/Advisors/`,
        mt4: `${homeDirectory}/Library/Application\ Support/net.metaquotes.wine.metatrader4/drive_c/Program\ Files\ (x86)/MetaTrader\ 4/MQL4/Experts`,
    },
    windows: {
        mt5: `${homeDirectory}/Library/Application\ Support/net.metaquotes.wine.metatrader5/drive_c/Program\ Files/MetaTrader\ 5/MQL5/Experts/Advisors/`,
        mt4: `${homeDirectory}/Library/Application\ Support/net.metaquotes.wine.metatrader5/drive_c/Program\ Files/MetaTrader\ 5/MQL5/Experts/Advisors/`,
    }
}

const eaScriptPath = path.join(__dirname, '..', 'ea-scripts', platform, 'mt5.mq5');


const installEAScript = (mt5Path, eaScriptPath) => {
    const destinationPath = path.join(mt5Path, path.basename(eaScriptPath));

    fs.copyFile(eaScriptPath, destinationPath, (err) => {
        if (err) throw err;
        console.log('EA script has been installed successfully.');
    });
}

const appServe = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (app.isPackaged && appServe) {
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    } else {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", () => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

ipcMain.on('install-ea', (event, arg) => {
    try {
        installEAScript(mtPaths[platform][arg], eaScriptPath);
        // Optionally send a response back to the renderer process
        event.reply('install-ea-function-response', `success ${platform} ${arg}`);
    } catch (e) {
        event.reply('install-ea-function-response', 'error');
    }
});

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});