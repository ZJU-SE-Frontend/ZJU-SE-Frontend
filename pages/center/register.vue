<template>
	<view class="content">
		<image class="logo" src="/static/center/portrate.png"></image>
 		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> 
		<section>
			<input class="uni-input" placeholder="请输入合法手机号" v-model="userPhone"></input>
		</section>
		<section>
			<input class="uni-input" placeholder="请输入用户名" v-model="username"></input>
		</section>
		<section>
			<input class="uni-input" type="password" placeholder="请输入密码" v-model="password"></input>
		</section>
		<section>
			<input class="uni-input" type="password" placeholder="再次输入密码" v-model="password2"></input>
		</section>
		<section>
			<button type="button" @click="onRegister">注册</button>
		</section>
	</view>
</template>

<script>
	import {postJoinIn} from "../../fetch/api.js";
	export default {
		data() {
			return {
				title: 'WELCOME',
				username: '',
				userPhone: '',
				password: '',
				password2: ''
			}
		},
		onLoad() {

		},
		methods: {
			onRegister(){
				if(this.userPhone==''){
					this.title='手机号不能为空'
				}
				else if(this.username==''){
					this.title='用户名不能为空'
				}
				else if(this.password!=this.password2){
					this.title='两次密码不一致'
				}
				else if(this.password==''){
					this.title='密码不能为空'
				}
				else{
					postJoinIn(this.userPhone,this.username, this.password).then((res)=>{
							if(res.st==0){
								this.title='注册成功'
								uni.navigateBack()
							}
							else{
								this.title='注册失败'
							}
						})
				}
				
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
