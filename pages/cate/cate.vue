<template>
	<view class="cate">
		<uni-my-search @search-click="gotoSearch"></uni-my-search>
		<view class="cate-container">
			<scroll-view class="cate-container-left" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="item.cat_id">
					<view class="cate-container-left-item" :class="{active: cateActive === index}"
						@click="cateClick(index)">{{item.cat_name}}
					</view>
				</block>

			</scroll-view>
			<scroll-view class="cate-container-right" scroll-y="true" :style="{height: wh + 'px'}"
				:scroll-top="rightScrollTop">
				<view class="cate-container-right-item" v-for="item in cateLevel2" :key="item.cat_id">
					<view class="cate-container-right-item-title">
						/ {{item.cat_name}} /
					</view>
					<view class="cate-container-right-item-list">
						<view @click="gotoGoodList(item2)" v-for="item2 in item.children" :key="item2.cat_id">
							<image :src="item2.cat_icon"></image>
							<text>{{item2.cat_name}} </text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		async onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			await this.changeCateListData()
			this.changeCateLevel2()
			this.changeRightScrollTop()
		},
		data() {
			return {
				wh: 0,
				cateList: [],
				cateLevel2: [],
				cateActive: 0,
				rightScrollTop: 0
			}
		},
		methods: {
			ajaxCateListData() {
				return uni.$http.get('/api/public/v1/categories')
			},

			async getCateListData() {
				const res = await this.ajaxCateListData()
				return res.data.message
			},

			async changeCateListData() {
				this.cateList = await this.getCateListData()
			},

			// 二级分类改变
			changeCateLevel2() {
				this.cateLevel2 = this.cateList[this.cateActive].children
			},

			changeRightScrollTop() {
				this.rightScrollTop = this.rightScrollTop ? 0 : 1
			},

			cateClick(index) {
				this.cateActive = index
				this.changeCateLevel2()
				this.changeRightScrollTop()
			},

			// 跳转到商品列表页面
			gotoGoodList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?id=' + item.cat_id
				})
			},

			// 跳转到搜索
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate {
		height: 100%;

		&-container {
			display: flex;
			height: calc(100% - 100rpx);


			&-left {

				width: 240rpx;
				height: 100%;

				&-item {
					background-color: #f7f7f7;
					line-height: 120rpx;
					text-align: center;
					font-size: 24rpx;
					position: relative;

					&::before {
						content: '';
						display: block;
						width: 6rpx;
						height: 60rpx;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}

					&.active {
						background-color: #fff;

						&::before {
							background-color: #c00000;
						}
					}
				}
			}

			&-right {
				&-item {
					&-title {
						font-size: 24rpx;
						font-weight: bold;
						text-align: center;
						padding: 15px 0;
					}

					&-list {
						display: flex;
						flex-wrap: wrap;

						view {
							width: 33.33%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;

							image {
								width: 120rpx;
								height: 120rpx;
							}

							text {
								font-size: 12px;
							}
						}

					}
				}
			}
		}
	}
</style>
