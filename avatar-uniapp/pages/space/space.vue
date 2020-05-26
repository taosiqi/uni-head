<template>
	<view>
		<view class='title'>
			<view class='ui-cell'>
				<image src='../../static/image/001.png'></image>
				<view>
					<view class='ui-nowrap'>
						{{user_info.name}}
					</view>
					<view class='ui-nowrap'>
						{{user_info.signature}}
					</view>
				</view>
			</view>
			<view class='ui-cell ui-cell-sb'>
				<view class='ui-cell'>
					<image :src='user_info.vip<2? "../../static/image/38.png":"../../static/image/11.png"'></image>
					<text class='lv'>VIP</text>
					<image :src='user_info.gender===1 ? "../../static/image/12.png":"../../static/image/13.png"'></image>
					<text>{{user_info.gender===1 ? "男":"女"}}</text>
					<image src='../../static/image/14.png'></image>
					<text>{{user_info.area}}</text>
				</view>
				<view class='ui-cell'>
					<image src='../../static/image/01.png'></image>
					<text>{{user_info.flower_count}}</text>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class='nav_list_f ui-cell ui-cell-sb ui-cell-hh'>
			<navigator  v-for="(item,idx) in post_list" :key="idx" class='nav_list' :url="'../details/details?id='+item.id" hover-class='none' @longpress="handleLongPress(item.id,item.public,idx)">
				<view>
					<image :src="item.first_url+'?imageView2/5/w/200/h/200/interlace/1/q/50|imageslim'"></image>
				</view>
				<view class='ui-nowrap'>{{item.title}}</view>
				<view class='ui-cell ui-cell-sb'>
					<view class="ui-nowrap">
						{{item.name}}
					</view>
					<view class="ui-nowrap">
						{{item.release_time | incise}}
					</view>
				</view>
				<view class='ui-cell ui-cell-sb'>
					<view class='ui-cell'>
						<image src='/static/image/01.png'></image>
						<text>{{item.flower_count}}</text>
					</view>
					<view class='ui-cell'>
						<image src='/static/image/3.png'></image>
						<text>{{item.count}}</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authority: '', //自己还是别人
				size: 6,
				page: 1,
				uid: '', //进入空间的id
				post_list: [],
				user_info: {},
			}
		},
		onLoad: function(options) {
			this.uid= options.id
			uni.showLoading({
				title: '加载中',
			})
			this.user_info_fn()
			this.post_list_fn()
		},
		onReachBottom: function() {
			this.page = this.page + 1
			this.post_list_fn()
		},
		methods: {
			post_list_fn() {
				this.$http.get('wxapi/get_space_post', {
					uid: this.uid,
					size: this.size,
					page: this.page,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							let newarr = data.date
							newarr = this.post_list.concat(data.date);
							this.post_list = newarr
							this.authority = data.authority
							uni.hideLoading()
						}, err => {

						}
					)

				})
			},
			user_info_fn() {
				this.$http.get('wxapi/get_space', {
					uid: this.uid
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.user_info = data
						}, err => {

						}
					)
				})
			},
			// 长按设置
			handleLongPress(pid,_public,idx) {
				let _this=this
				console.log(pid)
				if (this.authority) {
					uni.showModal({
						title: '提示',
						content: `确认设置为${_public === 1 ? "私有" : "公开"}吗`,
						success(res) {
							console.log(res)
							if (res.confirm) {
								_this.$http.post('wxapi/post_srivately', {
									_public: _public === 1 ? 2 : 1,
									pid: pid,
								}).then(res => {
									_this.$http.handelResponse(
										res,
										data => {
											_this.post_list[idx].public=_public === 1 ? 2 : 1
										}, err => {

										}
									)
								})
							}
						}
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	/* 头部 */

	.title {
		margin: 0 32rpx;
		padding-bottom: 15rpx;
		/* position: absolute; */
		top: 0rpx;
		color: black;
		border-bottom: 1px solid #e4e4e4;
	}

	.title>view:nth-of-type(1) {
		margin-bottom: 20rpx;
	}

	.title>view:nth-of-type(1)>view:nth-of-type(1) {
		font-size: 28rpx;
	}

	.title>view:nth-of-type(1)>view:nth-of-type(1)>view:nth-of-type(2) {
		font-size: 24rpx;
		padding-top: 14rpx;
	}

	.title>view:nth-of-type(1)>image {
		height: 120rpx;
		width: 120rpx;
		border-radius: 500rpx;
		margin-top: 30rpx;
		margin-right: 30rpx;
	}

	.title>view:nth-of-type(1)>navigator>image {
		height: 10rpx;
		width: 40rpx;
		margin-left: 290rpx;
		margin-top: 30rpx;
	}

	.title>view:nth-of-type(1)>view:nth-of-type(1)>view:nth-of-type(1) {
		width: 200rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(1)>text:nth-of-type(1) {
		font-size: 24rpx;
		color: #ffd22b;
		margin-right: 33rpx;
	}

	.lv {
		color: #999 !important;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(1)>text:nth-of-type(2) {
		font-size: 20rpx;
		margin-right: 14rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(1)>text:nth-of-type(3) {
		font-size: 20rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(1)>image:nth-of-type(1) {
		height: 26rpx;
		width: 36rpx;
		margin-right: 13rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(1)>image:nth-of-type(2) {
		height: 23rpx;
		width: 12rpx;
		margin-right: 10rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(1)>image:nth-of-type(3) {
		height: 22rpx;
		width: 18rpx;
		margin-right: 10rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(2) {
		height: 38rpx;
		color: black;
		/* background: rgba(0, 0, 0, 0.2);
    border-radius: 19px; */
	}

	.title>view:nth-of-type(2)>view:nth-of-type(2)>image:nth-of-type(1) {
		height: 26rpx;
		width: 36rpx;
		margin-right: 13rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(2)>text:nth-of-type(1) {
		font-size: 24rpx;
		color: black;
		margin-right: 5rpx;
		text-align: center;
		line-height: 38rpx;
	}

	/* 图片列表 */

	.nav_list_f {
		margin: 20rpx;
	}

	.nav_list {
		margin: 10rpx;
		margin-bottom: 20rpx;
		display: inline-block;
		width: 331rpx;
		height: 465rpx;
		box-shadow: 0px 1rpx 4rpx rgba(0, 0, 0, 0.16);
		opacity: 1;
		border-radius: 4rpx;
	}

	.nav_list>view:nth-of-type(1) image {
		width: 331rpx;
		height: 331rpx;
		background: rgba(0, 0, 0, 0);
		opacity: 1;
		border-radius: 8rpx 8rpx 0rpx 0rpx;
	}

	.nav_list>view:nth-of-type(2) {
		font-size: 26rpx;
		color: rgba(112, 112, 112, 1);
		padding-left: 16rpx;
		padding-top: 10rpx;
	}

	.nav_list>view:nth-of-type(3) {
		font-size: 20rpx;
		padding-left: 16rpx;
		padding-right: 16rpx;
		padding-top: 10rpx;
	}

	.ui-nowrap {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.nav_list>view:nth-of-type(4) {
		padding-top: 5rpx;
	}

	.nav_list>view:nth-of-type(4) view image {
		width: 25rpx;
		height: 25rpx;
	}

	.nav_list>view:nth-of-type(4) view text {
		font-size: 20rpx;
		color: #999;
	}

	.nav_list>view:nth-of-type(4) view {
		padding: 0 16rpx;
	}
</style>
