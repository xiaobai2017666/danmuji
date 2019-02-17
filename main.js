const { app, BrowserWindow } = require('electron');

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({ width: 1330, height: 940 , resizable: false});

  // 然后加载 app 的 index.html.
  win.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  app.quit();
});