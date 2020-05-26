<template>
    <div class='main'>
        <div class="add">
            <el-button type="primary" icon="el-icon-plus" @click="edit_dialog=true,edit_info={},add=true">添加</el-button>
        </div>
        <el-table :data="hook_data">
            <el-table-column prop="id" label="#" fixed="left" width="70px"></el-table-column>
            <el-table-column prop="name" label="接口名"></el-table-column>
            <el-table-column prop="controller_action" label="控制器"></el-table-column>
            <el-table-column prop="apis" label="接口路径"></el-table-column>
            <el-table-column prop="content" label="描述">
                <template slot-scope="scope">
                    <el-tag type="info">{{scope.row.content}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click="del_hook(scope.row,scope.$index)" type="danger">删除</el-button>
                    <el-button icon="el-icon-edit" @click="edit_info=JSON.parse(JSON.stringify(scope.row)),edit_dialog=true,add=false" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="float: right;margin-top: 20px" @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total" :page-size="size" :current-page="page"></el-pagination>
        <el-dialog title="提示" :visible.sync="edit_dialog" width="30%">
            <el-form label-width="100px" ref="edit_info" :model="edit_info">
                <el-form-item label="接口名" prop="name" :rules="[{required:true,message:'接口名不能为空',trigger: 'blur' }]">
                    <el-input placeholder="请输入内容" v-model="edit_info.name"></el-input>
                </el-form-item>
                <el-form-item label="控制器" prop="controller_action" :rules="[{required:true,message:'控制器不能为空',trigger: 'blur' }]">
                    <el-input placeholder="edit_info.controller_action" v-model="edit_info.controller_action"></el-input>
                </el-form-item>
                <el-form-item label="接口" prop="apis" :rules="[{required:true,message:'接口不能为空',trigger: 'blur' }]">
                    <el-input placeholder="/admin/get_group" v-model="edit_info.apis"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="content" :rules="[{required:true,message:'描述不能为空',trigger: 'blur' }]">
                    <el-input type="textarea" placeholder="请输入内容" maxlength="30" show-word-limit v-model="edit_info.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('edit_info')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'hook_index',
        data() {
            return {
                edit_dialog: false,
                hook_data: [],
                edit_info: {},
                add: true,
                size: 12,  //每页显示条目个数
                total: 0,//总条目数
                page: 1
            };
        },
        created() {
            this.get_hook();
        },
        methods: {
            // 删除
            del_hook(row, index) {
                let _this = this;
                _this.$http.post(this.$api.del_hook, { hook_id: row.id }).then(function(res) {
                    _this.$message.success('删除成功');
                    _this.hook_data.splice(index, 1);
                });
            },
            // 添加
            submitForm: function(e) {
                let _this = this;
                // 验证表单
                _this.$refs[e].validate(function(res) {
                    if (res) {
                        //  判断是Add 或者 Edit
                        let url = _this.$api.edit_hook;
                        if (_this.add) {
                            url = _this.$api.add_hook;
                        }
                        _this.$http.post(url, _this.edit_info).then(function(res) {
                            _this.$message.success('成功');
                            _this.edit_dialog=false
                            _this.get_hook();
                        });
                    }
                });
            },
            // 获取
            get_hook() {
                this.$http.get(this.$api.get_hook, {
                    size: this.size,
                    page: this.page
                }).then(res => {
                        this.hook_data = res.data.list;
                        this.total = res.data.total;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 分页改变
            current_change: function(e) {
                this.page = e;
                this.get_hook();
            }
        }
    };
</script>

<style scoped>
    .add {
        margin: 10px;
    }
</style>
