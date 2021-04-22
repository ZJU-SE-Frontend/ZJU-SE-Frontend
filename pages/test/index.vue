<template>
	<view class="content">
		<image class="logo" src="/static/pharmacy/Aspirin.png"></image>
		<view class="text-area">
			<text class="status">{{localStatus}}</text>
		</view>
		<view class="text-area">
			<text class="content">{{localContent}}</text>
		</view>
		<section>
			<button type="button" @click="onLoadLocalClicked">加载本地数据</button>
		</section>
		<view class="text-area">
			<text class="status">{{remoteStatus}}</text>
		</view>
		<view class="text-area">
			<text class="content">{{remoteContent1}}</text>
		</view>
		<view class="text-area">
			<text class="content">{{remoteContent2}}</text>
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
	import {getStatic, getPharBoothList, getPharBoothDetail, postLoginIn, postJoinIn, getUserInfo} from "../../fetch/api.js"
	import {getEncryptedPassword} from "../../common/encrypt.js"
	export default {
		data() {
			return {
				localStatus: '未加载',
				localContent: '',
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
				getStatic("/pharmacy/data.json").then((res) => {
					this.localStatus = "已加载"
					this.localContent = res.data.list[0].name
				})
			},
			onLoadRemoteClicked(){
				getPharBoothList("感冒头痛", -1).then((res) => {
					this.remoteStatus = "已加载"
					this.remoteContent1 = res.data.list[0].name
				})
				getPharBoothDetail("2").then((res)=>{
					this.remoteContent2 = res.data.type
				})
			},
			onLoginClicked(){
				postLoginIn("13733333333", "123456").then((res)=>{
					if(res.st==0){
						this.loginStatus="登陆成功\n"
						getUserInfo("13733333333").then((res)=>{
							this.userInfo=res.data.userName
						})
					}
					else if(res.st==1)
						this.loginStatus="登陆失败"
				});
			}
			/*onLoginClicked(){
				postJoinIn("13744444444","hahh", "123456", 1, "test1@zju.edu.cn").then((res)=>{
					if(res.st==0)
						this.text="注册成功\n"+res.data.jwt
					else if(res.st==1)
						this.text="注册失败"
				});
			}*/
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
