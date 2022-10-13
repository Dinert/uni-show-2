<template>
	<view class="navList">
		<view class="navList-item" v-for="item in navList" :key="item.name" @click="navClick(item)">
			<image class="navList-item-image" :src="item.image_src"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uni-home-nav-list",
		created() {
			this.changeNavListData()
		},
		data() {
			return {
				navList: []
			};
		},
		methods: {
			ajaxNavListData() {
				return uni.$http.get('/api/public/v1/home/catitems')
			},

			async getNavListData() {
				const res = await this.ajaxNavListData()
				return res.data.message
			},

			async changeNavListData() {
				this.navList = await this.getNavListData()
			},
			
			navClick(item) {
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.navList{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	&-item{
	
		
		&-image{
			width: 128rpx;
			height: 140rpx;
		}
	}
}
</style>
