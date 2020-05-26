import {
    qsParse,
    qsStringify
} from '../assets/js/urlQuery';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    parseQuery: qsParse,
    stringifyQuery: qsStringify,
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../view/Dashboard.vue'),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/user',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/user/index.vue'),
                    meta: {
                        title: '用户管理'
                    }
                },
                {
                    path: '/role',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/role/index.vue'),
                    meta: {
                        title: '角色管理'
                    }
                },
                {
                    path: '/hook',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/hook/index.vue'),
                    meta: {
                        title: '接口管理'
                    }
                },
                {
                    path: '/menu',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/menu/index.vue'),
                    meta: {
                        title: '菜单管理'
                    }
                },
                {
                    path: '/about',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/about/index.vue'),
                    meta: {
                        title: '关于作者'
                    }
                },
                {
                    path: '/wxuser',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/wxuser/index.vue'),
                    meta: {
                        title: '小程序用户'
                    }
                },
                {
                    path: '/audit',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/audit/index.vue'),
                    meta: {
                        title: '作品审核'
                    }
                },
                {
                    path: '/banner',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/banner/index.vue'),
                    meta: {
                        title: '轮播图'
                    }
                },
                {
                    path: '/classify',
                    component: () =>
                        import ( /* webpackChunkName: "admin" */ '../view/classify/index.vue'),
                    meta: {
                        title: '帖子分类'
                    }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../view/common/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../view/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});