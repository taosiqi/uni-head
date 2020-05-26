<template>
	<view>
		<!-- tab -->
		<view class='ui-cell ui-cell-sa tab'>
			<view :class="[type==1?'active':'']" @click='chooseTab(1)'>推荐</view>
			<view :class="[type==2?'active':'']" @click='chooseTab(2)'>花多</view>
			<view :class="[type==3?'active':'']" @click='chooseTab(3)'>最新</view>
		</view>
		<!-- 刷新 -->
		<view :class="['cu-load', isLoad?'loading':'']"></view>
		<!-- 内容 -->
		<view class='nav_list_f ui-cell ui-cell-sb ui-cell-hh'>
			<navigator v-for="(item,index) in post_list" :key="index" class='nav_list'>
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
				type: 1, //tab分类
				size: 10, //分页
				page: 1,
				classify: 0, //头像分类id
				post_list: [],
				isLoad: false,
			}
		},
		// 上拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.getPostList()
		},
		// 下拉加载
		onReachBottom() {
			this.page += 1
			this.getPostList()
		},

		onLoad: function(options) {
			this.classify = options.id
			uni.setNavigationBarTitle({
				title: options.name
			})
			this.getPostList()
		},
		methods: {
			// 切换tab
			chooseTab(e) {
				this.type = e
				this.post_list = []
				this.page = 1
				this.isLoad = true
				this.getPostList()
			},
			// 获取分类
			getPostList() {
				this.$http.get('wxapi/get_classify_post', {
					type: this.type,
					size: this.size,
					page: this.page,
					classify: this.classify
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							let newarr = data
							newarr = this.post_list.concat(data)
							this.post_list = newarr
							this.isLoad = false
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

	/* tab */

	.tab {
		height: 100rpx;
		background-color: #fff;
		width: 460rpx;
		margin: 0 auto;
		z-index: 20;
	}

	.tab>view {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		line-height: 100rpx;
		color: #666;
		font-weight: 400;
	}

	.tab>view.active {
		color: black;
		font-size: 30rpx;
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
		background: rgba(255, 255, 255, 1);
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
		margin-left: 5rpx;
	}

	.nav_list>view:nth-of-type(4) view {
		padding: 0 16rpx;
	}
</style>
