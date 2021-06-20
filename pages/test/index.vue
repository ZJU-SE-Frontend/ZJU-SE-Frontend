<template>
	<view class="content">
		<image class="logo" src="/static/pharmacy/Aspirin.png"></image>
		<view class="text-area">
			<text class="content">{{localContent1}}</text>
		</view>
		<view class="text-area">
			<text class="content">{{localContent2}}</text>
		</view>
		<view class="text-area">
			<text class="content">{{localContent3}}</text>
		</view>
		<view class="text-area">
			<text class="content">{{localContent4}}</text>
		</view>
		<section>
			<button type="button" @click="onLoadLocalClicked">加载本地数据</button>
		</section>
		<view class="text-area">
			<text class="status">{{remoteStatus}}</text>
		</view>
		<section>
			<button type="button" @click="onLoadRemoteClicked">加载远程数据</button>
		</section>
		<view class="text-area">
			<text class="text" style="text-align:center">{{loginStatus}}</text>
		</view>
		<view class="text-area">
			<text class="text" style="text-align:center">{{userInfo}}</text>
		</view>
		<section>
			<button type="button" @click="onLoginClicked">登陆测试用户</button>
		</section>
	</view>
</template>

<script>
	import {postLoginIn, postJoinIn, getUserInfo, deleteAppointment, getCurrentUserPhone, getCurrentUserName, getCurrentUserRole, getCurrentUserExpireTime} from "../../fetch/api.js"
	import {getEncryptedPassword} from "../../common/encrypt.js"
	export default {
		data() {
			return {
				localContent1: '',
				localContent2: '',
				localContent3: '',
				localContent4: '',
				remoteStatus: '未加载',
				remoteContent1: '',
				remoteContent2: '',
				loginStatus: '未登录',
				userInfo: ''
			}
		},
		onLoad() {
		},
		methods: {
			onLoadLocalClicked(){
				this.localContent1 = getCurrentUserPhone()
				this.localContent2 = getCurrentUserName()
				this.localContent3 = getCurrentUserRole()
				this.localContent4 = getCurrentUserExpireTime()
			},
			onLoadRemoteClicked(){
				deleteAppointment("18888888888", new Date('2021-06-11 00:00:00'), 9).then((res)=>{
					this.remoteStatus=res.st
					console.log(res)
				})
			},
			onLoginClicked(){
				postLoginIn("18888888888", "123456789").then((res)=>{
					if(res.st==0){
						this.loginStatus="登陆成功\n"
						getUserInfo("18888888888").then((res)=>{
							this.userInfo=res.data.userName
						})
					}
					else if(res.st==1)
						this.loginStatus="登陆失败"
				});
			}
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
