<template>
    <div>
        <div><slot></slot></div>
        <ul class="list">
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
            url: 'https://xiaobai2017666.github.io/videos/'
        }).then(function(res) {
            that.videoList=res.data.list;
        })
    },
    mounted() {
        let that=this;

        ipcRenderer.on('video-add', (e,args)=> {
            console.log(1);
            that.videoList.push(args);
        });
    }
}
</script>

<style scoped>
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
    }
    .list-li:hover {
        border: 0.5px solid #ff9955;
    }
    .active {
        border: 0.5px solid #fff;
    }
</style>
