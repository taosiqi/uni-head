import Vue from 'vue'
import App from './App'
import http from './common/http.js'
import util from './common/util.js'
import filter from './common/filter.js'
Vue.prototype.$http=http;
Vue.prototype.$util=util;
Vue.prototype.$url = 'http://127.0.0.1:7001/';   //后端接口

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	filters: filter,
    ...App
})
app.$mount()
