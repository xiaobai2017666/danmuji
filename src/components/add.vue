<template>
    <div class="app">
        <header class="title">
            <div class="drag"></div>
            <ipc-btn class="btn-list" close="add-close"></ipc-btn>
        </header>
        <div class="form">
            <div class="form-item">
                <label for="">视频名称</label>
                <input type="text" placeholder="喵喵喵？" v-model="title">
            </div>
            <div class="form-item">
                <label for="">视频的地址</label>
                <input type="text" placeholder="https://XXX.mp4" v-model="url">
            </div>
            <div class="form-item">
                <label for="">av号(弹幕需要)</label>
                <input type="text" placeholder="相信大家都懂" v-model="av">
            </div>
            <div class="form-item">
                <label for="">是否是港澳台</label>
                <input type="checkbox" v-model="is">
            </div>
            <div :class="{ 'form-item':true , visible: !is}">
                <label for="">番剧号(弹幕需要)</label>
                <input type="text" placeholder='"https://www.bilibili.com/bangumi/play/"后面的号' v-model="ep">
            </div>
        </div>
        <footer class="btns">
            <button @click="sure">确定</button>
            <button @click="cancel">取消</button>
        </footer>
    </div>
</template>

<script>
import ipcBtn from './btn-list.vue';
const ipcRenderer = require('electron').ipcRenderer;

export default {
    data() {
        return {
            title: "",
            url: "",
            av: "",
            is: false,
            ep: ""
        }
    },
    components: {
        ipcBtn
    },
    methods: {
        sure() {
            let that=this;
            ipcRenderer.send('add-sure',{
                title: that.title,
                url: that.url,
                av: that.av,
                is: that.is ? 1 : 0,
                ep: that.ep
            });
        },
        cancel() {
            ipcRenderer.send('add-close');
        }
    }
}
</script>

<style scoped>
    .app {
        color: #ff9955;
        text-shadow:
        0 0 3px #ffffff,
        0 0 3px #ffffff;
        background: #000;
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        padding: 6px 8px;
        border: 0.5px solid #fff;
        box-sizing: border-box;
    }
    .btn-list {
        float: right;
    }
    .title {
        display: flex;
    }
    .drag {
        flex:1;
        -webkit-app-region:drag;
    }
    .title::after {
      content: "";
      display: block;
      clear: both;
    }
    .form {
        padding: 4px 32px;
    }
    .form-item {
        display: flex;
        margin: 4px 0;
    }
    label {
        width: 140px;
    }
    input[type="text"] {
        flex: 1;
        border: none;
        border-radius: 2px;
    }
    input[type="checkbox"] {
        position: relative;
        top: 3px;
        border: none;
        width: 14px;
        height: 14px;
    }
    .visible {
        visibility: hidden;
    }
    .btns {
        float: right;
        padding: 4px 32px;
    }
    button {
        color: #ff9955;
        margin: 4px 0;
        padding: 4px 6px 6px;
        border: 0.5px solid #fff;
        border-radius: 4px;
        background: transparent;
        outline: none;
        cursor: pointer;
    }
    button:hover {
        border-color: #ff9955;
        box-shadow:
        0 0 4px #ffffff,
        0 0 4px #ffffff;
    }
</style>
