import Vue from 'vue';
import axios from 'axios';

import bkg from './asserts/bkg.jpg';
import min from './asserts/min.png';
import max from './asserts/max.png';
import close from './asserts/close.png';
import layout from './components/layout.vue';

let bus=new Vue();
Vue.prototype.$bus=bus;

let app=new Vue({
    el: '#app',
    render: h => h(layout)
});