<template>
    <div class="container">
        <header class="title">
            弹幕姬 <span class="small">v1.4</span>
            <button @click="about" class="about">关于软件</button>
            <div class="drag"></div>
            <ipc-btn class="btn-list" min="main-min" max="main-max" close="main-close"></ipc-btn>
        </header>
        <div class="middle">
            <menu-item class="menu"></menu-item>
            <vedio-item class="vedio"></vedio-item>
        </div>
    </div>
</template>

<style scoped>
    .container {
        flex-direction: column;
        height: 100%;
        background-image: url('../asserts/bkg.jpg');
        background-position: center;
        color: #ff9955;
        text-shadow:
        0 0 3px #ffffff,
        0 0 3px #ffffff;
        overflow: hidden;
    }
    .title {
        display: flex;
        background: rgba(0,0,0,0.8);
        padding: 12px 36px;
        font-size: 36px;
        align-items: flex-end;
    }
    .drag {
        flex: 1;
        height: 48px;
        -webkit-app-region:drag;
    }
    .small {
        font-size: 12px;
    }
    .btn-list {
        float: right;
    }
    .middle {
        height: calc(100% - 72px);
        display: flex;
    }
    .menu {
        height: 100%;
    }
    .vedio {
        flex: 1;
    }
    .about {
        border: none;
        outline: none;
        background: transparent;
        color: #ff9955;
        text-shadow:
        0 0 3px #ffffff,
        0 0 3px #ffffff;
        cursor: pointer;
    }
</style>

<script>
import menuItem from './menu.vue';
import vedioItem from './vedio.vue';
import ipcBtn from './btn-list.vue';
const { dialog } = require('electron').remote;

export default {
    components: {
        menuItem,
        vedioItem,
        ipcBtn
    },
    methods: {
        about() {
            dialog.showMessageBox({
                title: '弹幕姬',
                detail: `版本: v1.4\n作者: Weismann\ngithub: https://github.com/xiaobai2017666/danmuji\nQQ: 1563511027\n动漫群: 2104517\n明日方舟群: 2184571`
            })
        }
    }
}
</script>