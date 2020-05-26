<template>
    <div class='main'>
        <el-button class="add" type="primary" icon="el-icon-plus" @click="edit_dialog=true,edit_info={},add=true">添加</el-button>
        <el-table :data="user_data" style="width: 700px">
            <el-table-column prop="id" label="#" fixed="left" width="150px"></el-table-column>
            <el-table-column prop="name" label="用户名" width="150px"></el-table-column>
            <el-table-column prop="group_name" label="用户组"></el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click="del_user(scope.row,scope.$index)" type="danger">删除</el-button>
                    <el-button icon="el-icon-edit" @click="edit_info=JSON.parse(JSON.stringify(scope.row)),edit_dialog=true,add=false" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="edit_dialog" width="30%">
            <el-form label-width="100px" ref="info" :model="edit_info">
                <el-form-item label="用户名" prop="name" :rules="[{required:true,message:'用户名不能为空',trigger: 'blur' }]">
                    <el-input placeholder="请输入内容" v-model="edit_info.name"></el-input>
                </el-form-item>
                <el-form-item v-if="add" label="密码" prop="password" :rules="[{required:true,message:'密码不能为空',trigger: 'blur' }]">
                    <el-input placeholder="请输入内容" v-model="edit_info.password"></el-input>
                </el-form-item>
                <el-form-item v-else label="密码" prop="password">
                    <el-input placeholder="不修改则不填" v-model="edit_info.password"></el-input>
                </el-form-item>
                <el-form-item label="角色" class="width_auto" prop="group_id"  :rules="[{required:true,message:'用户组不能为空',trigger: 'blur' }]">
                    <el-select v-model="edit_info.group_id" placeholder="请选择">
                        <el-option v-for="item in group_data" :key="item.value" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('info')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import md5 from 'md5';
    import sha1 from 'sha1';
    export default {
        name: 'user_index',
        data() {
            return {
                edit_info: {},  //修改的数据
                edit_dialog: false, //弹窗
                add: true,
                user_data: [],  //用户数据
                group_data: [],//用户组
            };
        },
        created() {
            this.get_user();
            this.get_group();

        },
        methods: {
            submitForm: function(e) {
                let _this = this;
                // 验证表单
                this.$refs[e].validate(function(res) {
                    if (res) {
                        //  判断是Add 或者 Edit
                        _this.edit_info.password=_this.edit_info.password  ?  md5(sha1(_this.edit_info.password)) : ''
                        let url = _this.$api.edit_user;
                        if (_this.add) {
                            url = _this.$api.add_user;
                        }
                        _this.$http.post(url, _this.edit_info).then(function(res) {
                            _this.$message.success('成功');
                            _this.edit_dialog = false;
                            _this.get_user();
                        });
                    }
                });
            },
            get_user: function() {
                let _this = this;
                _this.$http.get(_this.$api.get_user, {}).then(function(res) {
                    _this.user_data = res.data;
                });
            },
            // 获取用户组
            get_group() {
                this.$http.get(this.$api.get_group, {})
                    .then(res => {
                        this.group_data = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 删除
            del_user(row, index) {
                let _this = this;
                _this.$http.post(this.$api.del_user, { user_id: row.id }).then(function(res) {
                    _this.$message.success('删除成功');
                    _this.user_data.splice(index, 1);
                });
            }
        }
    };
</script>

<style scoped>
    .add {
        margin: 10px;
    }
</style>


