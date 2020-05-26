import Vue from 'vue'
import fn from './fun'
import moment from 'moment'
export default (function() {
    //年龄计算
    Vue.filter('getBirthSlot', function(time) {
        return fn.getBirthSlot(time);
    });
    Vue.filter('formatDate', function(data) {
        return moment(data).format('YYYY-MM-DD HH:mm:ss'); //2014-09-24 23:36:09
    });
    Vue.filter('formatJson', function(jsonstring) {
        return JSON.parse(jsonstring)
    });
})()
