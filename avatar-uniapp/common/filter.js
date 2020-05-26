import Vue from 'vue'
import util from './util.js'
export default (function() {
    //宠物年龄
    Vue.filter('getBirthSlot', function(time) {
        return util.getBirthSlot(time);
    });
	Vue.filter('incise', function(str) {
        return str.slice(0,10)
    });
})()