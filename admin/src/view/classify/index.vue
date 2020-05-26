<template>
    <div class='main'>
        <div class="add">
            <el-button type="primary" icon="el-icon-plus" @click="add_dialog">添加</el-button>
        </div>
        <el-table :data="class_data">
            <el-table-column prop="name" label="分类名"></el-table-column>
            <el-table-column prop="url" label="分类图"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.url" :preview-src-list="[scope.row.url]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" @click="edit_dialog_fn(scope.row,scope.$index)" type="primary">修改</el-button>
                    <el-button icon="el-icon-edit" @click="del_classify(scope.row,scope.$index)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="edit_dialog" width="60%">
            <el-form label-width="100px" ref="edit_info" :model="edit_info">
                <el-form-item label="分类名" prop="name" :rules="[{required:true,message:'分类名不能为空',trigger: 'blur' }]">
                    <el-input placeholder="请输入内容" v-model="edit_info.name"></el-input>
                </el-form-item>
                <el-form-item label="分类图" prop="url">
                    <el-upload class="avatar-uploader" action="https://upload-z2.qiniup.com" :data="qiniuConfig" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="classify">
                    </el-upload>
                </el-form-item>
                <el-button type="primary" @click="submitForm('edit_info')" style="">提交</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'classify',
        data() {
            return {
                add: true,
                edit_dialog: false,
                class_data: [],
                edit_info: {},
                qiniuConfig: {
                    token: ''
                },
                imageUrl: ''
            };
        },
        created() {
            this.get_wx_classify();
            this.get_qiniu_config();
        },
        methods: {
            edit_dialog_fn(row, index) {
                this.edit_info = JSON.parse(JSON.stringify(row));
                this.edit_dialog = true;
                this.add = false;
                this.imageUrl = this.edit_info.url;
            },

            add_dialog() {
                this.edit_dialog = true;
                this.edit_info = {};
                this.add = true;
                this.imageUrl = '';
            },
            handleAvatarSuccess(res, file) {
                this.edit_info.url = this.qiniuConfig.domain + res.key;
                this.imageUrl = this.qiniuConfig.domain + res.key;
            },
            // 删除
            del_classify(row, index) {
                let _this = this;
                _this.$http.post(this.$api.del_classify, { classify_id: row.id }).then(function(res) {
                    _this.$message.success('删除成功');
                    _this.class_data.splice(index, 1);
                });
            },
            // 审核
            submitForm: function(e) {
                let _this = this;
                // 验证表单
                _this.$refs[e].validate(function(res) {
                    if (res) {
                        //  判断是Add 或者 Edit
                        let url = _this.$api.edit_classify;
                        if (_this.add) {
                            url = _this.$api.add_classify;
                        }
                        _this.$http.post(url, _this.edit_info).then(function(res) {
                            _this.$message.success('成功');
                           _this.get_wx_classify()
                        });
                    }
                });
            },
            // 获取
            get_wx_classify() {
                this.$http.get(this.$api.get_classify, {}).then(res => {
                    this.class_data = res.data;
                }).catch(err => {
                    console.log(err);
                });
            },
            // 获取q七牛上传配置
            get_qiniu_config() {
                this.$http
                    .get(this.$api.get_qiniu_config, {})
                    .then(res => {
                        this.qiniuConfig.token = res.data.upToken;
                        this.qiniuConfig.domain = res.data.domain;
                    })
                    .catch(err => {
                        console.log(err);
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
<style>
    .classify {
        height: 200px !important;
        width: 200px !important;
    }
</style>
