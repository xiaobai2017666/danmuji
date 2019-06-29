# 弹幕姬
**穷人的实时弹幕工具**

软件预览：

![预览图](<https://xiaobai2017666.github.io/images/danmuji/preview.png>)

整体使用electron+vue框架

更新记录：

- 2019/2/21更新：
  1. 增加弹幕进度条，可调整进度
- 2019/2/20更新：
  1. 增加m3u8加密解析，视频地址输入m3u8地址也可以播放
  2. 优化程序，修复部分时候卡死的情况
  3. 临时修复顶部弹幕和底部弹幕不生效的问题
- 2019/6/27更新：
  1. 整体框架改变，采用webpack打包渲染进程文件
  2. 播放器使用了dplayer，但是修改了弹幕API的源码并编译好在lib文件夹下，修改后的源代码在[这里](https://github.com/xiaobai2017666/DPlayer)
  3. 美化了UI

使用：

1. 修改main.js中的"url"为"http://localhost:9999/"，修改"loadFile"为"loadURL"
2. 通过"npm run dev"启动webpack-dev-server
3. “npm start”启动软件