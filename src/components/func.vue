<template>
    <div>
        <slot></slot>
        <div class="func">
            <button @click="ipcSend('add-show')">添加自定义视频配置</button>
            <button>B站弹幕登录（未实装）</button>
            <p>登录后可发送网络弹幕</p>
        </div>
    </div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer;

export default {
    methods: {
        ipcSend(msg) {
            ipcRenderer.send(msg);
        }
    }
}
</script>

<style scoped>
    .func {
        margin: 4px 16px;
        font-size: 14px;
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
    p {
        text-indent: 10px;
        font-size: 10px;
        line-height: 0px;
        text-shadow: none;
    }
</style>
