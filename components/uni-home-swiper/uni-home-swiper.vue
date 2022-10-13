<template>
		<swiper :indicator-dots="true" :autoplay="true" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
</template>

<script>
	export default {
		created() {
			this.changeSwiperData()
		},
		data() {
			return {
				swiperList: []
			};
		},
		methods: {
			ajaxSwiperData() {
				return uni.$http.get('/api/public/v1/home/swiperdata')
			},
			
			async getSwiperData() {
				const res = await this.ajaxSwiperData()
				return res.data.message
			},
			
			async changeSwiperData() {
				this.swiperList = await this.getSwiperData()
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		
		.swiper-item,image{
			width: 100%;
			height: 100%;
		}
	}

</style>