<template>
    <nav class="menu" ref="menu">
        <div class="menu-container" ref="menu-container">
            <func-item class="func-item">功能区</func-item>
            <list-item class="list-item">视频列表</list-item>
        </div>
        <button class="slide" @click="slideup">⚪</button>
    </nav>
</template>

<script>
import funcItem from './func.vue';
import listItem from './video-list.vue';

export default {
    data() {
        return {
            slideFlag: true
        }
    },
    components: {
        funcItem,
        listItem
    },
    methods: {
        slideup() {
            if(this.slideFlag) {
                this.$refs['menu-container'].style='visibility:hidden;animation: 0.5s menuCSlideClose forwards';
                this.slideFlag=false;
            }else {
                this.$refs['menu-container'].style='visibility:visible;animation: 0.5s menuCSlideOpen forwards';
                this.slideFlag=true;
            }
        }
    }
}
</script>

<style>
    @keyframes menuCSlideClose {
        0% {
            width: 280px;
            padding: 16px 24px;
            margin: 50px 40px 38px;
        }
        100% {
            width: 0px;
            padding: 0;
            margin: 20px;
        }
    }
    @keyframes menuCSlideOpen {
        0% {
            width: 0px;
            padding: 0;
            margin: 20px;
        }
        100% {
            width: 280px;
            padding: 16px 24px;
            margin: 50px 40px 38px;
        }
    }
</style>

<style scoped>
    .menu {
        position: relative;
    }
    .menu-container {
        width: 280px;
        height: calc(100% - 88px);
        margin: 50px 40px 38px;
        padding: 16px 24px;
        box-sizing: border-box;
        background: rgba(0,0,0,0.8);
        overflow: hidden;
    }
    .func-item {
        height: 160px;
    }
    .list-item {
        height: calc(100% - 192px);
    }

    .slide {
        height: 36px;
        width: 28px;
        font-weight: bold;
        background: #000;
        border: none;
        outline: none;
        position: absolute;
        left: calc(100% - 40px);
        top: 50%;
        transform: translate(0,-50%);
        cursor: pointer;
        transition: 0.3s all;
    }
    .slide:hover {
        text-shadow:
        0 0 10px #ffffff,
        0 0 10px #ffffff;
    }
    .slide::before {
        content: '';
        border: 20px solid transparent;
        border-left-color: #000;
        transform: rotate(135deg);
        position: absolute;
        left: -20px;
        bottom: 16px;
    }
    .slide::after {
        content: '';
        border: 20px solid transparent;
        border-left-color: #000;
        transform: rotate(-135deg);
        position: absolute;
        left: -20px;
        top: 15px;
    }
</style>
