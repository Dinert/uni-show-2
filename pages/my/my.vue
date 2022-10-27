<template>
	<view class="my">
		<my-login></my-login>
	</view>
</template>

<script>
	import {
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
		methods: {
			...mapMutations('cart', ['SET_TABBARBADGE']),
		}
	}
</script>

<style lang="scss">
	.my {
		height: 100%;
	}
</style>
