<template>
	<view class="login">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="login-detail">
			登录后尽享更多权益~
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
			getUserInfo(e) {
				console.log(e.detail.userInfo)
			}
		}
	}
</script>

<style lang="scss">
	.login {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30%;

		&-btn[type] {
			width: 90%;
			background-color: #c00000;
			margin: 0rpx auto 30rpx;
			border-radius: 100rpx;
		}

		&-detail {
			font-size: 24rpx;
			color: #ccc;
		}
	}
</style>
