<template>
	<view class="building">
		<view class="building-item" v-for="item in buildingList" :key="item.floor_title.name">
			<view class="building-item-title">
				<image :src="item.floor_title.image_src"></image>
			</view>
			<view class="building-item-content">

				<view class="building-item-content-left">
					<image :src="item.product_list[0].image_src"
						:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"
						@click="imageClick(item.product_list[0])"></image>
				</view>
				<view class="building-item-content-right">
					<block v-for="(item2, index) in item.product_list" :key="item2.navigator_url">
						<view class="building-item-content-right-item" v-if="index" @click="imageClick(item2)">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</view>
					</block>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			this.changeBuildingData()
		},
		data() {
			return {
				buildingList: []
			};
		},
		methods: {
			ajaxBuildingData() {
				return uni.$http.get('/api/public/v1/home/floordata')
			},

			async getBuildingData() {
				const res = await this.ajaxBuildingData()
				return res.data.message
			},

			async changeBuildingData() {
				this.buildingList = await this.getBuildingData()
			},

			imageClick(item) {
				const url = item.navigator_url.replace('/pages/goods_list', '/subpkg/goods_list/goods_list')
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.building {
		&-item {
			&-title {
				height: 60rpx;
				width: 100%;
				display: flex;

				image {
					height: 100%;
					width: 100%;
				}
			}

			&-content {
				display: flex;

				&-right {
					padding-left: 10rpx;
					justify-content: space-around;
					display: flex;
					flex-wrap: wrap;
				}
			}
		}
	}
</style>
