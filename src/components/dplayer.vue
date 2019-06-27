<template>
    <div></div>
</template>

<script>
import Dplayer from '../lib/DPlayer.min.js';
import '../lib/DPlayer.min.css';

export default {
    props: {
        options: Object
    },
    mounted() {
        this.options.container = this.$el;
        const player= this.dp =new Dplayer(this.options);
    }
}
</script>

<style scoped>
    video {
        max-height: 100%;
    }
</style>
