/*
视频地址解析，两种地址：m3u8加密地址，和真实地址
*/
const hls=require('hls.js');

function videoParse(url,dom) {
  // 类型判断，String
  if(typeof url !=='string') {
    throw 'Function "videoParse" \'s param(url) is not String';
    return;
  }

  const M3U8R=/[\d\D]*.m3u8$/;

  if(M3U8R.test(url)) {
    let hlsObject=new hls();
    hlsObject.loadSource(url);
    hlsObject.attachMedia(dom);
  }else {
    dom.src=url;
  }
}