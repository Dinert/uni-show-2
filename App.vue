<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-page-body,
	page {
		height: 100%;
	}

	.ceiling {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
