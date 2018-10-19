import fetch from 'node-fetch';
import ApiFromJava from '../apifromjava'
export default class BaseComponent {
	constructor () {
	}
	async baseCheckAdmin (cookie) {
		let reqJson = {}
		reqJson.url = ApiFromJava.checkIsAdmin
		reqJson.cookie = cookie
		const responseJson = await this.fetch(reqJson)
		return responseJson
	}
	// reqJson = {url:'', data: {}, type: 'GET', resType: 'JSON', cookie: cookie}
	async fetch(reqJson){
		let url = reqJson.url || ''
		let data = reqJson.data || {}
		let type = reqJson.resType || 'GET'
		let resType = reqJson.resType || 'JSON'
		type = type.toUpperCase();
		resType = resType.toUpperCase();
		if (type == 'GET') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})

			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
			}
		}

		let requestConfig = {
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Cookie': reqJson.cookie
			},
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		let responseJson;
		try {
			const response = await fetch(url, requestConfig);
			if (resType === 'TEXT') {
				responseJson = await response.text();
			}else{
				responseJson = await response.json();
			}
		} catch (err) {
			console.log('获取http数据失败', err);
			throw new Error(err)
		}
		return responseJson
	}
}