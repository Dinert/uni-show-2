<template>
	<view class="address">

		<view class="address-content" v-if="JSON.stringify(getAddress) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<view class="address-info" v-else @click="chooseAddress">
			<view class="address-info-people address-info-item">
				<view class="address-info-item-left">
					收货人：{{getAddress.userName}}
				</view>
				<view class="address-info-item-right">
					<view class="address-info-item-right-iphone">电话：{{getAddress.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="address-info-address address-info-item">
				<view class="address-info-item-left">
					收货地址：{{site}}
				</view>
			</view>
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
			return {
				address: {}
			}
		},
		computed: {
			...mapGetters('cart', ['getAddress']),
			site() {
				const address = this.getAddress
				if (!address.provinceName) {
					return ''
				}
				return address.provinceName + address.cityName + address.countyName + address.detailInfo
			}
		},
		methods: {
			...mapMutations('cart', ['SET_ADDRESS']),
			async chooseAddress() {
				const [err, res] = await uni.chooseAddress().catch(err => err)


				if (err && err.errMsg === 'chooseAddress:fail cancel') {
					return
				}

				if (err === null && res.errMsg === 'chooseAddress:ok') {
					this.SET_ADDRESS(res)
				}
			}
		}
	}
</script>

<style lang="scss">
	.address {
		height: 180rpx;
		border-bottom: 3px solid #ccc;

		&-content {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&-info {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 5px;

			&-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				font-size: 26rpx;

				&-right {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
