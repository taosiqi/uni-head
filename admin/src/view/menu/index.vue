<template>
    <div class='main'>
        <el-button class="add" type="primary" icon="el-icon-plus" @click="edit_dialog=true,edit_info={},add=true">添加</el-button>
        <el-table :data="menu_data"  row-key="id" :tree-props="{children: 'children'}" style="width: 80%">
            <el-table-column prop="name" label="菜单名"></el-table-column>
            <el-table-column prop="icon" label="图标"></el-table-column>
            <el-table-column prop="url" label="url"></el-table-column>
            <el-table-column prop="is_sort" label="排序"></el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" @click="del_menu(scope.row,scope.$index)" type="danger">删除</el-button>
                    <el-button icon="el-icon-edit" @click="edit_info=JSON.parse(JSON.stringify(scope.row)),edit_dialog=true,add=false" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="edit_dialog" width="30%">
            <el-form label-width="100px" ref="edit_info" :model="edit_info">
                <el-form-item label="栏目名" prop="name" :rules="[{required:true,message:'栏目名不能为空',trigger: 'blur' }]" >
                    <el-input placeholder="请输入内容" v-model="edit_info.name"></el-input>
                </el-form-item>
                <el-form-item label="父栏目" prop="pid">
                    <el-select v-model="edit_info.pid" placeholder="请选择栏目" @change="selectChange()">
                        <el-option label="顶级栏目" :value="0"></el-option>
                        <el-option label="无子菜单栏目" :value="1"></el-option>
                        <el-option v-for="(v,k) in parent_data" :label="v.name" :key="k" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图标" prop="icon" :rules="[{required:true,message:'Icon不能为空',trigger: 'blur' }]" >
                    <el-input placeholder="请输入内容" v-model="edit_info.icon"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="url" :rules="[{required:true,message:'链接不能为空',trigger: 'blur' }]" >
                    <el-input placeholder="请输入内容" v-model="edit_info.url"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="is_sort">
                    <el-input placeholder="请输入内容" type="number" v-model="edit_info.is_sort"></el-input>
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
        name: 'menu_index',
        data() {
            return {
                menu_data: [],  //显示的数据
                edit_info: {},  //修改的数据
                edit_dialog:false, //弹窗
                parent_data:[], //父栏目
                add: true,
            };
        },
        created() {
            this.get_menu()
        },
        methods: {
            // 获取
            get_menu() {
                this.$http.get(this.$api.get_menu, {})
                    .then(res => {
                        let data=res.data;
                        this.parent_data=[]
                        let arr=[];
                        for (let i = 0; i <data.length ; i++) {
                            if(data[i].pid===0 || data[i].pid===1){
                                arr.push(data[i])
                                arr[i].children=[]
                                this.parent_data.push(data[i])
                            }else {
                                for (let j = 0; j <arr.length ; j++) {
                                    if (data[i].pid===arr[j].id){
                                        arr[j].children.push(data[i])
                                    }
                                }
                            }
                        }
                        this.menu_data = arr;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            selectChange() {
                this.$forceUpdate();
            },
            // 删除
            del_menu(row, index) {
                let _this = this;
                if(row.pid===0){
                    if(row.children.length!==0){
                        return _this.$message.error('请先删除子菜单');
                    }
                }
                _this.$http.post(this.$api.del_menu, { menu_id: row.id }).then(function(res) {
                    _this.$message.success('删除成功');
                    _this.get_menu()
                });
            },
            submitForm(e) {
                let _this = this;
                // 验证表单
                _this.$refs[e].validate(function(res) {
                    if (res) {
                        //  判断是Add 或者 Edit
                        let url = _this.$api.edit_menu;
                        if (_this.add) {
                            url = _this.$api.add_menu;
                        }
                        _this.$http.post(url, _this.edit_info).then(function(res) {
                            _this.$message.success('成功');
                            _this.edit_dialog=false
                            _this.get_menu();
                        });
                    }
                });
            },
        }
    };
</script>

<style scoped>
    .add {
        margin: 10px;
    }
</style>
