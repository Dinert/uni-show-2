export default {
	namespaced: true,
	state: {
		token: ''
	},

	getters: {
		getToken(state) {
			return state.token
		}
	}
}
