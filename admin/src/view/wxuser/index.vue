<template>
    <div class='main'>
        <el-table :data="user_data">
            <el-table-column prop="id" label="#" fixed="left" width="70px"></el-table-column>
            <el-table-column prop="name" label="用户昵称"></el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template slot-scope="scope">
                    <img style="width: 50px;height: 50px;border-radius: 25px" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="signature" label="签名" width="180"></el-table-column>
            <el-table-column prop="area" label="地区"></el-table-column>
            <el-table-column prop="vip" label="vip">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.vip>=3?'success':'warning'">{{scope.row.vip>=3 ? '是':'否'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="birthday" label="生日">
                <template slot-scope="scope">
                    {{scope.row.birthday | formatDate}}
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间">
                <template slot-scope="scope">
                   {{scope.row.create_time  | formatDate}}
                </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.gender===0?'success':'warning'">{{scope.row.gender===0 ? '男':'女'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click="del_user(scope.row,scope.$index)" type="danger">删除</el-button>
                    <el-button icon="el-icon-edit" @click="edit_info=JSON.parse(JSON.stringify(scope.row)),edit_dialog=true" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="float: right;margin-top: 20px" @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total" :page-size="size" :current-page="page"></el-pagination>
        <el-dialog title="提示" :visible.sync="edit_dialog" width="30%">
            <el-form label-width="100px" ref="edit_info" :model="edit_info">
                <el-form-item label="会员" prop="vip" :rules="[{required:true,message:'会员不能为空',trigger: 'blur' }]">
                    <el-input placeholder="大于或等于3小程序显示为会员" v-model="edit_info.vip" type="number"></el-input>
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
        name: 'wx_user',
        data() {
            return {
                edit_dialog: false,
                user_data: [],
                edit_info: {},
                size: 12,  //每页显示条目个数
                total: 0,//总条目数
                page: 1
            };
        },
        created() {
            this.get_user();
        },
        methods: {
            // 删除
            del_user(row, index) {
                let _this = this;
                _this.$http.post(this.$api.del_wx_user, { id: row.id }).then(function(res) {
                    _this.$message.success('删除成功');
                    _this.user_data.splice(index, 1);
                });
            },
            // 修改
            submitForm: function(e) {
                let _this = this;
                // 验证表单
                _this.$refs[e].validate(function(res) {
                    if (res) {
                        _this.$http.post(_this.$api.edit_wx_user, _this.edit_info).then(function(res) {
                            _this.$message.success('成功');
                            _this.edit_dialog=false
                            for (let i = 0; i < _this.user_data.length; i++) {
                                if(_this.user_data[i].id===_this.edit_info.id){
                                    _this.user_data[i].vip=_this.edit_info.vip
                                }
                            }
                        });
                    }
                });
            },
            // 获取
            get_user() {
                this.$http.get(this.$api.get_wx_user, {
                    size: this.size,
                    page: this.page
                }).then(res => {
                    this.user_data = res.data.list;
                    this.total = res.data.total;
                })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 分页改变
            current_change: function(e) {
                this.page = e;
                this.get_user();
            }
        }
    };
</script>

<style scoped>
    .add {
        margin: 10px;
    }
</style>
