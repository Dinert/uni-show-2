<template>
	<view class="search">
		<uni-search-bar class="ceiling" @confirm="search" @input="input" placeholder="请输入搜索内容" :radius="100"
			:value="value" cancelButton="none">
		</uni-search-bar>
		<view class="search-list" v-if="searchResult && searchResult.length">
			<view class="search-list-item" v-for="item in searchResult" :key="item.goods_id" @click="gotoDetail(item)">
				<view class="search-list-item-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="search-history" v-else>
			<view class="search-history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18" @click="deleteClick"></uni-icons>
			</view>
			<view class="search-history-list">
				<uni-tag :text="item" v-for="(item, index) in historyList" :key="index" @click="historyClick(item)">
				</uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('searchHistoryList') || '[]')
		},
		data() {
			return {
				timer: null,
				value: '',
				searchResult: [],
				historyList: []
			};
		},
		methods: {
			search() {

			},
			input(value) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.value = value
					this.ajaxSearchResult(value)
				}, 500)
			},

			// 搜索数据
			async ajaxSearchResult(value) {
				if (value && value.length) {
					const res = await uni.$http.get('/api/public/v1/goods/qsearch', {
						query: value
					})
					this.searchResult = res.data.message

					this.saveHistoryList(value)
				} else {
					this.searchResult = []
				}
			},

			// 保存历史数据
			saveHistoryList(value) {
				if (!this.historyList.includes(value)) {
					this.historyList.unshift(value)

					uni.setStorageSync('searchHistoryList', JSON.stringify(this.historyList))
				}
			},

			// 跳转到详情
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?id=' + item.id
				})
			},

			// 历史数据的点击
			historyClick(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			},

			// 删除历史数据
			deleteClick() {
				this.historyList = []
				uni.setStorageSync('searchHistoryList', '' + this.historyList)
			}
		}
	}
</script>

<style lang="scss">
	.search {
		&-list {
			padding: 0 10rpx;

			&-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24rpx;
				padding: 26rpx 0;
				border-bottom: 1px solid #efefef;

				&-name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-right: 3rpx;
				}
			}
		}

		&-history {
			&-title {
				display: flex;
				justify-content: space-between;
				padding: 0 10rpx;
				height: 80rpx;
				align-items: center;
				font-size: 26rpx;
				border-bottom: 1px solid #efefef;
			}

			&-list {
				display: flex;
				flex-wrap: wrap;
				padding: 0 10rpx;
				margin-top: 10rpx;

				text.uni-tag {
					margin-right: 10rpx;
					background-color: #efefef;
					border-color: #efefef;
					color: #333;
				}
			}
		}
	}

	.ceiling {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
