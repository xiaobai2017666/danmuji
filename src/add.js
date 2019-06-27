import Vue from 'vue';

import min from './asserts/min.png';
import max from './asserts/max.png';
import close from './asserts/close.png';
import add from './components/add.vue';

let app=new Vue({
    el: '#app',
    render: h => h(add)
});