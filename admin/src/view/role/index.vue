<template>
    <div class='main'>
        <el-button type="primary" icon="el-icon-plus" @click="add_fn()">添加</el-button>
        <el-table :data="group_data">
            <el-table-column prop="name" label="角色名"></el-table-column>
            <el-table-column prop="content" label="描述"></el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click="del_group(scope.row,scope.$index)" type="danger">删除</el-button>
                    <el-button icon="el-icon-edit" @click="edit(scope.row)" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="edit_dialog" :destroy-on-close="true">
            <el-form label-width="100px" ref="info" :model="edit_info">
                <el-form-item label="角色名" prop="name" :rules="[{required:true,message:'角色名不能为空',trigger: 'blur' }]">
                    <el-input placeholder="请输入内容" v-model="edit_info.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="content" :rules="[{required:true,message:'描述不能为空',trigger: 'blur' }]">
                    <el-input type="textarea" placeholder="请输入内容" maxlength="30" show-word-limit v-model="edit_info.content"></el-input>
                </el-form-item>
                <el-form-item class="width_auto">
                    <el-divider content-position="left">菜单</el-divider>
                </el-form-item>
                <el-form-item class="width_auto" >
                    <el-tree ref="tree" v-if="edit_dialog"  :data="menu_data" show-checkbox node-key="id" :props="defaultProps">
                    </el-tree>
                </el-form-item>
                <el-form-item class="width_auto">
                    <el-divider content-position="left">接口权限</el-divider>
                </el-form-item>
                <el-form-item class="width_auto">
                    <div class="width_auto ui-cell ui-wrap">
                        <div class=" div_apis" v-for="(v,k) in hook_data" :key="k">
                            <el-checkbox v-model="hooks" :label="v.id" border style="margin-right: 20px">{{v.name}}</el-checkbox>
                            <el-tag type="info" style="margin-right: 20px">{{v.apis}}</el-tag>
                            <el-tag type="info" style="margin-right: 30px">{{v.content}}</el-tag>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('info')">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'index.vue',
        data() {
            return {
                edit_dialog: false,
                group_data: [],  //用户数据
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                edit_info: {},  //数据
                hook_data: [],  //接口数据
                menu_data: [],  //菜单数据
                sub_menu_data:[],  //原始的菜单数据
                hooks: [],
                menus: []
            };
        },
        components: {},
        created() {
            this.get_group();
            this.get_hook();
            this.get_menu();
        },
        methods: {
            // 获取分组
            get_group() {
                this.$http.get(this.$api.get_group, {})
                    .then(res => {
                        this.group_data = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 重置
            resetForm() {
                this.edit_info.name = '';
                this.edit_info.content = '';
                this.hooks = [];
                this.menus = [];
            },
            // 提交
            submitForm: function(e) {
                let _this = this;
                // 验证表单
                this.$refs[e].validate(function(res) {
                    if (res) {
                        //  判断是Add 或者 Edit
                        let url = _this.$api.edit_group;
                        if (_this.add) {
                            url = _this.$api.add_group;
                        }
                        _this.menus = _this.$refs.tree.getCheckedKeys().concat(_this.$refs.tree.getHalfCheckedKeys());
                        _this.edit_info.hook_id = _this.hooks.toString();
                        _this.edit_info.menu_id = _this.menus.toString();
                        _this.$http.post(url, _this.edit_info).then(function(res) {
                            _this.$message.success('编辑成功');
                            _this.edit_dialog = false;
                            _this.get_group();
                        });
                    }
                });
            },
            // 获取所有接口
            get_hook() {
                let _this = this;
                _this.$http.get(this.$api.get_hook_list).then(function(res) {
                    _this.hook_data = res.data;
                });
            },
            // 获取菜单
            get_menu() {
                let _this = this;
                _this.$http.get(this.$api.get_menu).then(function(res) {
                    let data = res.data;
                    _this.sub_menu_data=_this.$_.cloneDeep(data)
                    let arr = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].pid === 0 || data[i].pid === 1) {
                            arr.push(data[i]);
                            arr[i].children = [];
                        } else {
                            for (let j = 0; j < arr.length; j++) {
                                if (data[i].pid === arr[j].id) {
                                    arr[j].children.push(data[i]);
                                }
                            }
                        }
                    }
                    _this.menu_data = arr;
                });
            },
            edit(row) {
                this.edit_dialog = true;
                this.add = false;
                this.edit_info = JSON.parse(JSON.stringify(row));
                let menus = [];
                let hooks = this.edit_info.hook_id === '' ? [] : this.edit_info.hook_id.split(',');
                if(this.edit_info.menu_id !== ''){
                    let sub_id=[]    //要把父级id去掉
                    menus=this.edit_info.menu_id.split(',')
                    for (let i = 0; i <this.sub_menu_data.length ; i++) {
                        if(this.sub_menu_data[i].pid!==0){
                            sub_id.push(this.sub_menu_data[i].id)
                        }
                    }
                    console.log(sub_id)  //去掉了父级的菜单
                    for (let i = 0; i <menus.length ; i++) {
                        menus[i]=parseInt(menus[i])
                    }
                    console.log(menus)  //去掉了父级的菜单
                    menus=this.$_.intersection(menus, sub_id);  //loader方法 取交集
                    console.log(menus)  //去掉了父级的菜单

                    this.$nextTick(() => {
                        this.$refs.tree.setCheckedKeys(menus);  //关键一步  解决树组件不更新
                    });
                }
                // 权限
                for (let i = 0; i <hooks.length ; i++) {
                    hooks[i]=parseInt(hooks[i])
                }
                this.$nextTick(() => {
                    this.menus=menus;
                    this.hooks=hooks;
                })
            },
            add_fn() {
                this.edit_dialog = true;
                this.edit_info = {};
                this.hooks = [];
                this.menus = [];
                this.add = true;
            },
            // 删除
            del_group(row, index) {
                let _this = this;
                if (row.id === 1) {
                    return _this.$message.error('超级管理员不能删除');
                }
                _this.$http.post(this.$api.del_group, { group_id: row.id }).then(function(res) {
                    _this.$message.success('删除成功');
                    _this.group_data.splice(index, 1);
                });
            }
        }
    };
</script>

<style scoped>
    .el-tree {
        background-color: #efefef;
    }

    .div_apis {
        height: 50px;
    }

    .width_auto view {
        display: flex;
    }
</style>
