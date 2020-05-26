<template>
	<view>
		<view class='name ui-cell ui-cell-cl'>
			<image :src="userinfo.avatar" @click="selectimg"></image>
			<view>点击更换头像</view>
		</view>
		<form @submit="formSubmit">
			<view class='title ui-cell'>
				<text class='titletext'>昵称</text>
				<input type='text' placeholder-class='placeholder' :value='userinfo.name' name='name'></input>
			</view>
			<view class='title ui-cell'>
				<text class='titletext'>签名</text>
				<input type='text' placeholder-class='placeholder' name='signature' :value='userinfo.signature'></input>
			</view>
			<!-- 选择性别 -->
			<view class='ui-cell  title picker_class ui-cell-sb'>
				<view class='ui-cell'>
					<text class='titletext'>性别</text>
					<picker style="width: 400rpx;" @change="sex_fn" :value='userinfo.gender' :range="sex" name='gender'>
						{{sex[index]}}
					</picker>
				</view>
				<image src='../../static/image/15.png'></image>
			</view>
			<!-- 选择生日 -->
			<view class='ui-cell  title picker_class ui-cell-sb'>
				<view class='ui-cell'>
					<text class='titletext'>生日</text>
					<picker mode="date" :value='userinfo.birthday' :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{userinfo.birthday}}</view>
					</picker>
				</view>
				<image src='../../static/image/15.png'></image>
			</view>
			<!-- 点击选择省市区 -->
			<view class='ui-cell  title picker_class ui-cell-sb'>
				<view class='ui-cell'>
					<text class='titletext'>地区</text>
					<pick-regions style="width: 400rpx;" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
						<h2>{{userinfo.area}}</h2>
					</pick-regions>
				</view>
				<image src='../../static/image/15.png'></image>
			</view>
			<button class='btn' formType="submit">确 认</button>
		</form>
	</view>
</template>

<script>
	import qiniuUploader from '../../common/qiniuUploader.js'
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				sex: ['女', '男'],
				userinfo: this.$util.getItem('user_info'),
				area: [],
				index: '1', //性别索引
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
			}
		},
		onLoad: function(options) {
			this.initQiniu()
		},
		methods: {
			initQiniu() {
				this.$http.get('wxapi/get_config', {}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							var options = {
								region: data.region,
								uptoken: data.upToken,
								domain: data.domain,
								shouldUseQiniuFileName: data.shouldUseQiniuFileName,
							};
							qiniuUploader.init(options);
						}, err => {

						}
					)
				})
			},
			selectimg() {
				var _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: function(res) {
						let tempFilePaths = res.tempFilePaths[0]
						_this.didPressChooesImage(tempFilePaths)
					}
				})
			},
			didPressChooesImage(filePath) {
				var _this = this;
				qiniuUploader.upload(filePath, (res) => {
						_this.userinfo.avatar = res.imageURL
					}, (error) => {
						console.error('error: ' + JSON.stringify(error));
					},
					null,
					(progress) => {

					}, (cancelTask) => {

					}
				);
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.userinfo.area = region[0].name + '-' + region[1].name + '-' + region[2].name
			},
			bindDateChange: function(e) {
				this.userinfo.birthday = e.target.value
			},
			// 选择性别
			sex_fn(e) {
				this.index = e.detail.value
			},
			// 选择城市
			bindRegionChange(e) {
				this.region = e.detail.value
			},
			// 表单提交
			formSubmit: function(e) {
				let info = e.detail.value
				let data={
					birthday:this.userinfo.birthday,
					area:this.userinfo.area,
					signature:info.signature,
					gender:this.index,
					name:info.name,
					avatar:this.userinfo.avatar
				}
				this.$http.post('wxapi/set_userinfo', data).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.userinfo.gender=data.gender
							this.userinfo.name=data.name
							this.$util.setItem('user_info',this.userinfo)
							this.$util.tip('修改成功')
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},2000)
						}, err => {

						}
					)
				})
			},

		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.name>image {
		height: 120rpx;
		width: 120rpx;
		border-radius: 60rpx;
		text-align: center;
	}

	.name>view {
		font-size: 30rpx;
		line-height: 70rpx;
		color: rgba(112, 112, 112, 1);
	}

	.title {
		margin: 0 32rpx;
		font-size: 28rpx;
		color: rgba(102, 102, 102, 1);
		border-bottom: 1rpx solid #e4e4e4;
		line-height: 56rpx;
		margin-bottom: 30rpx;
		padding-bottom: 5rpx;
		position: relative;
	}

	.titletext {
		font-size: 28rpx;
		line-height: 56rpx;
		margin-right: 40rpx;
		color: rgba(102, 102, 102, 1);
	}

	input {
		width: 80%;
	}

	.placeholder {
		font-size: 26rpx;
		color: #999;
	}

	.clear {
		color: #7598ce;
		font-size: 19rpx;
		position: absolute;
		top: 260rpx;
		right: 32rpx;
	}

	.picker_class {
		/* border-bottom: 0rpx solid rgba(153, 153, 153, 0.5); */
	}


	.picker_class image {
		width: 14rpx;
		height: 26rpx;
		margin-left: 27rpx;
	}

	.btn {
		font-size: 32rpx;
		font-weight: 400;
		line-height: 70rpx;
		color: rgba(255, 255, 255, 1);
		width: 380rpx;
		height: 70rpx;
		background: rgba(117, 152, 206, 1);
		border-radius: 48rpx;
		position: fixed;
		bottom: 14rpx;
		left: 0rpx;
		right: 0rpx;
	}
</style>
