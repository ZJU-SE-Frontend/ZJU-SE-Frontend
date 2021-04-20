import axios from 'axios'
import {getEncryptedPassword} from "../common/encrypt.js"

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

function fetchPost(url, data) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
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
export function loginIn(userPhone, password){
	var data = {
		"userPhone": userPhone,
		"password": getEncryptedPassword(password)
	}
	return fetchPost(`/login`, data=data);
}
export function joinIn(userPhone, userName, password, authType=1, userEmail){
	var data = {
		"userPhone": userPhone,
		"userName": userName,
		"password": getEncryptedPassword(password),
		"authType": authType
	}
	if(userEmail !== undefined){
		data.userEmail = userEmail
	}
	return fetchPost(`/join`, data=data);
}
