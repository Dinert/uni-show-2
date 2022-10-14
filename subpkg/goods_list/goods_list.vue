<template>
	<view class="goodsList">
		商品列表
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options, 'options')
			this.params.query = options.query || ''
			this.params.cid = options.id || ''
		},
		data() {
			return {
				// 请求参数
				params: {
					query: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0
			}
		}
	}
</script>

<style lang="scss">
	.goodsList {}
</style>
