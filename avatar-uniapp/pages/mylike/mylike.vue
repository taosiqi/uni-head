<template>
	<view>
		<!-- tab -->
		<view class='ui-cell tab'>
			<view :class="type==1?'active':''" @click='chooseTab(1)'>送花</view>
			<view :class="type==2?'active':''" @click='chooseTab(2)'>喜欢</view>
			<view :class="type==3?'active':''" @click='chooseTab(3)'>评论</view>
		</view>
		<!-- 列表 -->
		<view class="cu-timeline" v-if="type==1">
			<view class="cu-time"></view>
			<view class="cu-item text-grey cuIcon-evaluate_fill" v-for="(item,index) in list[0]" :key="index" @click="address(item.id,item.public,item.audit)">
				<view class="content bg-red shadow-blur ui-nowrap">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="cu-timeline" v-if="type==2">
			<view class="cu-time"></view>
			<view class="cu-item text-grey cuIcon-likefill" v-for="(item,index) in list[1]" :key="index" @click="address(item.id,item.public,item.audit)">
				<view class="content bg-red shadow-blur ui-nowrap">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="cu-timeline" v-if="type==3">
			<view class="cu-time"></view>
			<view class="cu-item text-grey cuIcon-commentfill" v-for="(item,index) in list[2]" :key="index" @click="address(item.id,item.public,item.audit)">
				<view class="content bg-red shadow-blur ui-nowrap">
					{{item.title+'-'+item.comment}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				list: []
			}
		},
		onLoad() {
			this.list_fn()
			uni.showLoading({
			  title: '加载中',
			})
		},
		methods: {
			// 切换tab
			chooseTab(e) {
				this.type = e
			},
			// 列表
			list_fn() {
				this.$http.get('wxapi/get_my_like', {
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.list = data
							uni.hideLoading()
						}, err => {

						}
					)
				})
			},
			// 跳转
			address(id, _public,audit) {
				if (_public === 2 || audit===2) {
					this.$util.tip("帖子不对外开放")
					return
				} else {
					uni.navigateTo({
						url: '../details/details?id=' + id
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.tab {
		height: 100rpx;
		background-color: #fff;
		width: 100%;
		z-index: 20;
		border-bottom: 1rpx solid #efefef;
	}

	.tab>view {
		width: 50%;
		text-align: center;
		position: relative;
		font-size: 26rpx;
		line-height: 100rpx;
		color: rgba(102, 102, 102, 1);
	}

	.tab>view:after {
		content: "";
		width: 25%;
		height: 4rpx;
		background-color: transparent;
		position: absolute;
		bottom: 0;
		left: 38%;
	}

	.tab>view.active {
		color: #E54D42;
		font-weight: bold;
	}

	.tab>view.active:after {
		background-color: #E54D42;
	}

	.cuIcon-evaluate_fill:before {
		color: #E54D42;
	}

	.cuIcon-likefill:before {
		color: #E54D42;
	}

	.cuIcon-commentfill:before {
		color: #E54D42;
	}
</style>
