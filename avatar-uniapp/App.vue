<script>
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			let _this = this
			uni.login({
				provider: 'weixin',
				success: function(res) {
					_this.$http.post('wxapi/check', {
						code: res.code
					}).then(res => {
						_this.$http.handelResponse(
							res,
							data => {
								_this.$util.setItem('user_info',data)
								uni.setStorageSync('token',data.token)
							}, err => {

							}
						)
					})
				}
			});
			// #endif
		},
		onHide: function() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";

	/* box居中 */
	.ui-cell {
		position: relative;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-moz-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}

	/* 布满剩下空间 */

	/* 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容： */

	.ui-primary {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}

	/* 单个项目对齐方式 上对齐 */

	.ui-cell-lt {
		-webkit-align-self: flex-start;
		-moz-align-self: flex-start;
		align-self: flex-start;
	}

	/* 两端对齐，项目之间的间隔都相等 */

	.ui-cell-sb {
		justify-content: space-between;
	}

	/* 每个项目两侧的间隔相等 */

	.ui-cell-sa {
		justify-content: space-around;
	}

	/* 居中 */

	.ui-cell-cn {
		justify-content: center;
	}

	/* 右对齐 */

	.ui-cell-end {
		justify-content: flex-end;
	}

	/* 主轴方向-列 */

	.ui-cell-cl {
		flex-direction: column;
	}

	/* 主轴换行 两端对齐 */

	.ui-cell-hh {
		flex-wrap: wrap;
		justify-content: space-between;
	}

	/* 文本向右对齐 交叉轴的中点对齐 */

	.ui-cell-ft {
		text-align: right;
		color: #aaa;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}

	/* 主轴换行 */

	.ui-wrap {
		flex-wrap: wrap;
	}

	/* 底部对齐 */

	.ui-cell-bt {
		align-self: flex-end;
	}

	/* 元素不换行 超出隐藏 显示省略符号来代表被修剪的文本 */

	.ui-nowrap {
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* 元素内容前后加上指定内容 清除浮动*/

	.clearfix::after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	/* 文字截断 */

	.ui-nowrap,
	.ui-nowrap-flex,
	.ui-nowrap-2,
	.ui-nowrap-3,
	.ui-nowrap-6,
	.ui-nowrap-4 {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 规定段落中的文本不进行换行 */

	.ui-nowrap {
		max-width: 100%;
		white-space: nowrap;
	}

	/* 平分父元素 */

	.ui-nowrap-flex,
	.ui-nowrap-2,
	.ui-nowrap-3,
	.ui-nowrap-4,
	.ui-nowrap-5 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	/* 多行文字溢出 省略 */

	.ui-nowrap-flex {
		-webkit-line-clamp: 1;
		-webkit-box-flex: 1;
		height: inherit;
	}

	/*要截断的行数*/

	.ui-nowrap-2 {
		-webkit-line-clamp: 2;
	}

	.ui-nowrap-3 {
		-webkit-line-clamp: 3;
	}

	.ui-nowrap-4 {
		-webkit-line-clamp: 4;
	}

	.ui-nowrap-6 {
		-webkit-line-clamp: 6;
	}

	/* 图片宽高100% */

	.img_100 {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
