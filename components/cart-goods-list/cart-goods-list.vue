<template>
	<view class="goodsList">
		<view class="goodsList-item" v-for="item in goodsList" :key="item.goods_id">
			<view class="goodsList-item-left">
				<label class="radio" @click="radioClick(item)">
					<radio :checked="item.goods_state" color="#c00000" />
				</label>
				<image :src="item.goods_small_logo"></image>
			</view>
			<view class="goodsList-item-right">
				<view class="goodsList-item-right-name" @click="goToDetail(item)">{{item.goods_name}}</view>
				<view class="goodsList-item-right-price">
					<view class="goodsList-item-right-price-value" @click="goToDetail(item)">
						￥{{item.goods_price | toFixed}}</view>
					<uni-number-box :min="1" :max="20" :value="item.goods_count" :item="item" @change="changeCount">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		props: {
			goodsList: {
				type: Array,
				default: () => ([])
			}
		},
		methods: {
			...mapMutations('cart', ['SET_CARTDATALISTState', 'SET_CARTDATALISTCount']),
			goToDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			},

			radioClick(item) {
				this.SET_CARTDATALISTState(item)
			},

			changeCount(value, item) {
				item.goods_count = value
				this.SET_CARTDATALISTCount(item)
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
			cursor: pointer;

			&-left {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 200rpx;
					height: 200rpx;
					display: block;
				}
			}

			&-right {
				margin-left: 10rpx;
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: space-between;

				spac &-name {
					font-size: 26rpx;
				}

				&-price {
					display: flex;
					justify-content: space-between;
					align-items: center;

					&-value {
						color: #C00000;
						font-size: 32rpx;
					}

				}
			}
		}
	}
</style>
