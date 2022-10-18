<template>
	<view class="cart">
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<view class="cart-body">
			<cart-goods-list :goodsList="getCartDataList"></cart-goods-list>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		onShow() {
			this.SET_TABBARBADGE()
		},
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('cart', ['getCartDataList'])
		},
		methods: {
			...mapMutations('cart', ['SET_TABBARBADGE']),
		}
	}
</script>

<style lang="scss">
	.cart {
		height: 100%;
		overflow-y: auto;

		&-title {
			height: 80rpx;
			display: flex;
			align-items: center;
			padding-left: 10rpx;
			border-bottom: 1px solid #efefef;

			&-text {
				font-size: 28rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
