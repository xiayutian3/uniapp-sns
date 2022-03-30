<template>
	<view id="index">

		<!-- navbar -->
		<u-navbar v-if="navBarShowTag">
			<view class="tabs-box" slot="center">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐
				</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">资讯
				</view>
			</view>
		</u-navbar>


		<!-- 页面 header 相关部分 -->
		<view class="header-box">
			<!-- 顶部广告位轮播图 -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2500" :duration="500">
				<swiper-item>
					<navigator :url="'/pages/webview/webview?url='+ encodeURI('https://www.baidu.com/')"
						open-type="navigate">
						<image class="banner-swiper-img" src="@/static/logo.png" mode="aspectFill" />
					</navigator>
				</swiper-item>
				<swiper-item>
					<image class="banner-swiper-img" src="@/static/logo.png" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<!-- 遮罩使用弧形框 -->
			<image class="crile" src="@/static/crile.png" mode="aspectFill" />
			<!-- 两个选项按钮 -->
			<view class="card-header">
				<view class="card-one card-left" @tap="gotoTab('/pages/feeds/feeds')">
					<image class="img" src="@/static/coffee.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">精彩动态</view>
					</view>
				</view>
				<view class="card-one card-right" @tap="gotoTab('/pages/me/me')">
					<image class="img" src="@/static/ran.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">个人中心</view>
					</view>
				</view>
			</view>

			<!-- Tab 选项卡 -->
			<view class="tabs-box">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐
				</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">资讯
				</view>
			</view>


		</view>


		<!-- 内容轮播导航实现 -->
		<swiper class="swiper-box" :style=" 'height: 1000px' " :current="currentSwiperIndex"
			@animationfinish="swiperSlider">
			<swiper-item class="swiper-item">
				<view class="page-item sns-now">
					<view class="feeds-box">
						<waterfall-sns v-model="feedsList" ref="waterfall">
							<template v-slot:left="{leftList}">
								<view class="feed-one" v-for="(item, index) in leftList" :key="index">
									<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?id=' + item.id">
										<image class="feed-img" :src="item.cover" mode="widthFix" :lazy-load="true" />
										<view class="u-line-2 feed-title" v-if="!!item.feed_content">
											{{ item.feed_content }}
										</view>
										<view class="feed-info">
											<view class="iview">
												<image class="avatar" :src=" item.avatar" />
												<text class="name u-line-1">{{ item.name }}</text>
											</view>
											<view class="iview">
												<view class="ilike" @tap.stop="clickLove(item)">
													<image v-if="item.has_like" src="@/static/lover.png"
														class="micon" />
													<image v-else src="@/static/love.png" class="micon" />
													<text class="love-count"
														v-if="item.like_count>0">{{ item.like_count }}</text>
												</view>
											</view>
										</view>
									</navigator>
								</view>
							</template>
							<template v-slot:right="{rightList}">
								<view class="feed-one" v-for="(item, index) in rightList" :key="index">
									<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?id=' + item.id">
										<image class="feed-img" :src="item.cover" mode="widthFix" :lazy-load="true" />
										<view class="u-line-2 feed-title" v-if="!!item.feed_content">
											{{ item.feed_content }}
										</view>
										<view class="feed-info">
											<view class="iview">
												<image class="avatar" :src=" item.avatar" />
												<text class="name u-line-1">{{ item.name }}</text>
											</view>
											<view class="iview">
												<view class="ilike" @tap.stop="clickLove(item)">
													<image v-if="item.has_like" src="@/static/lover.png"
														class="micon" />
													<image v-else src="@/static/love.png" class="micon" />
													<text class="love-count"
														v-if="item.like_count>0">{{ item.like_count }}</text>
												</view>
											</view>
										</view>
									</navigator>
								</view>
							</template>
						</waterfall-sns>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item sns-news">
				<view v-for="(item, index) in newsList" :key="index">
					<navigator class="one-new" open-type="navigate" :url=" '/subpages/newinfo/newinfo?id=' + item.id">
						<view class="left">
							<view class="title u-line-2">{{item.title}}</view>
							<view class="uinfo">
								<view class="iview">
									<view class="utime">
										<text class="name">{{ item.author }}</text>
									</view>
								</view>
								<text class="uptime">{{ item.created_at | timeFormate }}发布</text>
							</view>
						</view>
						<view class="right">
							<image class="pic" mode="aspectFill" :src="item.cover" />
						</view>
					</navigator>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import {
		getTestData,
		getFeeds,
		getNews
	} from '@/config/api.js'
	export default {
		data() {
			return {
				// navBar 显示状态控制
				navBarShowTag: false,
				// 顶部 轮播图列表
				swiperAdList: [],
				// 动态列表数据
				feedsList: [],
				// 资讯列表数据
				newsList: [],
				// 当前 推荐 资讯 滑动位置
				currentSwiperIndex: 0,
				// 滑动页面轮播器的高度
				swiperSliderHeight: '500px',
				swiperSliderFeedsHeight: 0,
				swiperSliderNewsHeight: 0,
				// 记录滚动所在的位置
				oldFeedsScrollTop: 0,
				oldNewsScrollTop: 0
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			//
		},
		// 滑動到最底部,觸發加載數據更多
		onReachBottom(){
			//
		},
		//監聽頁面滾動事件
		onPageScroll(event) {
			//那個分頁下邊，記住滾動到的位置
			if (this.currentSwiperIndex === 0) {
				this.oldFeedsScrollTop = event.scrollTop
			} else {
				this.oldNewsScrollTop = event.scrollTop
			}


			if (event.scrollTop > 220) {
				this.navBarShowTag = true
			} else {
				this.navBarShowTag = false
			}
		},
		onLoad() {
			//測試接口數據
			getTestData().then(res => {
				console.log('res', res)
			})
			// 我们要在这里初始化请求相关数据
			this.getFeedsList()
			this.getNewsList()
		},
		methods: {
			//tab頁面跳轉
			gotoTab(url) {
				uni.switchTab({
					url
				})
			},
			// 点击按钮实现切换效果
			swiperChange(index) {
				if (index === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldFeedsScrollTop, //滚动到目标位置
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldNewsScrollTop, //滚动到目标位置
					})
				}
				this.currentSwiperIndex = index
			},
			// 页面滑动左右分页的时候实现的效果
			swiperSlider(event) {
				let index = event.detail.current
				if (index === 0) {
					this.swiperSliderHeight = this.swiperSliderFeedsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldFeedsScrollTop, //滚动到目标位置
					})
				} else {
					this.swiperSliderHeight = this.swiperSliderNewsHeight
					uni.pageScrollTo({
						duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
						scrollTop: this.oldNewsScrollTop, //滚动到目标位置
					})
				}
				this.currentSwiperIndex = index

			},
			// 请求 feeds 列表数据
			async getFeedsList() {
				let feeds = await getFeeds()
				let feedsList = feeds.data.feeds.map(item => {
					return {
						...item,
						cover: this.BaseFileURL + item.images[0].file,
						avatar: !!item.user.avatar ? item.user.avatar.url : '/static/nopic.png',
						name: item.user.name,
					}
				})
				//多次請求添加數據(追加)
				this.feedsList = [...this.feedsList,...feedsList]
			},
			// 请求资讯列表数据
			async getNewsList() {
				let news = await getNews()
				let newsList = news.data.map(item => {
					return {
						...item,
						cover: this.BaseFileURL + item.image.id
					}
				})
				//多次請求添加數據(追加)
				this.newsList = [...this.newsList,...newsList]
			}
		}
	}
</script>

<style lang="scss" scoped>
	#sns {
		background-color: #f1f1f1;
	}

	// 推荐、咨询 按钮样式
	.tabs-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 750upx;

		.one-nav {
			width: 120upx;
			color: #9B9B9B;
			font-size: 36upx;
			text-align: center;
			font-weight: blod;

			&.nav-actived {
				color: #0050FF;
			}
		}
	}

	.header-box {
		position: relative;
		left: 0;
		height: 500upx;
		background-color: #f1f1f1;
		z-index: 1;

		// 广告位轮播器相关样式
		.swiper {
			width: 750upx;
			height: 400upx;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			z-index: 1;

			.banner-swiper-img {
				width: 750upx;
				height: 400upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
			}
		}

		.crile {
			width: 750upx;
			height: 50upx;
			position: absolute;
			left: 0;
			top: 355upx;
			z-index: 9;
		}

		// 新鲜事 活动墙 按钮样式
		.card-header {
			position: absolute;
			left: 0;
			top: 320upx;
			height: 160upx;
			z-index: 99;
			width: 710upx;
			margin-left: 20upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;

			.card-one {
				width: 328upx;
				height: 96upx;
				border-radius: 49upx;
				background-color: #fff;
				margin: 0 10upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;

				.img {
					width: 44upx;
					height: 44upx;
					margin-left: 50upx;
				}

				.iright {
					margin-left: 30upx;
					text-align: left;
					color: #888;

					.title {
						font-size: 30upx;
						color: #001432;
					}

					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;
						font-size: 20upx;
						margin-top: -5upx;
					}
				}
			}
		}

		// 推荐、咨询 按钮样式
		.tabs-box {
			width: 750upx;
			position: absolute;
			z-index: 1;
			left: 0;
			top: 480upx;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.one-nav {
				height: 80upx;
				width: 110upx;
				color: #9B9B9B;
				font-size: 36upx;
				text-align: center;
				font-weight: blod;

				&.nav-actived {
					color: #0050FF;
				}
			}
		}
	}

	// 此刻 栏目样式\
	.swiper-box {
		background-color: #f1f1f1;
		padding: 60upx 0 40upx;
	}

	.sns-now {

		// 动态相关瀑布流样式
		.feeds-box {
			width: 735upx;
			margin-left: 13upx;
			padding-bottom: 20upx;

			.feed-one {
				width: 358upx;
				margin-bottom: 12upx;
				background-color: #FFF;
				border-radius: 20upx;

				position: relative;

				.feed-img {
					width: 358upx;
					height: 300upx;
					border-radius: 10upx;
				}

				.feed-title {
					width: 350upx;
					margin-top: 15upx;
					margin-left: 10upx;
					font-size: 28upx;
					line-height: 40upx;
					color: #001432;
					text-align: left;
				}

				.feed-info {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 10upx;
					font-size: 20upx;
					color: #666;
					padding: 0 10upx 16upx;

					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: nowrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;

						.ilike {
							display: flex;
							flex-direction: row;
							flex-wrap: nowrap;
							justify-content: space-between;
							align-items: center;
							align-content: center;
							height: 60upx;
							padding: 0 10upx;
							background-color: #FFFFFF;
						}
					}

					.avatar {
						margin-right: 10upx;
						height: 40upx;
						width: 40upx;
						border-radius: 50%;
						border: 1upx solid #eee;
					}

					.name {
						max-width: 120upx;
						color: #757474;
					}

					.micon {
						width: 32upx;
						height: 28upx;
					}

					.love-count {
						padding-left: 10upx;
						color: #757474;
					}
				}
			}
		}
	}

	// 轮播页面 资讯
	.sns-news {
		background-color: #fff;
		width: 750upx;

		.one-new {
			width: 700upx;
			height: 74px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: flex-start;
			align-content: center;
			padding-bottom: 10px;
			padding-top: 10px;
			padding-left: 25upx;
			padding-right: 25upx;
			border-bottom: 1px solid #f1f1f1;

			.left {
				width: 490upx;
				height: 140upx;
				text-align: left;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				.title {
					font-size: 30upx;
					line-height: 48upx;
					color: #001432;
					margin-top: 20upx;
				}

				.uinfo {
					width: 490upx;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 10upx;
					font-size: 20upx;
					color: #999;

					.utime {
						font-size: 24upx;

						.name {
							max-width: 120upx;
							color: #777;
						}
					}
				}
			}

			.right {
				width: 120upx;

				.pic {
					width: 120upx;
					height: 120upx;
					margin-top: 20upx;
					border-radius: 6upx;
				}
			}
		}
	}
</style>
