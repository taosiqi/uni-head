<template>
	<view>
		<!-- 标题 -->
		<form @submit="formSubmit">
			<view class='title ui-cell'>
				<text>标题：</text>
				<input type='text' placeholder-class='placeholder' placeholder='请输入16字以内的标题...' name='title'></input>
			</view>
			<view class='title ui-cell'>
				<text>简介：</text>
				<input type='text' placeholder-class='placeholder' placeholder='请输入150字以内的简介...' name='introduction'></input>
			</view>
			<view class='title_s'>选择头像</view>
			<!-- 图片列表 -->

			<view class='list'>
				<image v-for="(item,idx) in imgArr" :key="idx" :src="item+'?imageView2/5/w/200/h/200/interlace/1/q/50|imageslim'" @click="delpic(idx)"></image>
				<image v-if="imgArr.length<9" src='/static/image/41.png' @click='selectimg'></image>
			</view>
			<view class="cu-form-group">
				<view class="title titles">发布栏目</view>
				<picker @change="classify_fn" :value="classifyidx" :range="classify" range-key="name" name='classify'>
					<view class="picker">
						{{classify[classifyidx].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title titles">发布方式</view>
				<picker @change="picker_fn" :value="index" :range="picker" name='picker'>
					<view class="picker">
						{{picker[index]}}
					</view>
				</picker>
			</view>
			<!-- 规则 -->
			<view class='title_s'>发布规则</view>
			<view class='tip'>
				<view>* tip:必看 个人空间长按可以更改发布方式</view>
				<view>1.不要发布不清晰、色情、暴力、带有广告的头像。</view>
				<view>2.未审核通过发布者不可见。</view>
				<view>3.每次发布头像最少1张，至多9张，否则无法通过审核。</view>
				<view>4.不要发布已经发布过、重复的头像。</view>
				<view>5.本站资源来自网友收集，仅供用于学习和交流。违反上述规定引起的任何政治责任和法律责任都与本站无关。</view>
			</view>
			<button class='btn' form-type="submit">确 认</button>
		</form>
	</view>
</template>

<script>
	import qiniuUploader from '../../common/qiniuUploader.js'
	export default {
		data() {
			return {
				tmplIds:'',
				imgArr: [],
				index: 0,
				picker: ['公开', '私有'],
				classify: [],
				classifyidx: 0,
				subscribe: 0
			}
		},
		created() {
			this.initQiniu()
			this.getClassify()
			uni.getSetting({
			   success(res) {
			      console.log(res.authSetting)
			   },fail(err) {
			   	console.log(err)
			   }
			})
		},
		onShow() {
			
			
		},
		methods: {
			// 获取分类
			getClassify() {
				this.$http.get('wxapi/get_classify', {}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.classify = JSON.parse(data)
						}, err => {

						}
					)
				})
			},
			delpic(e) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '删除',
					success(res) {
						if (res.confirm) {
							let newarr = _this.imgArr
							newarr.splice(e, 1)
							_this.imgArr = newarr
						} else if (res.cancel) {}
					}
				})
			},
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
							this.tmplIds=data.tmplIds
							qiniuUploader.init(options);
						}, err => {

						}
					)
				})
			},
			selectimg() {
				var _this = this;
				uni.chooseImage({
					success: function(res) {
						let tempFilePaths = res.tempFilePaths
						let count = res.tempFilePaths.length + _this.imgArr.length
						if (count > 9) {
							_this.$util.tip("每次最多发布九张图片")
							tempFilePaths = res.tempFilePaths.slice(-(9 - _this.imgArr.length))
						}
						_this.didPressChooesImage(tempFilePaths, 0)
					}
				})
			},
			didPressChooesImage(filePath, inc) {
				var _this = this;
				if (!filePath[inc]) {
					return true;
				}
				qiniuUploader.upload(filePath[inc], (res) => {
						console.log(res.imageURL)
						var imageArr = _this.imgArr;
						imageArr.push(res.imageURL)
						_this.imgArr = imageArr
						_this.didPressChooesImage(filePath, inc + 1);
					}, (error) => {
						console.error('error: ' + JSON.stringify(error));
					},
					null,
					(progress) => {

					}, (cancelTask) => {

					}
				);
			},
			// 方式
			picker_fn(e) {
				this.index = e.detail.value
			},
			// 栏目
			classify_fn(e) {
				this.classifyidx = e.detail.value
				console.log(this.classifyidx)
			},
			// 提交
			formSubmit: function(e) {
				// console.log(e.detail)
				let _this = this;
				let info = e.detail.value;
				if (info.title.trim().length > 17 || info.title.trim().length < 1) {
					_this.$util.tip("标题不符合要求")
					return
				}
				if (info.introduction.trim().length > 50 || info.introduction.trim().length < 1) {
					_this.$util.tip("简介不符合要求")
					return
				}
				if (_this.imgArr.length < 1) {
					_this.$util.tip("必须上传大于1张图片")
					return
				}
				uni.requestSubscribeMessage({
					tmplIds: [_this.tmplIds],
					success(res) {
						if (res[_this.tmplIds] === 'accept') {
							_this.subscribe = 1
						}
						_this.$http.post('wxapi/post_release', {
							title: info.title,
							_public: parseInt(info.picker) + 1,
							classify: _this.classify[info.classify].id,
							url: _this.imgArr,
							count: _this.imgArr.length,
							introduction: info.introduction,
							subscribe: _this.subscribe
						}).then(res => {
							_this.$http.handelResponse(
								res,
								data => {
									_this.$util.tip("发布成功，请等待审核")
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 2000)
								}
							)
						})
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.title {
		margin: 20rpx 32rpx;
		font-size: 28rpx;
		color: rgba(102, 102, 102, 1);
		border-bottom: 1rpx solid rgba(153, 153, 153, 0.5);
		line-height: 56rpx;
		padding-bottom: 5rpx;
	}

	.title>text {
		margin-right: 40rpx;
	}

	input {
		width: 80%;
	}

	.placeholder {
		font-size: 28rpx;
		color: #999;
	}

	.title_s {
		font-size: 28rpx;
		color: rgba(102, 102, 102, 1);
		padding: 30rpx 0rpx;
		margin: 0 32rpx;
	}

	.tip {
		padding-bottom: 100rpx;
	}

	.tip>view {
		color: #999;
		font-size: 24rpx;
		margin: 0 32rpx;
		line-height: 48rpx;
	}

	.list {
		padding: 0rpx 32rpx;
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.list>image {
		width: 208rpx;
		height: 208rpx;
		margin: 0 auto;
		border-radius: 8rpx;
		margin-bottom: 30rpx;
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

	.cu-form-group picker .picker {
		text-align: left !important;
		color: rgba(102, 102, 102, 1);
	}

	.titles {
		border-bottom: 0rpx solid #999 !important;
		margin: 0 0 !important;
		font-size: 28rpx !important;
	}
</style>
