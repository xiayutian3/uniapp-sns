// 此vm参数为页面的实例，可以通过它引用vuex中的变量
const Http = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		// config.baseURL = 'https://www.example.com'; /* 根域名 */
		
		//h5环境下需要配置跨域的问题，不是h5下就不用
		
		// #ifdef H5
			config.baseURL = ''  //请求基本路径地址
		// #endif
		// #ifndef H5
			config.baseURL = 'http://47.265.23.15/api/v2'  //生产地址
		// #endif
		
		// config.baseURL = ''
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		config.header = {
			...config.header,
			a: 1 // 演示拦截器header加参
		}
		// 演示custom 用处
		// if (config.custom.auth) {
		//   config.header.token = 'token'
		// }
		// if (config.custom.loading) {
		//  uni.showLoading()
		// }
		// 演示
		// if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
		// 	return Promise.reject(config)
		// }
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
		//    	return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
		// if (response.config.custom.verification) { // 演示自定义参数的作用
		//   	return response.data
		// }


		// console.log(response)
		return response
	}, (response) => {
		/*  对响应错误做点什么 （statusCode !== 200）*/
		console.log(response)
		return Promise.reject(response)
	})
}

export default Http
