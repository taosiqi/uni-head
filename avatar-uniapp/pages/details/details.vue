<template>
	<view>
		<!-- 头部 -->
		<view class='title ui-cell ui-cell-sb'>
			<view class="ui-cell ui-cell-lt">
				<view>
					<image :src="list.avatar"></image>
					<image :src='list.vip<3? "../../static/image/38.png":"../../static/image/11.png"'></image>
				</view>
				<view>
					<view class='ui-cell-lt'>
						<view style="width: 300rpx" class="ui-nowrap">{{list.name}}</view>
						<view style="width: 300rpx" class="ui-nowrap">{{list.signature}}</view>
						<view class='ui-cell msg_t'>
							<image :src='list.gender==1?"../../static/image/12.png":"../../static/image/13.png"'></image>
							<text>{{list.gender==1?"男":"女"}}</text>
							<image src='../../static/image/14.png'></image>
							<text>{{list.area}}</text>
						</view>
					</view>
				</view>
			</view>
			<view>
				<navigator :url="'../space/space?id='+list.uid" hover-class='none' class='ui-cell ui-cell-lt ui-primary'>
					<text>查看空间</text>
					<image src='../../static/image/15.png'></image>
				</navigator>
			</view>
		</view>
		<!-- 照片 -->
		<view class='title_two'>
			<view class="ui-nowrap-4">{{list.title}}</view>
			<view class="ui-nowrap-4">{{list.Introduction}}</view>
			<view class='ui-cell ui-cell-sb'>
				<text class="ui-nowrap-2" style="line-height: 48rpx;">{{list.release_time}}</text>
				<view class='ui-cell'>
					<image src='../../static/image/19.png'></image>
					<text>{{list.like_count}}</text>
					<image src='../../static/image/01.png'></image>
					<text>{{list.flower_count}}</text>
				</view>
			</view>
		</view>
		<view class='list'>
			<image v-for="(item,idx) in piclist" :key="idx" @click="viewpic(idx)" :src='item+"?imageView2/5/w/200/h/200/interlace/1/q/50|imageslim"'></image>
		</view>
		<!-- 留言 -->
		<view class='msg_title' @click="msg_fn">
			点击我，给作者留个言吧...
		</view>
		<view class='msg_f'>
			<view class='msg ui-cell' v-for="(item,idx) in commentlist" :key="idx">
				<image :src='item.avatar'></image>
				<view>
					<view class="ui-nowrap">
						{{item.name}}-
						<text class="ui-nowrap"> {{item.create_time}}</text>
					</view>
					<view class="ui-nowrap"> {{item.comment}}</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class='bottom ui-cell ui-cell-sa'>
			<view @click='address'>
				<image src='../../static/image/tab02.png'></image>
				<view>首页</view>
			</view>
			<view>
				<image :src="list.my_count==0 ? '../../static/image/images/1.png':'../../static/image/2.png'" @click="flower"></image>
				<view>送花</view>
			</view>
			<view>
				<image :src="list.is_like ? '../../static/image/17.png':'../../static/image/20.png'" @click="like"></image>
				<view>喜欢</view>
			</view>
			<!-- <view>
				<image src='/images/21.png'></image>
				<view>
					<button hover-class='none' open-type='share' class='btn'>
						分享
					</button>
				</view>
			</view> -->
		</view>

		<!-- 留言弹窗 -->
		<view :class="['cu-modal',msg?'show':'']">
			<view class="cu-dialog bg-white">
				<view class="cu-bar  justify-end">
					<view class="content">留言</view>
				</view>
				<view>
					<textarea class="textareas" maxlength="99" placeholder="留个言呗" @input="bindKeyInput" placeholder-class="textareas_class"></textarea>
					<button class="cu-btn modalbtn bg-blue" @click="comment_fn">提交</button>
					<button class="cu-btn modalbtn bg-red" @click="msg_fn">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: false, //留言弹窗
				id: '', //帖子id
				list: '', //帖子信息
				piclist: [], //图片
				commentlist: [], //留言列表
				comment: '', //留言
			}
		},
		onLoad: function(options) {
			uni.showLoading({
				title: '加载中',
			})
			this.id = options.id
			this.list_fn()
			this.comment_list()
			this.set_read()
		},
		onShow: function() {


		},
		methods: {
			bindKeyInput: function(e) {
				this.comment = e.detail.value
			},
			// 跳转首页
			address() {
				uni.reLaunch({
					url: '/pages/index/index',
				})
			},
			// 留言弹窗
			msg_fn() {
				this.msg = !this.msg
			},
			// 预览图片
			viewpic(idx) {
				let _this = this
				if (_this.list.vip > 2) {
					uni.previewImage({
						current: _this.piclist[idx],
						urls: _this.piclist
					})
				} else {
					let piclist = []
					_this.piclist.forEach(function(currentValue, index) {
						piclist[index] = currentValue +
							"?imageView2/0/interlace/1/q/20|watermark/2/text/5aS05YOP5LqR/font/5a6L5L2T/fontsize/1000/fill/IzAwMDAwMA==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim"
					})
					uni.previewImage({
						current: _this.piclist[idx] +
							"?imageView2/0/interlace/1/q/20|watermark/2/text/5LiD54mb5LqR/font/5a6L5L2T/fontsize/1000/fill/IzAwMDAwMA==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim",
						urls: piclist
					})
				}
			},
			// 获取帖子信息
			list_fn() {
				this.$http.get('wxapi/get_post_details', {
					pid: this.id,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.list = data
							this.piclist = JSON.parse(data.url)
							// console.log(data.url)
							uni.setNavigationBarTitle({
								title: this.list.title
							})
							uni.hideLoading()
						},
						err => {

						}
					)
				})
			},
			set_read() {
				this.$http.post('wxapi/set_post_read', {
					pid: this.id,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							
						}, err => {

						}
					)
				})
			},
			// 获取评论
			comment_list() {
				this.$http.get('wxapi/get_post_comment', {
					pid: this.id,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.commentlist = data
						}, err => {

						}
					)
				})
			},
			// 送花
			flower() {
				this.$http.post('wxapi/set_post_flower', {
					pid: this.id,
					vip:this.$util.getItem('user_info').vip
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.$util.tip("送花成功")
							this.list.flower_count++
						}, err => {

						}
					)
				})
			},
			// 喜欢
			like() {
				let url = 'wxapi/set_post_like'
				if (this.list.is_like) {
					url = 'wxapi/del_post_like'
				}
				this.$http.post(url, {
					pid: this.id,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.list.is_like = !this.list.is_like
							console.log(this.list.is_like)
						}, err => {

						}
					)
				})
			},
			// 留言
			comment_fn(e) {
				if (this.comment.trim() == '') {
					return this.$util.tip("不能为空")
				}
				this.$http.post('wxapi/set_post_comment', {
					pid: this.id,
					comment: this.comment,
				}).then(res => {
					this.$http.handelResponse(
						res,
						data => {
							this.msg = !this.msg
							this.commentlist.unshift({
								avatar: this.$util.getItem('user_info').avatar,
								comment: this.comment,
								create_time: "刚刚",
								name: this.$util.getItem('user_info').name,
							})
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

	/* 头部 */

	.title {
		margin: 0 32rpx;
		padding-bottom: 15rpx;
		border-bottom: 1px solid #e4e4e4;
	}

	.title>view:nth-of-type(1)>view:nth-of-type(1)>image:nth-of-type(1) {
		height: 120rpx;
		width: 120rpx;
		border-radius: 500rpx;
	}

	.title>view:nth-of-type(1)>view:nth-of-type(1)>image:nth-of-type(2) {
		height: 26rpx;
		width: 36rpx;
		margin-right: 13rpx;
		position: absolute;
		top: 10rpx;
		left: 86rpx;
	}

	.title>view:nth-of-type(1)>view:nth-of-type(2) {
		font-size: 28rpx;
		color: rgba(51, 51, 51, 1);
		margin-left: 30rpx;
	}

	.title>view:nth-of-type(2)>view:nth-of-type(2) {
		font-size: 24rpx;
		color: #999;
	}

	.title .msg_t image:nth-of-type(1) {
		height: 23rpx;
		width: 12rpx;
		margin-right: 10rpx;
	}

	.title .msg_t image:nth-of-type(2) {
		height: 22rpx;
		width: 18rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;

	}

	.title>navigator:nth-of-type(1) {
		padding-top: 20rpx;
		margin-left: 170rpx;
	}

	.title navigator:nth-of-type(1) image {
		height: 25rpx;
		width: 13rpx;
		margin-left: 21rpx;
	}

	.title navigator:nth-of-type(1) text {
		color: #999;
		font-size: 24rpx;
	}

	/* 照片 */

	.title_two {
		margin: 32rpx;
	}

	.title_two>view:nth-of-type(1) {
		font-size: 30rpx;
		color: rgba(112, 112, 112, 1);
		margin-top: 31rpx;
		width: 500rpx
	}

	.title_two>view:nth-of-type(2) {
		font-size: 30rpx;
		color: rgba(112, 112, 112, 1);
		margin-top: 10rpx;
		width: 500rpx
	}

	.title_two>view:nth-of-type(3)>view>text {
		font-size: 24rpx;
		color: #707070;
		margin-right: 10rpx;
	}

	.title_two>view:nth-of-type(3)>view>image {
		width: 22rpx;
		height: 19rpx;
		margin-right: 10rpx;
	}

	.title_two>view:nth-of-type(3)>view>image:nth-of-type(2) {
		width: 15rpx;
		height: 20rpx;
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

	/* 留言 */

	.msg_title {
		width: 696rpx;
		font-size: 24rpx;
		color: #333;
		padding: 32rpx;
		border-top: 1rpx solid #e4e4e4;
		margin: 0 auto;
	}

	.msg {
		margin-bottom: 30rpx;
		margin-left: 30rpx;
	}

	.msg_f {
		padding-bottom: 120rpx !important;
	}

	.msg>image {
		height: 94rpx;
		width: 94rpx;
		border-radius: 500rpx;
	}

	.msg>view>view:first-of-type {
		font-size: 24rpx;
		color: #333;
		margin-right: 20rpx;
		margin-left: 30rpx;
	}

	.msg>view>view:first-of-type>text {
		font-size: 24rpx;
		color: #999;
	}

	.msg>view>view:last-of-type {
		font-size: 28rpx;
		color: #333;
		margin-top: 12rpx;
		margin-left: 30rpx;
		width: 500rpx;
	}

	/* 底部 */

	.bottom {
		height: 98rpx;
		width: 750rpx;
		background: #fff;
		box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.16);
		position: fixed;
		bottom: 0rpx;
	}

	.bottom>view>image {
		height: 54rpx;
		width: 54rpx;
	}

	.bottom>view>view {
		font-size: 20rpx;
		color: #999;
		text-align: center;
	}

	button {
		font-size: 20rpx;
		color: #999;
		text-align: center;
		display: inline-block;
		overflow: auto
	}

	/* 弹窗 */

	.textareas {
		box-sizing: border-box;
		width: 100%;
		text-align: center !important;
		padding: 20rpx;
		height: 150rpx;
	}

	.modalbtn {
		margin: 20rpx;
		float: right;
		border-radius: 10rpx;
	}

	.textareas_class {
		text-align: left !important
	}
</style>
