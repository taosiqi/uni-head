const commonFn = {
  //根据日期计算宠物年龄 返回岁月天
  getBirthSlot(date) {
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
  },



  // 获取session
  getItem(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  // 设置session
  setItem(key, obj) {
    sessionStorage.setItem(key, JSON.stringify(obj))
  },
  // 删除session
  removeItem(key) {
    sessionStorage.removeItem(key)
  },
  // 判断string是不是为空
  isEmpty(str) {
    return str === '' || str === null || str === undefined;
  },
  // 判断json空对象
  isJsonEmpty(data) {
    return JSON.stringify(data) === "{}";
  },
}

export default commonFn
