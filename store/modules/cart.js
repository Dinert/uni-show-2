export default {
	namespaced: true,
	state: {
		cartList: [{
			icon: 'shop',
			text: '店铺',
			infoColor: "red"
		}, {
			icon: 'cart',
			text: '购物车',
			info: 0
		}],
		cartButtonGroupList: [{
				text: '加入购物车',
				backgroundColor: '#ff0000',
				color: '#fff'
			},
			{
				text: '立即购买',
				backgroundColor: '#ffa200',
				color: '#fff'
			}
		],
		cartDataList: JSON.parse(uni.getStorageSync('cartDataList') || '[]'),

		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),

		selectAll: JSON.parse(uni.getStorageSync('selectAll') || true),
	},
	getters: {
		getCartList(state) {
			return state.cartList
		},
		getCartButtonGroupList(state) {
			return state.cartButtonGroupList
		},
		getCartDataList(state) {
			return state.cartDataList
		},
		getTotal(state) {
			let total = 0
			const cartDataList = state.cartDataList

			cartDataList.forEach(item => {
				total += item.goods_count || 0
			})

			return total
		},

		getAddress(state) {
			return state.address
		},

		getCheckedCount(state) {
			let result = 0
			state.cartDataList.forEach(item => {
				if (item.goods_state) {
					result += ((item.goods_count * item.goods_price) || 0)
				}
			})
			return result
		},

		getCountAll(state) {
			let result = 0
			state.cartDataList.forEach(item => {
				result += ((item.goods_count * item.goods_price) || 0)
			})
			return result
		},

		getSelectAll(state, getters) {
			return state.selectAll && getters.getCountAll === getters.getCheckedCount
		}
	},
	mutations: {
		SET_CARINFO(state, pyload) {
			state.cartList[1].info = pyload
		},

		SET_CARTDATALIST(state, pyload) {
			const findResult = state.cartDataList.find(item => item.goods_id === pyload.goods_id)
			if (findResult === undefined) {
				state.cartDataList.push(pyload)
				this.commit('cart/SET_CARINFO', pyload.goods_count)
			} else {
				findResult.goods_count++
				this.commit('cart/SET_CARINFO', findResult.goods_count)
			}

			uni.setStorageSync('cartDataList', JSON.stringify(state.cartDataList))
		},

		SET_TABBARBADGE() {
			uni.setTabBarBadge({
				index: 2,
				text: this.getters['cart/getTotal'] + ''
			})
		},

		SET_CARTDATALISTState(state, pyload) {
			const findResult = state.cartDataList.find(item => item.goods_id === pyload.goods_id)
			findResult.goods_state = !findResult.goods_state
			uni.setStorageSync('cartDataList', JSON.stringify(state.cartDataList))
		},

		SET_CARTDATALISTCount(state, pyload) {
			const findResult = state.cartDataList.find(item => item.goods_id === pyload.goods_id)
			findResult.goods_count = pyload.goods_count

			uni.setStorageSync('cartDataList', JSON.stringify(state.cartDataList))
			this.commit('cart/SET_TABBARBADGE')
		},

		DELETE_CARTDATALIST(state, pyload) {
			state.cartDataList = state.cartDataList.filter(item => {
				return item.goods_id !== pyload.goods_id
			})

			uni.setStorageSync('cartDataList', JSON.stringify(state.cartDataList))

			this.commit('cart/SET_TABBARBADGE')
		},

		SET_ADDRESS(state, pyload) {
			uni.setStorageSync('address', JSON.stringify(pyload))
			state.address = pyload
		},

		SET_SELECTALL(state, pyload) {

			state.cartDataList.forEach(item => {
				item.goods_state = pyload
			})

			state.selectAll = pyload

			uni.setStorageSync('selectAll', JSON.stringify(pyload))
			uni.setStorageSync('cartDataList', JSON.stringify(state.cartDataList))
		}


	},
	actions: {
		saveCartDataList() {}
	}
}
