<template>
	<view class="mySearch" @click="searchClick">
		<view class="mySearch-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			searchClick() {
				this.$emit('search-click')
			}
		}
	}
</script>

<style lang="scss">
	.mySearch {
		height: 100rpx;
		background-color: #c00000;
		display: flex;
		align-items: center;
		padding: 0 20rpx;

		&-box {
			width: 100%;
			height: 72rpx;
			background-color: #fff;
			border-radius: 36rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				margin-left: 10rpx;
				font-size: 30rpx
			}
		}
	}
</style>
