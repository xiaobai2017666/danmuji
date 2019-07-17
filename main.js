const { app, BrowserWindow, ipcMain } =require('electron');

let mainWindow;
let childWindow;

let url;
if(process.env.NODE_ENV === 'development') {
  url='http://localhost:9999/';
}else {
  url='./dist/';
}
let main=url+'index.html';
let add=url+'add.html';

function createWindow () {   
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({ 
    width: 1280,
    height: 720,
    resizable: true,  //可变大小
    frame: false,  //菜单与边框显示
    center: true,  //初始位置居中
    webPreferences: {
      backgroundThrottling: false, // 当页面被置于非激活窗口的时候是否停止动画和计时器
      nodeIntegration: true,
      webSecurity: false, //禁用同源策略
      defaultFontFamily:{
       standard:"Microsoft YaHei",
      }
    }
  });

  childWindow = new BrowserWindow({
    width: 500,
    height: 240,
    resizable: false,
    frame: false,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      defaultFontFamily:{
        standard:"Microsoft YaHei",
      }
    }
  });
  childWindow.hide();

  // 然后加载 app 的 index.html.
  if(process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(main);
    childWindow.loadURL(add);
  }else {
    mainWindow.loadFile(main);
    childWindow.loadFile(add);
  }

  mainWindow.on('close', e=> app.quit());
  //主进程和渲染进程通信事件
  //-------主界面---------
  ipcMain.on('main-min', e=> mainWindow.minimize());
  ipcMain.on('main-max', e=> {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize()
  }
  });
  ipcMain.on('main-close', e=> app.quit());
  //----------------------
  //-------增加界面--------
  ipcMain.on('add-sure', (e,args)=> {
    childWindow.hide();
    mainWindow.webContents.send('video-add',args);
  });
  ipcMain.on('add-show',e=> {
    childWindow.show();
  });
  ipcMain.on('add-close',e=> childWindow.hide());
  //----------------------
}

app.on('ready', createWindow);