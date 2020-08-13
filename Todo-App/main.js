const url = require("url");
const path = require("path");

const {
  app,
  BrowserWindow
} = require("electron");

var mainWindow;

app.on("ready", function() {
  //Create Window
  mainWindow = new BrowserWindow({
    width: 960,
    height: 1080
  });

  //Load HTML-File into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "window.html"),
    protocol: "file:",
    slashes: true
  }));
});