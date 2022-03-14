import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { ipcMain, dialog } from "electron";
import  fileOpen  from "./component/fileOpen";
import fileSave from "./component/fileSave";


const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
  ipcMain.on("fileOpen", (event, res)=> fileOpen(event, res));
  ipcMain.on("fileSave", (event, res)=> fileSave(event, res));
})();

app.on("window-all-closed", () => {
  app.quit();
});

let fileOpening: boolean = false;
