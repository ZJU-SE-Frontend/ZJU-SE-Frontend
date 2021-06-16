import axios from 'axios';
import jwt_decode from "jwt-decode";

import {
	getEncryptedPassword
} from "../common/encrypt.js";

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';
// #ifdef MP-WEIXIN
axios.defaults.baseURL = 'http://121.41.94.85:5000';
// #endif



// axios请求拦截器，统一处理request
axios.interceptors.request.use((config) => {
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

// #ifdef MP-WEIXIN
axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                console.log("执行完成：",response)
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}
// #endif



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

/* 健康论坛模块API */

export function getPostList(params) {
	return fetchGet("/api/forum/post", params)
}

export function getPost(topicId) {
	return fetchGet("/api/forum/post/" + topicId)
}

export function publicPost(params) {
	return fetchPost("/api/forum/post", params)
}

export function addViewCnt(topicId) {
	return fetchPut('/api/forum/post/addViewCnt/' + topicId)
}
 
export function getLikeInfo(topicId, params) {
	return fetchGet('/api/forum/post/like/' + topicId, params)
}

export function getReplyLikeInfo(replyId, params) {
	return fetchGet('/api/forum/post/reply/like/' + replyId, params)
}

export function postLike(topicId, params) {
	return fetchPost("/api/forum/post/like/" + topicId, params)
}

export function fetchDelete(url, data) {
	return new Promise((resolve, reject) => {
		axios.delete(url, data)
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

export function deletePost(topicId) {
	const params = {
		"title" : "",
		"content" : ""
	}
	return fetchPut('/api/forum/post/' + topicId, params)
}

export function modifyPost(topicId, params) {
	return fetchPut('/api/forum/post/' + topicId, params)
}

export function deleteLike(topicId, params) {
	return fetchDelete("/api/forum/post/like/" + topicId +'?userPhone=' + params.userPhone)
}

export function getFavoriteInfo(topicId, params) {
	return fetchGet('/api/forum/post/favorite/' + topicId, params)
}

export function addToFavorite(topicId, params) {
	return fetchPost("/api/forum/post/favorite/" + topicId, params)
}

export function removeFromFavorite(topicId, params) {
	return fetchDelete("/api/forum/post/favorite/" + topicId +'?userPhone=' + params.userPhone)
}

export function reportPostReply(replyId) {
	return fetchPost('/api/forum/report/post/reply/' + replyId)
}

//只考虑个人页面中的信息显示，封装了参数

export function getUserFavoritePost(userPhone,pageSize,pageNo){
	const params = {		
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/post/favorite/user/"+userPhone,params)
}

export function getUserFavoriteQuestion(userPhone,pageSize,pageNo){
	const params = {		
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/qa/question/favorite/user/"+userPhone,params)
}

export function getUserFavoriteAnswer(userPhone,pageSize,pageNo){
	const params = {		
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/qa/answer/favorite/user/"+userPhone,params)
}



export function getUserPost(userPhone,pageSize,pageNo){
	const params = {		
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/post/user/"+userPhone,params)
}

export function getUserQuestion(userPhone,pageSize,pageNo){
	const params = {
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/qa/question/user/"+userPhone,params)
}

export function getUserAnswer(userPhone,pageSize,pageNo){
	const params = {
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/qa/answer/user/"+userPhone,params)
}

export function getTopicReplies(topicId, params) {
	return fetchGet("/api/forum/post/reply/" + topicId, params)
}

export function publicReply(topicId, params) {
	return fetchPost("/api/forum/post/reply/" + topicId, params)
}

export function editReply(replyId, params) {
	return fetchPut("/api/forum/post/reply/" + replyId, params)
}

export function deleteReply(replyId) {
	return fetchDelete("/api/forum/post/reply/" + replyId)
}

export function getQuestionList(pageSize, pageNo) {
	const params = {
		'pageSize' : pageSize,
		'pageNo' : pageNo
	}
	return fetchGet("/api/forum/qa/question", params)
}

export function getQuestion(questionId) {
	return fetchGet("/api/forum/qa/question/" + questionId)
}

export function publicQuestion(params) {
	return fetchPost("/api/forum/qa/question", params)
}

export function addQaViewCnt(topicId) {
	return fetchPut('/api/forum/qa/question/addViewCnt/' + topicId)
}

export function getQaLikeInfo(topicId, params) {
	return fetchGet('/api/forum/qa/answer/like/user/' + topicId, params)
}

export function postQaLike(topicId, params) {
	return fetchPost("/api/forum/qa/answer/like/" + topicId, params)
}

export function deleteQaLike(topicId, params) {
	return fetchDelete("/api/forum/qa/answer/like/" + topicId +'?userPhone=' + params.userPhone)
}

export function getQaFavoriteInfo(topicId, params) {
	return fetchGet('/api/forum/qa/answer/favorite/' + topicId, params)
}

export function addToQaFavorite(topicId, params) {
	return fetchPost("/api/forum/qa/answer/favorite/" + topicId, params)
}

export function removeFromQaFavorite(topicId, params) {
	return fetchDelete("/api/forum/qa/answer/favorite/" + topicId +'?userPhone=' + params.userPhone)
}

export function getAnswer(answerId, params) {
	return fetchGet("/api/forum/qa/answer/" + answerId, params)
}

export function getAnswerContent(questionId) {
	return fetchGet("/api/forum/qa/answer/content/" + questionId)
}

export function deleteAnswer(questionId) {
	return fetchDelete("/api/forum/qa/answer/" + questionId)
}

export function publicAnswer(questionId, params) {
	return fetchPost("/api/forum/qa/answer/" + questionId, params)
}

export function addAnswerViewCnt(questionId) {
	return fetchPut('/api/forum/qa/answer/addViewCnt/' + questionId)
}

export function getQaTopicReplies(topicId, params) {
	return fetchGet("/api/forum/qa/answer/reply/" + topicId, params)
}

export function publicQaReply(topicId, params) {
	console.log('asdasdasdasd' + params.userPhone)
	return fetchPost("/api/forum/qa/answer/reply/" + topicId, params)
}

export function deleteQaReply(topicId) {
	return fetchDelete("/api/forum/qa/answer/reply/" + topicId)
}
export function getdepart(hos){
	return fetchGet("/api/appointment/patient/department/"+hos)
}
export function gethospital(){
	return fetchGet("/api/appointment/patient/hospital")
}
export function getsubdep(dep,hosp){
	const params = {
		"hospital": hosp
	}
	return fetchGet("/api/appointment/patient/subdepart/" + dep,params)
}
export function getdoctor(hosp,dep){
	const params = {
		"hospital": hosp,
		"department":dep
	}
	return fetchGet("/api/appointment/patient/doctorList",params)
}
