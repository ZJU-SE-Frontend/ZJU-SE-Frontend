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
			<button type="button" @click="onLoadLocalClicked">加载用户数据</button>
		</section>
		<view class="text-area">
			<text class="status">{{remoteStatus}}</text>
		</view>
		<section>
			<button type="button" @click="onLoadRemoteClicked">加载远程数据</button>
		</section>
	</view>
</template>

<script>
	import {postLoginIn, postJoinIn, getUserInfo, deleteAppointment, getCurrentUserExpireTime} from "../../fetch/api.js"
	import store from "@/common/store.js"
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
				if(store.state.hasLogin){
					this.localContent1 = store.state.uerInfo.userPhone
					this.localContent2 = store.state.uerInfo.userName
					this.localContent3 = store.state.uerInfo.authType
					this.localContent4 = getCurrentUserExpireTime()
				}
				else{
					uni.showToast({
						icon:"none",
						title:"您未登录"
					})
				}
			},
			onLoadRemoteClicked(){
				deleteAppointment("18888888888", new Date('2021-06-11 00:00:00'), 9).then((res)=>{
					this.remoteStatus=res.st
					console.log(res)
				})
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
