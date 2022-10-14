<template>
	<view class="home">
		<uni-my-search @search-click="gotoSearch" class="ceiling"></uni-my-search>
		<uni-home-swiper></uni-home-swiper>
		<uni-home-nav-list></uni-home-nav-list>
		<uni-home-building></uni-home-building>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
