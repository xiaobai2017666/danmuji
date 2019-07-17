<template>
    <div>
        <div><slot></slot></div>
        <ul class="list">
            <li :class="{ 'list-li': true , 'list-li-diy': true , active: (current===index) }" v-for="(item,index) in diyList" :key="index" @click="videoChange(item.url,item.av,item.is,item.ep,index)">
                {{ item.title }}
            </li>
            <li :class="{ 'list-li': true , active: (current===index) }" v-for="(item,index) in videoList" :key="index" @click="videoChange(item.url,item.av,item.is,item.ep,index)">
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer;
import axios from 'axios';

export default {
    data() {
        return {
            videoList: [],
            diyList: [],
            current: -1
        }
    },
    methods: {
        videoChange(url,av,is,ep,index) {
            this.$bus.$emit('url-change',url,av,is,ep);
            this.current=index;
        }
    },
    created() {
        let that=this;

        axios({
            url: 'https://xiaobai2017666.github.io/videos/',
            headers: {
                'Cache-Control':'no-cache'
            }
        }).then(function(res) {
            that.videoList=res.data.list.sort((left,right) => {
                return (left.title > right.title) ? 1 : -1;
            })
        })
    },
    mounted() {
        let that=this;

        ipcRenderer.on('video-add', (e,args)=> {
            that.diyList.unshift(args);
        });
    }
}
</script>

<style scoped>
    @keyframes show {
        0% {
            opacity: 0;
            height: 0;
        }
        100% {
            opacity: 1;
            height: 16px;
        }
    }
    .list {
        height: 100%;
        text-shadow: none;
        list-style: none;
        margin: 4px 16px;
        padding: 0;
        font-size: 14px;
        overflow: auto;
    }
    .list-li {
        padding: 3px 3px 4px;
        border: 0.5px solid transparent;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        transition: 0.2s all;
    }
    .list-li-diy {
        animation: 1s show;
    }
    .list-li:hover {
        border: 0.5px solid #ff9955;
    }
    .active {
        border: 0.5px solid #fff;
    }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/   
    .list::-webkit-scrollbar {
        width: 9px;
        height: 9px
    }
    /*定义滚动条轨道*/ 
    .list::-webkit-scrollbar-track {
        background-color: rgba(256,256,256,0.2);
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em
    }
    /*定义滑块 内阴影+圆角*/ 
    .list::-webkit-scrollbar-thumb {
        background-color: #ff9955;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em
    }
</style>
