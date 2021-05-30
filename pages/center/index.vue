<template>
		<view class="center">
			<view class="logo" @click="Login" :hover-class="!hasLogin ? 'logo-hover' : ''">
					<image class="logo-img" :src="visitorUrl"></image>
					<view class="logo-title">
						<text class="uer-name">Hi，{{hasLogin ? "您已登录" : '您未登录'}}</text>
						<text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text>
					</view>
			</view>
			<view class="center-list">		
				<view class="center-list-item">
					<text class="list-icon">&#xe639;</text>
					<text class="list-text">姓名</text>
					<text class="list-text">{{hasLogin ? uerInfo.userName : ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
			
			<view class="center-list">
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe60b;</text>
					<text class="list-text">身高</text>
					<text class="list-text">{{hasLogin? uerInfo.userHeight: ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe65f;</text>
					<text class="list-text">体重</text>
					<text class="list-text">{{hasLogin? uerInfo.userWeight: ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item">
					<text class="list-icon">&#xe65f;</text>
					<text class="list-text">性别</text>
					<text class="list-text">{{hasLogin? uerInfo.userGender: ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
			
			<view class="center-list">
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe60b;</text>
					<text class="list-text">电话</text>
					<text class="list-text">{{hasLogin? uerInfo.userPhone: ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe60b;</text>
					<text class="list-text">电子邮箱</text>
					<text class="list-text">{{hasLogin? uerInfo.userEmail: ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe65f;</text>
					<text class="list-text">身份证号</text>
					<text class="list-text">{{hasLogin? uerInfo.userIDNumber: ''}}</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item" v-show="hasLogin" @click="patientView">
					<text class="list-icon">&#xe65f;</text>
					<text class="list-text">病历</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
			<view class="center-list">
				<view class="center-list-item border-bottom" v-show="hasLogin" @click="exit">
					<text class="list-icon">&#xe60f;</text>
					<text class="list-text">退出登录</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
		</view>
		 
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: mapState([ 'hasLogin','uerInfo']),
		data() {
			return {
				visitorUrl: "../../static/center/logo.png",
				history_title:  '',
			}
		},
		
		onLoad() {
		},
		methods: {
			checkLogin(){
				if(!this.hasLogin){
					uni.navigateTo({
						url:"../login/login"
					})
				}
			},
			Login(){
				this.checkLogin();
				if(this.hasLogin){
					console.log("hahaha")
				}
			},
			patientView(){
				//console.log("hello")
				uni.navigateTo({
					url:"./patient?phone="+this.uerInfo.userPhone
				})
			},
			exit(){
				console.log("exit")
				this.logout()
			},
			...mapMutations(['logout'])
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	button {
		width: 100%;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750rpx;
		height: 240rpx;
		padding: 40rpx;
		box-sizing: border-box;
		background-color: #0faeff;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
	}

	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		color: #FFFFFF;
	}

	.login-title {
		height: 150rpx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		width: 750rpx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90rpx;
		width: 750rpx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0rpx 20rpx;
	}

	.border-bottom {
		border-bottom-width: 1rpx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #0faeff;
		text-align: center;
		font-family: texticons;
		margin-right: 20rpx;
	}

	.list-text {
		height: 90rpx;
		line-height: 90rpx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90rpx;
		width: 40rpx;
		line-height: 90rpx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
