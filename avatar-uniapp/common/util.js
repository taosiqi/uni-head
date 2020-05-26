// 格式化时间
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 时分
const hour = date => {
	const hour = date.getHours()
	const minute = date.getMinutes()
	return [hour, minute].map(formatNumber).join(':')
}
// 年月日
const year = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
// 提示
const tip = (title) => {
	uni.showToast({
		title: title,
		icon: "none",
		duration: 2000
	});
}

// 去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
const Trim = (str, is_global = 'g') => {
	let result = str.replace(/(^\s+)|(\s+$)/g, "");
	if (is_global == 'g') {
		result = result.replace(/\s/g, "");
	}
	return result;
}

//在js中if条件为null/undefined/0/NaN/""表达式时，统统被解释为false,此外均为true .
//为空判断函数
const isNull = (arg1) => {
	return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
}
// 生成uuid
const guid = () => {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const getItem = (key) => {
	let local = uni.getStorageSync(key)
	if (local) {
		return JSON.parse(local);
	}
	return '';
}
const setItem = (key, obj) => {
	uni.setStorageSync(key, JSON.stringify(obj));
}

const removeItem = (key) => {
	uni.removeStorageSync(key);
}
//根据日期计算宠物年龄 返回岁月天
const getBirthSlot = (date) => {
	let birthDay = new Date(date)
	let nowDate = new Date()
	let date1 = Date.parse(birthDay)
	let date2 = Date.parse(nowDate)
	let day = Math.ceil((date2 - date1) / (60 * 60 * 1000 * 24))
	let age = ''
	let year = Math.floor(day / 365)
	let y = day % 365
	let month = Math.floor(y / 30)
	let d = Math.floor(day % 365 % 30)
	age += year + '岁' + month + '月' + d + '天'
	return age
}
module.exports = {
	formatTime: formatTime,
	hour: hour,
	year: year,
	tip: tip,
	isNull: isNull,
	Trim: Trim,
	guid: guid,
	getItem: getItem,
	setItem: setItem,
	removeItem: removeItem,
	getBirthSlot:getBirthSlot
}
