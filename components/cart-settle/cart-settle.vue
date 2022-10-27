<template>
	<view class="settle">
		<label class="settle-select">
			<radio :checked="getSelectAll" color="#c00000" @click="getSelectAllClick" /><text>全选</text>
		</label>

		<view class="settle-amount">
			合计：<text class="settle-amount-text"></text>
		</view>

		<view class="settle-right" @click="settleClick">
			结算({{getCheckedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapGetters('cart', ['getCheckedCount', 'getSelectAll']),
			...mapGetters('user', ['getToken'])
		},
		methods: {
			...mapMutations('cart', ['SET_SELECTALL']),
			getSelectAllClick() {

				this.SET_SELECTALL(!this.getSelectAll)
			},

			// 结算
			settleClick() {
				console.log(this.getToken, 'getTokengetTokengetToken')
				if (!this.getCheckedCount) {
					return uni.showToast({
						title: '请选择要结算的商品！',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.settle {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 27rpx;
		padding-left: 10rpx;

		&-select {
			display: flex;
			align-items: center;
		}

		&-amount {
			text {
				color: #c00000;
				font-weight: bold;
			}
		}

		&-right {
			background-color: #c00000;
			height: 100%;
			color: #fff;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			min-width: 180rpx;
			justify-content: center;
			font-weight: 400;
		}
	}
</style>
