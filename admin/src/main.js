import Vue from 'vue';
import App from './App.vue';
import router from './router';
import filter from './assets/js/filter' //全局过滤器
import i18n from './assets/js/i18n' //多语言
import cookies from 'vue-cookie' //多语言
import store from './store';
import http from './assets/js/request'; //请求封装
import api from './api'; //请求封装
import fun from './assets/js/fun'; //公共方法
import _ from 'lodash'; //lodash
import 'babel-polyfill'; //es6转es5
import './assets/js/element' // elemnt组件



Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$store = store;
Vue.prototype.$fun = fun;
Vue.prototype.$api = api;
Vue.prototype.$_ = _;
router.beforeEach((to, from, next) => {
    let allow = ['/login'];
    let userInfo = sessionStorage.getItem('userinfo');
    let token = sessionStorage.getItem('token');
    if (userInfo && token) { //如果有就直接到首页咯
        next();
    } else {
        let find = allow.indexOf(to.path)
        if (find != -1) {
            next();
        } else {
            next('/login');
        }
    }
})
new Vue({
    router,
    filter,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
