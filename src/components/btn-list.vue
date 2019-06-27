<template>
    <div>
        <button
        @click="ipcSend(min)" 
        :class="{btn: true,'btn-min': min,'btn-none': !min}"></button>
        <button
        @click="ipcSend(max)"
        :class="{btn: true,'btn-max': max,'btn-none': !max}" ></button>
        <button
        @click="ipcSend(close)"
        :class="{btn: true,'btn-close': close,'btn-none': !close}" ></button>
    </div>
</template>

<script>    
const ipcRenderer = require('electron').ipcRenderer;

export default {
    props: {
        min: String,
        max: String,
        close: String
    },
    methods: {
        ipcSend(msg) {
            ipcRenderer.send(msg);
        }
    }
}
</script>

<style scoped>
    .btn {
        border: none;
        outline: none;
        background: transparent;
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
    .btn-min {
        background: url('../asserts/min.png');
        background-size: 100%;
    }
    .btn-max {
        background: url('../asserts/max.png');
        background-size: 100%;
    }
    .btn-close {
        background: url('../asserts/close.png') no-repeat;
        background-size: 100%;
    }
    .btn-none {
        display: none;
    }
</style>
