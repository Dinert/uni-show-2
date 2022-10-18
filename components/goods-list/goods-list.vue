<template>
	<view class="goodsList">
		<view class="goodsList-item" v-for="item in goodsList" :key="item.cat_id" @click="goToDetail(item)">
			<view class="goodsList-item-left">
				<image :src="item.goods_small_logo"></image>
			</view>
			<view class="goodsList-item-right">
				<view class="goodsList-item-right-name">{{item.goods_name}}</view>
				<view class="goodsList-item-right-price">
					￥{{item.goods_price | toFixed}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsList: {
				type: Array,
				default: () => ([])
			}
		},
		methods: {
			goToDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goodsList {
		&-item {
			display: flex;
			padding: 20rpx 10rpx;
			border-bottom: 1px solid #f0f0f0;

			&-left {
				image {
					width: 200rpx;
					height: 200rpx;
					display: block;
				}
			}

			&-right {
				margin-left: 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				spac &-name {
					font-size: 26rpx;
				}

				&-price {
					color: #C00000;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
