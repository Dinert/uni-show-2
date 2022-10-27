<template>
	<view class="cart">
		<block v-if="getCartDataList && getCartDataList.length">
			<view class="cart-address">
				<cart-address></cart-address>
			</view>
			<view class="cart-body">
				<view class="cart-body-title">
					<uni-icons type="shop" size="18"></uni-icons>
					<text class="cart-body-title-text">购物车</text>
				</view>
				<view class="cart-body-body">
					<cart-goods-list></cart-goods-list>
				</view>
			</view>
			<cart-settle class="cart-settle"></cart-settle>
		</block>
		<view class="cart-empty" v-else>
			空空如也~
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
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
		display: flex;
		flex-direction: column;

		&-address {}

		&-body {
			flex: 1;
			display: flex;
			flex-direction: column;
			height: 0;

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

			&-body {
				height: 0;
				flex: 1;
				overflow-y: auto;
			}
		}


		&-empty {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 40rpx;
			color: #ccc;
		}

	}
</style>
