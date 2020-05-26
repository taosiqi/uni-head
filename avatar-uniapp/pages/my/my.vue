<template>
	<view>
		<!-- 会员个人信息 -->
		<view class='top ui-cell ui-cell-end'>
			<image :src='user_info.vip<3? "/static/image/38.png":"/static/image/11.png"'></image>
			<view :class='user_info.vip<3?"lv":""'>VIP</view>
		</view>
		<view class='ui-cell ui-cell-cl name'>
			<image :src='user_info.avatar'></image>
			<view>{{user_info.name}}</view>
		</view>
		<view class='tip'>
			<view>{{user_info.vip<3? "连续分享小程序给好友，即可永久体验：": "分享成功，已获得以下永久功能："}}</view>
			<view class='ui-cell'>
				<image :src='user_info.vip<3? "/static/image/35.png":"/static/image/33.png"'></image>
				<view>免费下载高清图</view>
				<image :src='user_info.vip<3? "/static/image/37.png":"/static/image/32.png"'></image>
				<view>会员认证</view>
				<image :src='user_info.vip<3? "/static/image/36.png":"/static/image/34.png"'></image>
				<view>每天送花20朵</view>
			</view>
		</view>
		<!-- 菜单列表 -->
		<navigator url='../myinfo/myinfo' hover-class='none' class='ui-cell ui-cell-sb list'>
			<view class='ui-cell'>
				<image src='/static/image/001.png'></image>
				<view>个人信息</view>
			</view>
			<image src='/static/image/008.png'></image>
		</navigator>
		<navigator :url="'../space/space?id='+user_info.id" hover-class='none' class='ui-cell ui-cell-sb list'>
			<view class='ui-cell'>
				<image src='/static/image/002.png'></image>
				<view>我的空间</view>
			</view>
			<image src='/static/image/008.png'></image>
		</navigator>
		<navigator url='../mylike/mylike' hover-class='none' class='ui-cell ui-cell-sb list'>
			<view class='ui-cell'>
				<image src='/static/image/003.png'></image>
				<view>送花/喜欢/评论</view>
			</view>
			<image src='/static/image/008.png'></image>
		</navigator>
		<view @click="showModal" class='ui-cell ui-cell-sb list'>
			<view class='ui-cell'>
				<image src='/static/image/004.png'></image>
				<view>分享好友</view>
			</view>
			<image src='/static/image/008.png'></image>
		</view>
		<navigator url='../myupdate/myupdate' hover-class='none' class='ui-cell ui-cell-sb list'>
			<view class='ui-cell'>
				<image src='/static/image/005.png'></image>
				<view>更新日志</view>
			</view>
			<image src='/static/image/008.png'></image>
		</navigator>
		<view @click="showQrcode" class='ui-cell ui-cell-sb list'>
			<view class='ui-cell'>
				<image src='/static/image/006.png'></image>
				<view>赞赏支持</view>
			</view>
			<image src='/static/image/008.png'></image>
		</view>
		<button hover-class="nonde" class='ui-cell ui-cell-sb list button' open-type="feedback">
			<view class='ui-cell'>
				<image src='/static/image/007.png' style="width: 48rpx;height: 48rpx;"></image>
				<view>意见反馈</view>
			</view>
			<image src='/static/image/008.png'></image>
		</button>

		<!-- 分享弹窗 -->
		<view :class="['cu-modal', modalName ?'show':'']" @click='showModal'>
			<view class="cu-dialog">
				<view class='schedule ui-cell ui-cell-sa'>
					<view class='ui-cell'>
						<image :src='user_info.vip>=1?"/static/image/40.png":"/static/image/39.png"'></image>
						<view :class='[user_info.vip>=1?"schedule_text":""]'>分享一次</view>
					</view>
					<view class='ui-cell'>
						<image :src='user_info.vip>=2?"/static/image/40.png":"/static/image/39.png"'></image>
						<view :class='[user_info.vip>=2?"schedule_text":""]'>分享二次</view>
					</view>
					<view class='ui-cell'>
						<image :src='user_info.vip>=3?"/static/image/40.png":"/static/image/39.png"'></image>
						<view :class='[user_info.vip>=3?"schedule_text":""]'>分享三次</view>
					</view>
				</view>
				<button hover-class='none' open-type='share' class='btn'>
					继续分享
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: false,
				user_info: {},
			}
		},
		created() {
			this.user_info = this.$util.getItem('user_info')
		},
		methods: {
			// 分享弹窗
			showModal() {
				this.modalName = !this.modalName
			},
			// 赞赏
			showQrcode() {
				uni.previewImage({
					urls: ['https://img.input520.cn/admire.jpg'],
					current: 'https://img.input520.cn/admire.jpg' // 当前显示图片的http链接     
				})
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				this.$http.post('wxapi/set_vip', {
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.user_info.vip=this.user_info.vip+1
							this.$util.setItem('user_info',this.user_info)
						}, err => {
				
						}
					)
				})
			}
			return {
				title: '找头像吧小程序',
				path: '../index/index',
				imageUrl: 'https://img.input520.cn/share.png'
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.names {
		margin-bottom: 30rpx
	}

	.top {
		margin-top: 20rpx;
	}

	.top>image {
		height: 26rpx;
		width: 37rpx;
		margin-right: 13rpx;
	}

	.top>view {
		font-size: 24rpx;
		color: rgba(255, 210, 43, 1);
		margin-right: 79rpx;
	}

	.lv {
		color: #999 !important;
	}

	.name image {
		height: 100rpx;
		width: 100rpx;
		border-radius: 60rpx;
	}


	.name>view {
		font-size: 28rpx;
		line-height: 70rpx;
		color: black;
	}


	.tip {
		width: 608rpx;
		height: 152rpx;
		margin: 0 auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 12rpx rgba(0, 0, 0, 0.12);
		border-radius: 8rpx;
		padding: 36rpx 36rpx 33rpx 36rpx;
	}

	.tip>view:first-of-type {
		font-size: 20rpx;
		color: black;
	}

	.tip>view:last-of-type {
		margin-top: 22rpx;
	}

	.tip>view:last-of-type image {
		height: 24rpx;
		width: 24rpx;
		margin: 0 6rpx 0rpx 10rpx;
	}

	.tip>view:last-of-type image:first-of-type {
		margin-left: 0rpx;
	}

	.tip>view:last-of-type view {
		font-size: 24rpx;
		color: black;
	}

	.list {
		margin: 0 70rpx;
		height: 130rpx;
	}

	.list>view:first-of-type image {
		height: 56rpx;
		width: 56rpx;
	}

	.list>view:first-of-type view {
		font-size: 30rpx;
		color: black;
		margin-left: 24rpx;
	}

	.list>image {
		height: 33rpx;
		width: 17rpx;
	}


	.cu-dialog {
		padding: 40rpx 38rpx 30rpx 38rpx;
	}

	.btn {
		width: 180rpx;
		height: 52rpx;
		background: rgba(117, 152, 206, 1);
		border-radius: 8rpx;
		margin: 0 auto;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 52rpx;
		margin-top: 50rpx;
	}

	.schedule view image {
		height: 29rpx;
		width: 29rpx;
		margin-right: 9rpx;
	}

	.schedule view view {
		font-size: 24rpx;
		color: rgba(112, 112, 112, 0.50);
	}

	.schedule_text {
		color: black !important;
	}

	.button {
		background-color: #FFFFFF;
		padding: 0;
	}

	.button>view>image {
		height: 60rpx;
	}

	button:after {
		border: 0px;
	}
</style>
