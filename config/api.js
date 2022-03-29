import HTTP from './request.js'
//調用函數，內部會掛載生成的http實例 到 uni.$u.http上
HTTP()

const http = uni.$u.http

// 在線fastmock測試
export const getTestData = () => http.get('https://www.fastmock.site/mock/54c5948907be28471a29858a5f815199/api/data')

	// 获取动态列表
export const getFeeds = params => http.get('/feeds', params)
	// 获取资讯列表信息
export const getNews = params => http.get('/news', params)