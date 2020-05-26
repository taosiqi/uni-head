<template>
	<view>
		<!-- 轮播 -->
		<view class="swiper-container">
			<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 标题列表 -->
		<view class='list'>
			<navigator style="width: 25%;" v-for="(item,index) in classify" :key="index" class='ui-cell ui-cell-cl'  hover-class='none' :url="'../classify/classify?id='+item.id+'&name='+item.name">
				<image class='list_images' :src='item.url'></image>
				<view class='list_text'>{{item.name}}</view>
			</navigator>
		</view>
		<!-- tab -->
		<view class='ui-cell ui-cell-sa tab'>
			<view :class="[type==1?'active':'']" @click='chooseTab(1)'>推荐</view>
			<view :class="[type==2?'active':'']" @click='chooseTab(2)'>花多</view>
			<view :class="[type==3?'active':'']" @click='chooseTab(3)'>最新</view>
		</view>
		<!-- 图片列表 -->
		<view :class="['cu-load', 'bg-blue', isLoad ?'loading':'']"></view>
		<view class='nav_list_f ui-cell ui-cell-sb ui-cell-hh'>
			<navigator v-for="(item,index) in post_list" :key="index" class='nav_list' :url="'../details/details?id='+item.id">
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
		<uni-fab v-if="isShow" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal" @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				content: [
					{
						iconPath: '/static/image/31.png',
						selectedIconPath: '/static/image/31.png',
						text: '发布',
						active: true
					}
				],
				type: 1,
				size: 6,
				page: 1,
				post_list: [],
				classify: [],
				banner: [], //轮播
				isLoad: true,
				isShow:false
			}
		},
		onLoad() {
			this.getShow()
			this.getPostList()
			this.getBanner()
			this.getClassify()
		},
		// 上拉刷新
		onPullDownRefresh(){
			this.page = 1
			this.getPostList()
		},
		// 下拉加载
		onReachBottom(){
			this.page += 1
			this.getPostList()
		},
		methods: {
			trigger(e){
				if(e.index===0){
					uni.navigateTo({
						url:'../release/release'
					})
				}
			},
			// 切换tab
			chooseTab(e) {
				this.type = e
				this.post_list = []
				this.page = 1
				this.isLoad = true
				this.getPostList()
			},
			getShow() {
				this.$http.get('wxapi/show',).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.isShow = data
						}, err => {
			
						}
					)
				})
			},
			// 获取帖子列表
			getPostList() {
				this.$http.get('wxapi/get_post', {
					type: this.type,
					size: this.size,
					page: this.page,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							let newarr = data
							newarr = this.post_list.concat(data)
							this.post_list = newarr
							this.isLoad = false
							uni.stopPullDownRefresh
						}, err => {

						}
					)
				})
			},
			// 获取分类
			getClassify() {
				this.$http.get('wxapi/get_classify', {}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.classify=JSON.parse(data)
						}, err => {
			
						}
					)
				})
			},
			// 获取轮播图
			getBanner() {
				this.$http.get('wxapi/get_banner', {}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.banner=data.split(',')

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
		padding-bottom: 100rpx;
	}

	/* 轮播开始 */
	.swiper-container {
		position: relative;
		width: 686rpx;
		height: 290rpx;
		margin: 0 32rpx;
		border-radius: 20rpx !important;
		overflow: hidden;
		transform: translateY(0);
	}

	.swiper-container .swiper .img {
		width: 100%;
		height: 100%;
		overflow: hidden;
		transform: translateY(0);
	}

	.swiper-container .dots {
		position: absolute;
		left: 0;
		right: 0;
		top: 258rpx;
		display: flex;
		margin-right: 32rpx;
		justify-content: flex-end;
	}

	.swiper-container .dots .dot {
		margin: 0 8rpx;
		width: 14rpx;
		height: 14rpx;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 8rpx;
		transition: all 0.6s;
	}

	.swiper-container .dots .dot.active {
		background: #fff;
	}

	/* 列表 */

	.list {
		display: flex;
		flex-flow: wrap;
		margin: 20rpx 60rpx;
	}

	.list>navigator {
		width: 25%;
	}

	.list_images {
		height: 88rpx;
		width: 88rpx;
		border-radius: 50%;
	}

	.list_text {
		line-height: 50rpx;
		font-size: 20rpx;
		color: rgba(112, 112, 112, 1);
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

	/* 刷新 */
	.cu-load {
		display: block;
		line-height: 3em;
		text-align: center;
	}

	.cu-load::before {
		font-family: "cuIcon";
		display: inline-block;
		margin-right: 6rpx;
	}

	.cu-load.loading::before {
		content: "\e67a";
		animation: cuIcon-spin 2s infinite linear;
	}

	.cu-load.loading::after {
		content: "加载中...";
	}

	/*  */
</style>
