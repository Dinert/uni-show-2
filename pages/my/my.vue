<template>
	<view>

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

</style>
