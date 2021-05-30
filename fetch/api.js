import axios from 'axios';
import jwt_decode from "jwt-decode";

import {
	getEncryptedPassword
} from "../common/encrypt.js";

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';

// axios请求拦截器，统一处理request
axios.interceptors.request.use((config) => {
	config.headers.Authorization = "Bearer " + uni.getStorageSync('jwt')
	return config;
}, (error) => {
	return Promise.reject(error);
});

// axios返回结果拦截器，返回状态判断
axios.interceptors.response.use((res) => {
	if(res.data.data == null){
		console.log("data is null");
		return res;
	}
	else if(res.data.data.jwt!=undefined){
		uni.setStorage({
		    key: 'jwt',
		    data: res.data.data.jwt,
		    success: function () {
		        console.log('jwt凭据保存成功');
		    }
		});
	}
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

/*基本功能API*/
export function getStatic(path) {
	return fetchGet(`/static`+path)
}


/*用户权限管理API*/
export function postLoginIn(userPhone, password) {
	var data = {
		"userPhone": userPhone,
		"password": getEncryptedPassword(password)
	}
	return fetchPost(`/api/login`, data = data);
}

export function postJoinIn(userPhone, userName, password, authType = 1, userEmail) {
	var data = {
		"userPhone": userPhone,
		"userName": userName,
		"password": getEncryptedPassword(password),
		"authType": authType
	}
	if (userEmail !== undefined) {
		data.userEmail = userEmail
	}
	return fetchPost(`/api/join`, data = data);
}

// Modified!
export function getUserInfo(userPhone){
	return fetchGet("/api/healthrecord/personInfo/"+userPhone)
}

/*电子病历模块API*/
export function getPcase(id){
	return fetchGet('/api/healthrecord/case/'+id)
}

export function getPdetail(phone,id){
	return fetchGet('/api/healthrecord/case/detail?userPhone='+phone+'&caseId='+id)
}

export function getCurrentUserPhone(){
	let token = jwt_decode(uni.getStorageSync('jwt'));
	console.log(token["user_phone"])
	return token
}

/*在线药房模块API*/
export function getPharBoothList(cata, count){
	const params = {
		"cata": cata,
		"count": count
	}
	return fetchGet(`/api/phar/booth/list`, params)
}

export function getPharBoothDetail(id){
	return fetchGet(`/api/phar/booth/detail/`+id)
}

