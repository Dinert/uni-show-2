import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'http://api-ugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = (options) => {
	uni.showLoading({
		title: '数据加载中...',
		...options
	})

}


// 响应拦截器
$http.afterRequest = (options) => {
	if (options.data && options.data.meta && options.data.meta.status !== 200) {
		uni.showToast({
			title: '数据请求失败',
			duration: 1500,
			icon: 'none'
		})
	}else {
		uni.showToast({
			title: '数据请求成功',
			duration: 1500,
			icon: 'none'
		})
	}
	uni.hideLoading()
}
