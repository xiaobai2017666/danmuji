//简易AJAX
function getRequest(url) {
  let xmlhttp=new XMLHttpRequest();
  xmlhttp.open('GET',url,false);
  xmlhttp.send();
  return xmlhttp;
}

//弹幕数据获取
function getDanmuXml(id) {
  let cid=JSON.parse(getRequest('https://www.bilibili.com/widget/getPageList?aid='+id).responseText)[0].cid;
  xmlDoc=getRequest('https://api.bilibili.com/x/v1/dm/list.so?oid='+ cid +'&type=1').responseXML;
  
  return Array.prototype.map.call(xmlDoc.querySelectorAll('d'),function(item) {
    let temp=item.attributes[0].nodeValue.split(',');
    return {
      time: Number(temp[0]),
      mode: temp[1]==='4'?temp[1]==='5'?1:2:0,
      color: Number(temp[3]).toString(16),
      text: item.textContent
    };
  });
}
let danmuArr=getDanmuXml(JSON.parse(getRequest('https://www.b0110.com/danmuji/data.json').responseText).id);

//单击双击
let clickTimer=null;
let sgFlag=false;
let dbFlag=false;
container.addEventListener('click',function() {
  clearTimeout(clickTimer);
  clickTimer=setTimeout(function() {
    sgFlag=!sgFlag;
    if(sgFlag) {
      video.play();
    }else {
      video.pause();
    }
  },300);
});
container.addEventListener('dblclick',function() {
  clearTimeout(clickTimer);
  dbFlag=!dbFlag;
  if(dbFlag) {
    container.webkitRequestFullscreen();
  }else {
    document.webkitExitFullscreen();
  }
});

//弹幕显示改变
let dh=720; //默认高度
let wh=window.screen.availHeight; //显示屏高度
let wd=wh/dh; //比例

let danmuLines=document.querySelectorAll('.danmu-line');
let flag=false; //默认不全屏
document.addEventListener("webkitfullscreenchange", function() {
  flag=!flag;
  if(flag) {
    window['danmu-right'].style='width: '+window.screen.availWidth+'px;height: '+720*wd+'px';
    window['danmu-top'].style='width: '+window.screen.availWidth+'px;height: '+720*wd+'px';
    window['danmu-bottom'].style='width: '+window.screen.availWidth+'px;height: '+720*wd+'px';
    Array.prototype.forEach.call(danmuLines,function(item) {
      item.style.height=29*wd+'px';
    });
  }else {
    window['danmu-right'].style='width: 1280px;height: 720px';
    window['danmu-top'].style='width: 1280px;height: 720px';
    window['danmu-bottom'].style='width: 1280px;height: 720px';
    Array.prototype.forEach.call(danmuLines,function(item) {
      item.style.height='29px';
    });
  }
});

//弹道队列状态初始化
let rightList=Array(24).fill(true);
let topList=Array(24).fill(true);
let bottomList=Array(24).fill(true);

//滑动弹幕推送
let danmuRightList=document.querySelectorAll('#danmu-right .danmu-line');

function rightPush(danmu) {
  for(let i=0,len=rightList.length;i<len;i++) {
    if(rightList[i]) {
      let temp=document.createElement('div');
      temp.className='danmu-item';
      temp.innerText=danmu.text;
      temp.style.color='#'+danmu.color;
      temp.style.animation='16s move linear';
      danmuRightList[i].appendChild(temp);
      temp.addEventListener('webkitAnimationEnd',function() {
        temp.remove();
      })
      rightList[i]=false;

      //防重叠计算
      setTimeout(function() {
        rightList[i]=true;
      },(temp.clientWidth+66)*8000/1280);   //66为间隔距离
      //=========

      break;
    }
  }
}

//顶部弹幕推送
let danmuTopList=document.querySelectorAll('#danmu-top .danmu-line');

function topPush(danmu) {
  for(let i=0,len=topList.length;i<len;i++) {
    if(topList[i]) {
      let temp=document.createElement('div');
      temp.className='danmu-item';
      temp.innerText=danmu.text;
      temp.style.color='#'+danmu.color;
      temp.style.position='static';
      temp.style.animation='8s dis linear';
      danmuTopList[i].appendChild(temp);
      temp.addEventListener('webkitAnimationEnd',function() {
        temp.remove();
        topList[i]=true;
      });
      topList[i]=false;

      break;
    }
  }
}

//底部弹幕推送
let danmuBottomList=document.querySelectorAll('#danmu-bottom .danmu-line');

function bottomPush(danmu) {
  for(let i=bottomList.length-1;i>=0;i--) {
    if(bottomList[i]) {
      let temp=document.createElement('div');
      temp.className='danmu-item';
      temp.innerText=danmu.text;
      temp.style.color='#'+danmu.color;
      temp.style.position='static';
      temp.style.animation='8s dis linear';
      danmuBottomList[i].appendChild(temp);
      temp.addEventListener('webkitAnimationEnd',function() {
        temp.remove();
        bottomList[i]=true;
      });
      bottomList[i]=false;

      break;
    }
  }
}

//弹幕推送开始
let playTimer=null;
let tempDanmuArr=[...danmuArr];  //防止重复弹幕，存到另一个变量里

function danmuPushBegin() {
  playTimer=setInterval(function() {
    let time=video.currentTime;
    tempDanmuArr.forEach(function(item,index) {
      if(time-item.time<0.1&&time-item.time>0) {
        if(item.mode===0) rightPush(item);
        if(item.mode===1) topPush(item);
        if(item.mode===2) topPush(item);
        tempDanmuArr.splice(index, 1);
      }
    });
  },17);
}

//播放暂停事件
video.addEventListener('play',function() {
  danmuPushBegin();
  Array.prototype.forEach.call(document.querySelectorAll('.danmu-item'),function(item) {
    item.style.webkitAnimationPlayState='running';
  })
});
video.addEventListener('pause',function() {
  clearTimeout(playTimer);
  Array.prototype.forEach.call(document.querySelectorAll('.danmu-item'),function(item) {
    item.style.webkitAnimationPlayState='paused';
  })
});


// 其他
function danmuClear() {
  Array.prototype.forEach.call(document.querySelectorAll('.danmu-item'),function(item) {
    item.remove();
  });

  rightList=Array(24).fill(true);
  topList=Array(24).fill(true);
  bottomList=Array(24).fill(true);
}

window['file-select-btn'].addEventListener('click',function() {
  window['file-select'].click();
});
window['file-select'].addEventListener('change',function(e) {
  let file = window['file-select'].files[0];
  let url = URL.createObjectURL(file);
  window['video-url'].value=url;
});
sure.addEventListener('click',function() {
  video.src=window['video-url'].value;
  tempDanmuArr=[...danmuArr];
  danmuClear();
});


window['danmu-clear'].addEventListener('click',danmuClear);

window['danmu-load'].addEventListener('click',function() {
  danmuArr=getDanmuXml(window['danmu-av'].value);
  tempDanmuArr=[...danmuArr];
  danmuClear();
});