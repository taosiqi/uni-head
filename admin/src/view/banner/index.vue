<template>
    <div class="main ui-cell">
        <el-upload class="ui-cell" :file-list="banner_data" action="https://upload-z2.qiniup.com" :data="qiniuConfig" :on-success="handleAvatarSuccess" list-type="picture-card" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <div class="add">
            <el-button type="primary" @click="post_wx_banner">保存</el-button>
        </div>
        <!--        <img v-for="(item,index) in banner_data " :key="index" class="el-upload&#45;&#45;picture-card avatar" :src="item">-->
    </div>
</template>

<script>
    export default {
        name: 'banner',
        data() {
            return {
                qiniuConfig: {
                    token: ''
                },
                banner_data: []
            };
        },
        created() {
            this.get_wx_banner();
            this.get_qiniu_config();
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.banner_data.push({
                    url: this.qiniuConfig.domain + res.key
                });
            },
            handleRemove(file, fileList) {
                for (let i = 0; i < this.banner_data.length; i++) {
                    if (this.banner_data[i].uid === file.uid) {
                        this.banner_data.splice(i, 1);
                    }
                }
            },
            // 获取
            get_wx_banner() {
                this.$http
                    .get(this.$api.get_banner, {})
                    .then(res => {
                        let arr = res.data.url.split(',');
                        for (let i = 0; i < arr.length; i++) {
                            this.banner_data.push({
                                url: arr[i]
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 获取
            post_wx_banner() {
                let arr = [];
                for (let i = 0; i < this.banner_data.length; i++) {
                    arr.push(this.banner_data[i].url);
                }
                this.$http
                    .post(this.$api.edit_banner, {
                        url: arr.join(',')
                    })
                    .then(res => {

                    })
                    .catch(err => {
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

    .avatar {
        margin-left: 30px;
    }
</style>
