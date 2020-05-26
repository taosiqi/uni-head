<template>
    <div class='main'>
            <el-select v-model="audit" placeholder="请选择" style="margin: 10px" @change="changAudit()">
                <el-option  key="1"  label="审核中" :value="1"> </el-option>
                <el-option   key="2" label="通过" :value="2"> </el-option>
                <el-option   key="3" label="失败" :value="3"> </el-option>
            </el-select>
        <el-table :data="post_data">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="Introduction" label="简介"></el-table-column>
            <el-table-column  label="图片">
                <template slot-scope="scope">
                    <el-image style="width: 50px; height: 50px" :src="scope.row.first_url" :preview-src-list="scope.row.url | formatJson">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="发布时间">
                <template slot-scope="scope">
                    {{scope.row.release_time  | formatDate}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" @click="edit_info=JSON.parse(JSON.stringify(scope.row)),edit_dialog=true" type="primary">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="float: right;margin-top: 20px" @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total" :page-size="size" :current-page="page"></el-pagination>
        <el-dialog title="提示" :visible.sync="edit_dialog" width="30%">
            <el-form label-width="100px" ref="edit_info" :model="edit_info">
                <el-form-item label="审核"  :rules="[{required:true,message:'会员不能为空',trigger: 'blur' }]">
                    <el-radio-group v-model="edit_info.audit">
                        <el-radio label="1">审核中</el-radio>
                        <el-radio label="2">通过</el-radio>
                        <el-radio label="3">拒绝</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="拒绝理由" prop="audit_info">
                    <el-input placeholder="" v-model="edit_info.audit_info" ></el-input>
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
        name: 'audit',
        data() {
            return {
                edit_dialog: false,
                post_data: [],
                edit_info: {},
                size: 12,  //每页显示条目个数
                total: 0,//总条目数
                page: 1,
                audit:1
            };
        },
        created() {
            this.get_wx_post();
        },
        methods: {
            changAudit(){
                this.page = 1;
                this.get_wx_post()
            },
            // 审核
            submitForm: function(e) {
                let _this = this;
                // 验证表单
                _this.$refs[e].validate(function(res) {
                    if (res) {
                        _this.$http.post(_this.$api.edit_wx_post, _this.edit_info).then(function(res) {
                            _this.$message.success('成功');
                            _this.edit_dialog=false
                            for (let i = 0; i < _this.post_data.length; i++) {
                                if(_this.post_data[i].id===_this.edit_info.id){
                                    _this.post_data[i].audit=_this.edit_info.audit
                                    _this.post_data[i].audit_info=_this.edit_info.audit_info
                                }
                            }
                        });
                    }
                });
            },
            // 获取
            get_wx_post() {
                this.$http.get(this.$api.get_wx_post, {
                    size: this.size,
                    page: this.page,
                    audit:this.audit
                }).then(res => {
                    this.post_data = res.data.list;
                    this.total = res.data.total;
                })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 分页改变
            current_change: function(e) {
                this.page = e;
                this.get_wx_post();
            }
        }
    };
</script>

<style scoped>
    .add {
        margin: 10px;
    }
</style>
