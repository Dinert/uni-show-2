<template>
	<view class="goodsDetail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goodsDetail.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="goodsDetail-info">
			<view class="goodsDetail-info-price" v-if="goodsDetail.goods_price">￥{{goodsDetail.goods_price}}</view>
			<view class="goodsDetail-info-body">
				<view class="goodsDetail-info-body-name">{{goodsDetail.goods_name}}</view>
				<view class="goodsDetail-info-body-favi">
					<uni-icons type="star" size="18" color="gray" class="goodsDetail-info-body-favi-icon"></uni-icons>
					<text class="goodsDetail-info-body-favi-text">收藏</text>
				</view>
			</view>
			<view class="goodsDetail-info-yf">快递：免运费</view>
		</view>
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>

		<view class="goodsDetail-bottom">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>

	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.params.id = options.goods_id
			this.changeGoodsDetail()
		},
		data() {
			return {
				goodsDetail: {},
				params: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 9
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			ajaxGoodsDetail() {
				return uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: this.params.id
				})
			},

			async getGoodsDetail() {
				const res = await this.ajaxGoodsDetail()
				return res.data
			},

			async changeGoodsDetail() {
				const res = await this.getGoodsDetail()
				if (res.message.goods_introduce) {
					res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
						'<img style="display: block;"')
				}

				this.goodsDetail = res.message
			},

			// 预览图片
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsDetail.pics.map(x => x.pics_big)
				})
			},

			onClick(e) {
				console.log(e, 'eeee')
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},

			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goodsDetail {
		padding-bottom: 100rpx;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		&-info {
			padding: 20rpx 0 20rpx 20rpx;

			&-price {
				color: #c00000;
				font-size: 36rpx;
				margin: 20rpx 0;
			}

			&-body {
				display: flex;
				justify-content: space-between;

				&-name {
					font-size: 26rpx;
					margin-right: 20rpx;
				}

				&-favi {
					width: 240rpx;
					font-size: 24rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}

			&-yf {
				font-size: 24rpx;
				color: gray;
				margin: 20rpx 0;
			}
		}

		&-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
