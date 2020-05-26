const util = require('./util.js')
import Vue from 'vue'
const getUrl = uri => {
	return Vue.prototype.$url+ uri;
}
const request = (url, options) => {
	return new Promise((resolve, reject) => {
		let _this = this
		uni.request({
			url: getUrl(url),
			method: options.method,
			data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
			header: {
				'Authorization': uni.getStorageSync('token') ? 'Bearer '+uni.getStorageSync('token') : '',
			},
			success(request) {
				resolve(request.data)
			},
			fail(error) {
				reject(util.tip("系统错误，请稍后再试"))
			}
		})
	})
}
const get = (url, options = {}) => {
	return request(url, {
		method: 'GET',
		data: options
	})
}

const post = (url, options) => {
	return request(url, {
		method: 'POST',
		data: options
	})
}

//直接过滤返回res.data 这里回去调handleError判断其他异常
const handelResponse = (res, cb, errCb) => {
	if (res.code == 200) {
		return cb(res.data)
	} else {
		if (typeof errCb == 'function') {
			errCb()
			switch (res.code) {
				case 401:
					util.tip(res.msg)
					uni.reLaunch({
						url:'/pages/login/login'
					})
					break
				default:
					util.tip(res.msg)
			}
		}
		return res.data
	}
}

// api.get('index/index/index', {
//        type: this.data.type,
//        size: this.data.size,
//        page: this.data.page,
//      }).then(res => {
//        api.handelResponse(
//          res,
//          data => {
//            let newarr = data
//            newarr = this.data.list.concat(data);
//            this.setData({
//              list: newarr,
//              isLoad: true
//            })
//          }
//        )
//      })
module.exports = {
	get,
	post,
	handelResponse
}
