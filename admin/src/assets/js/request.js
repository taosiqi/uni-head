import axios from 'axios';
import cookies from 'vue-cookie';
import qs from 'qs';
import fun from './fun';
import { Message } from 'element-ui';
import router from '../../router';
//响应时间
axios.defaults.timeout = 5000;

//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//开发环境下 axios的默认url是/api，，生成环境下是.env.production 里面配置的域名
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API;

//POST传参序列化(添加请求拦截器)在发送请求之前做某件事
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token') || '';
        config.headers['authorization'] = token ? `Bearer ${token}` : '';
        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        Message.error({
            message: '请求超时'
        });
        return Promise.reject(error);
    }
);
//返回状态判断(添加响应拦截器)对响应数据做些事
axios.interceptors.response.use(
    res => {
        if (!fun.isEmpty(res.headers.authorization)) {
            let token = res.headers.authorization;
            sessionStorage.setItem('token', token);
        }
        switch (res.data.code) {
            case 401:  // 未登录
                Message.error({ message: res.data.msg });
                router.push('/login');
                return Promise.reject(res.data.msg);
            case 400:// 失败
                Message.error({ message: res.data.msg });
                return Promise.reject(res.data.msg);
            case 402:// 权限不足
                Message.error({ message: res.data.msg });
                return Promise.reject(res.data.msg);
        }
        return Promise.resolve(res.data);
    },
    error => {
        return Promise.reject(error);
    }
);

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(
                response => {
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            )
            .catch(error => {
                reject(error);
            });
    });
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: param
            })
            .then(
                response => {
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            )
            .catch(error => {
                reject(error);
            });
    });
}

export default {
    post: fetchPost,
    get: fetchGet
};
