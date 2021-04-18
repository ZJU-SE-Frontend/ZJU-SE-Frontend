	import axios from 'axios'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api';

// axios请求拦截器，统一处理request
axios.interceptors.request.use((config) => {
	return config;
}, (error) => {
	return Promise.reject(error);
});

// axios返回结果拦截器，返回状态判断
axios.interceptors.response.use((res) => {
	return res;
}, (error) => {
	return Promise.reject(error);
});

function fetchGet(url, param) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: param
			})
			.then(response => {
				console.log("responsed")
				resolve(response.data)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error);
			})
	})
}

// 对应的后端接口
export function ping() {
	console.log("ping started")
	return fetchGet(`/ping`);
}
