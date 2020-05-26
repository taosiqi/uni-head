<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="['iconfont ',item.icon]"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index"
                                >{{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="['iconfont ',item.icon]"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../../assets/js/bus';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'iconshouye',
                        index: '/dashboard',
                        title: '系统首页'
                    }
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        beforeCreate() {
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            // this.items = this.$fun.getItem('menu');
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
            this.get_user_menu();
        },
        methods: {
            // 获取
            get_user_menu() {
                this.$http.get(this.$api.get_user_menu, {}).then(res => {
                    let data = res.data;
                    let f = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].pid === 0 || data[i].pid === 1) {
                            f.push(data[i]);
                            f[i].subs = [];
                        } else {
                            for (let j = 0; j < f.length; j++) {
                                if (data[i].pid === f[j].id) {
                                    f[j].subs.push(data[i]);
                                }
                            }
                        }
                    }
                    for (let i = 0; i < f.length; i++) {
                        if (f[i].subs.length > 0) {
                            f[i].index = 'sub_' + i;
                        } else {
                            delete f[i].subs;
                        }

                    }
                    this.items.push(...f);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
