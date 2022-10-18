<template>
	<goods-list :goodsList="goodsList"></goods-list>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options, 'options')
			this.params.query = options.query || ''
			this.params.cid = options.id || ''

			this.changeGoodsList()
		},
		async onPullDownRefresh() {
			this.params.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			await this.changeGoodsList()
			uni.stopPullDownRefresh()
		},
		async onReachBottom() {
			if (this.params.pagenum * this.params.pagesize >= this.total) {
				return uni.showToast({
					title: '数据加载完成',
					icon: 'none'
				})
			}
			if (!this.isLoading) {
				this.isLoading = true
				this.params.pagenum++
				await this.changeGoodsList()
				this.isLoading = false
			}
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
				total: 0,
				isLoading: false
			}
		},
		methods: {
			ajaxGoodsList() {
				return uni.$http.get('/api/public/v1/goods/search', this.params)
			},

			async getGoodsList() {
				const res = await this.ajaxGoodsList()
				return res.data
			},

			async changeGoodsList() {
				const res = await this.getGoodsList()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			}
		}
	}
</script>

<style lang="scss">

</style>
