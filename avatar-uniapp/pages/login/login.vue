<template>
	<view>
		<view class="login_images">
			<image src="https://img.input520.cn/2.png"></image>
		</view>
		<view class="login_text">登录才能获取更好的服务哟</view>
		<button class="weui-btn" @click="check">一键登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {

		},
		methods: {
			check() {
				// #ifdef MP-WEIXIN
				let _this = this
				uni.login({
					provider: 'weixin',
					success: function(res) {
						console.log(res.code)
						_this.$http.post('wxapi/check', {
							code: res.code
						}).then(res => {
							_this.$http.handelResponse(
								res,
								data => {
									_this.$util.tip("登录成功")
									_this.$util.setItem('user_info', data)
									uni.setStorageSync('token', data.token)
									setTimeout(()=>{
										uni.reLaunch({
											url:'../index/index'
										})
									})
								}, err => {

								}
							)
						})
					}
				});
				// #endif
			}
		}
	}
</script>

<style>
	page {
		background: white;
	}

	.login_images image {
		display: block;
		height: 138rpx;
		width: 138rpx;
		border-radius: 138rpx;
		margin: 0 auto;
		margin-top: 116rpx;
	}

	.login_text {
		margin-top: 43rpx;
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		line-height: 36rpx;
	}

	.weui-btn {
		/* height: 78rpx; */
		width: 464rpx;
		margin-top: 141rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 300;
		color: rgba(255, 255, 255, 1);
		border-radius: 50rpx;
		background: #1296db;
		line-height: 78rpx;
	}
</style>
