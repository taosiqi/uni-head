import qs from 'qs'
// 对跳转的url查询参数处理，统一为uniq=xxxxx形式
// 对于其他形式的url，则直接调用qs库处理
export function qsParse(query) {
    if (query.indexOf('param=') == 0) {
        // qs解析得到值
        let temp = qs.parse(query)['param']
            // url解码
        let searchBase64 = decodeURIComponent(temp)
            // base64解码
        let search = atob(searchBase64)
            // qs得到查询对象
        return qs.parse(search)
    } else {
        // 直接获取查询对象
        return qs.parse(query)
    }
}
export function qsStringify(obj) {
    let ret = qs.stringify(obj)
    if (ret) {
        ret = '?param=' + encodeURIComponent(btoa(ret))
    }
    return ret
}