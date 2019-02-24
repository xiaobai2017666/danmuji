/*
获取B站弹幕
*/
const axios=require('axios');

async function getDanmu(id) {
  let xml=null;

  await axios({
    method: 'GET',
    url: 'https://www.bilibili.com/widget/getPageList?aid=' + id,
    timeout: 3000
  }).then(function(res) {
    return axios({
      method: 'get',
      url: 'https://api.bilibili.com/x/v1/dm/list.so?oid='+ res.data[0].cid +'&type=1',
      responseType: 'document',
      timeout: 3000
    }).then(function(res) {
      xml=res.data;
    });
  });
  
  return Array.prototype.map.call(xml.querySelectorAll('d'),function(item) {
    let temp=item.attributes[0].nodeValue.split(',');
    if(temp[1]==='4'||temp[1]==='5') {
      temp[1]=temp[1]==='4'?1:2;
    }else {
      temp[1]=0;
    }
    return {
      time: Number(temp[0]),  //出现时间
      mode: temp[1],  //弹幕展现形式
      color: Number(temp[3]).toString(16),  //弹幕颜色
      text: item.textContent  //弹幕内容
    };
  });
}