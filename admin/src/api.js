const api = {
    /*
    * 后台登录
    * */
    "login": "admin/login", // 登录
    "signout": "admin/signout", // 退出登录
    "get_user_menu": "admin/get_user_menu", // 获取菜单
    "del_redis": "/admin/del_redis", // redis清除
    /*
    * 用户权限模块
    * */
    "get_user": "/admin/get_user", // 获取用户列表
    "add_user": "/admin/add_user", // 增加用户
    "edit_user": "/admin/edit_user", // 修改用户
    "del_user": "/admin/del_user", // 删除用户

    "get_menu": "/admin/get_menu", // 获取菜单列表
    "add_menu": "/admin/add_menu", // 增加菜单
    "edit_menu": "/admin/edit_menu", // 修改菜单
    "del_menu": "/admin/del_menu", // 删除菜单

    "get_hook": "/admin/get_hook", // 分页获取钩子,
    "get_hook_list": "/admin/get_hook_list", // 获取所有钩子,
    "add_hook": "/admin/add_hook", // 增加钩子
    "edit_hook": "/admin/edit_hook", // 修改钩子
    "del_hook": "/admin/del_hook", // 删除钩子

    "get_group": "/admin/get_group", // 获取角色
    "add_group": "/admin/add_group", // 增加角色
    "edit_group": "/admin/edit_group", // 修改角色
    "del_group": "/admin/del_group", // 删除角色
    /*
     * 微信模块
    * */
    "get_wx_user": "/admin/get_wx_user", // 获取用户列表
    "edit_wx_user": "/admin/edit_wx_user", // 修改用户
    "del_wx_user": "/admin/del_wx_user", // 删除用户
    "get_wx_post": "/admin/get_post", // 获取帖子列表
    "edit_wx_post": "/admin/edit_post", // 审核

    "get_qiniu_config": "/qiniu/get_config", // 获取七牛云上传配置
    "get_banner": "/banner/get_banner", // 获取轮播
    "edit_banner": "/banner/edit_banner", // 设置轮播
    "get_classify": "/classify/get_classify", // 获取分类
    "edit_classify": "/classify/edit_classify", // 修改分类
    "add_classify": "/classify/add_classify", // 增加分类
    "del_classify": "/classify/del_classify", // 删除分类
}

export default api
