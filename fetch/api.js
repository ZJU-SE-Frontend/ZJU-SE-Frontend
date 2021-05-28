import axios from 'axios'
import {
	getEncryptedPassword
} from "../common/encrypt.js"

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';

// axios请求拦截器，统一处理request
axios.interceptors.request.use((config) => {
//	config.headers.Authorization = "Bearer " + uni.getStorageSync('jwt')
	return config;
}, (error) => {
	return Promise.reject(error);
});

// axios返回结果拦截器，返回状态判断
axios.interceptors.response.use((res) => {
//	if(res.data.data.jwt!=undefined){
//		uni.setStorage({
//		    key: 'jwt',
//		    data: res.data.data.jwt,
//		    success: function () {
//		        console.log('jwt凭据保存成功');
//		    }
//		});
//	}
	return res;
}, (error) => {
	return Promise.reject(error);
});

export function fetchGet(url, param) {
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

export function fetchPost(url, data) {
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

export function fetchPut(url, data) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
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

export function getUserInfo(userPhone){
	return fetchGet("/api/user/info/"+userPhone)
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


/* 健康检测模块API */

export function getHospitalList_Phy() {
	return fetchGet(`/api/exam/physical/hospital`)
}

export function getRemainder_Phy(hospital, appoint_date) {
	const params = {
		"hospital": hospital,
		"appoint_date": appoint_date
	}
	return fetchGet(`/api/exam/physical/remainder`, params)
}

export function postAppointment_Phy(tel, hospital, date, section) {
	var data = {
		"user_Phone": tel,
		"hospital": hospital,
		"appoint_date": date,
		"section": section
	}
	return fetchPost(`/api/exam/physical/appointment`, data = data);
}

export function getAppointments_Phy(tel) {
	return fetchGet(`/api/exam/physical/appointment/`, tel)
}

export function getReport_Phy(appoint_id) {
	return fetchGet(`/api/exam/physical/report/`, appoint_id)
}


export function getHospitalList_Cov() {
	return fetchGet(`/api/exam/covid/hospital/`)
}

export function getRemainder_Cov(hospital, appoint_date) {
	const params = {
		"hospital": hospital,
		"appoint_date": appoint_date
	}
	return fetchGet(`/api/exam/covid/remainder`, params)
}

export function postAppointment_Cov(tel, hospital, date, section) {
	var data = {
		"user_Phone": tel,
		"hospital": hospital,
		"appoint_date": date,
		"section": section
	}
	return fetchPost(`/api/exam/covid/appointment`, data = data);
}

export function getAppointments_Cov(tel) {
	return fetchGet(`/api/exam/covid/appointment/`, tel)
}

export function getReport_Cov(appoint_id) {
	return fetchGet(`/api/exam/covid/report/`, appoint_id)
}