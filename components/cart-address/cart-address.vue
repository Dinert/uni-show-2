<template>
	<view class="address">

		<view class="address-content" v-if="JSON.stringify(getAddress) === '{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<view class="address-info" v-else>
			<view class="address-info-people address-info-item">
				<view class="address-info-item-left">
					收货人：xxx
				</view>
				<view class="address-info-item-right">
					<view class="address-info-item-right-iphone">电话：</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="address-info-address address-info-item">
				<view class="address-info-item-left">
					收货地址：aaaaaaaaaaaaaaaaaaaa
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				address: {}
			}
		},
		computed: {
			...mapGetters('cart', ['getAddress'])
		},
		methods: {
			async chooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				console.log(err, succ, 'succccccccccccc')
				
				// 用户没有授权
				if(err && err.errMsg) {
					this.ajaxUserAuth()
				}
				
				if(err === null && succ.errMsg === 'chooseAddress:ok') {
					console.log(succ, 'succccccccccccc')
					this.address = succ
				}
			},
			
			// 用户授权请求
			async ajaxUserAuth() {
				const [err, confirmResult] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去设置打开',
					confirmText: "打开",
					cancelText: '取消'
				})
				
				if(confirmResult.cancel) {return}
				
				return uni.openSetting({
					success: (res) => {
						console.log(res, 'ressss')
					}
				})
				
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

				&-right {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
