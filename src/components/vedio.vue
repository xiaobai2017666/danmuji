<template>
    <section class="index">
        <d-player class="video" :options="options" ref="video"></d-player>
    </section>
</template>

<script>
import dplayer from './dplayer.vue';
import Hls from 'hls.js';

export default {
    data() {
        return {
            options: {
                autoplay: false,
                lang: 'zh-cn',
                hotkey: true,
                preload: 'auto',
                volume: 0.8,
                video: {
                    url: ''
                },
                danmaku: {
                    bottom: '15%',
                    unlimited: true
                }
            }
        }
    },
    components: {
        'd-player': dplayer
    },
    mounted() {
        this.$bus.$on('url-change',(url,av,is,ep) => {
            const M3U8R=/[\d\D]*.m3u8$/;
            if(M3U8R.test(url)) {
                let hlsObject=new Hls();
                hlsObject.loadSource(url);
                hlsObject.attachMedia(this.$refs.video.dp.video);
            }else {
                this.$refs.video.dp.switchVideo({url: url});
            }
            this.$refs.video.dp.danmaku.reload(av,is,ep);
        })
    }
}
</script>

<style scoped>
    .index {
        margin: 50px 40px 38px;
        background: rgba(0,0,0,0.8);
        position: relative;
    }
    .video {
        width: 100%;
        height: 100%;
        outline: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
