<template>
	<view class="content">
		<view class="welcome">
			<text style="color: #FFFFFF ; font-size: larger; font-weight: 700;">  {{welcome}} </text>
		</view>
		<view class="grid-content">
			<view class="section">
				<image src="/static/exam/covid.png" class="image" mode="aspectFit"/>
				<view class="item">
					<image src="/static/exam/history_cov.png" class="mimage" mode="aspectFit" @click="gotoCovRecord()"/>
					<image src="/static/exam/notice.png" class="mimage" mode="aspectFit" @click="gotoCovNotice()"/>
					<image src="/static/exam/shedule.png" class="mimage" mode="aspectFit" @click="gotoCov()"/>
				</view>
			</view>
			
			<view class="section">
				<image src="/static/exam/phy.png" class="image" mode="aspectFit"/>
				<view class="item">
					<image src="/static/exam/history_phy.png" class="mimage" mode="aspectFit" @click="gotoPhyRecord()"/>
					<image src="/static/exam/notice.png" class="mimage" mode="aspectFit" @click="gotoPhyNotice()"/>
					<image src="/static/exam/shedule.png" class="mimage" mode="aspectFit" @click="gotoPhy()"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from "@/common/store.js"
	import {getHospitalList_Phy, fetchGet} from "@/fetch/api.js";
	export default {
		data() {
			return {
				title: '体检中心',
				username: '',
				userphone: '',
				welcome: ''
			}
		},
		
		onShow() {
			if (store.state.hasLogin != false) {
				this.username = store.state.uerInfo.userName,
				this.userphone = store.state.uerInfo.userPhone,
				this.welcome = "你好，" + this.username
			} else {
				this.welcome = "请先登录"
			}
		},
		
		methods: {
			gotoPhy() {
				if(store.state.hasLogin == false){
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
				else{
					fetchGet('/api/exam/hospital/'+store.state.uerInfo.userPhone).then(res =>{
						if(res.st == 0) uni.navigateTo({
							url:"phys/server?hospital=" + res.data
						})
						else uni.navigateTo({
							url:"phys/phys?username=" + store.state.uerInfo.userName + "&userphone=" + store.state.uerInfo.userPhone
						})
					})
				
				}
			},
			
			gotoCov() {
				if(store.state.hasLogin == false){
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
				else{
					fetchGet('/api/exam/hospital/'+store.state.uerInfo.userPhone).then(res =>{
						if(res.st == 0) uni.navigateTo({
							url:"covid/server?hospital=" + res.data
						})
						else uni.navigateTo({
							url:"covid/covid?username=" + store.state.uerInfo.userName + "&userphone=" + store.state.uerInfo.userPhone
						})
					})
				}
			},
			
			gotoCovRecord() {
				if(store.state.hasLogin == false){
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
				else{
					uni.navigateTo({
						url:"covid/history_cov?user_phone=" + this.userphone
					})
				}
			},
			
			gotoPhyRecord() {
				if(store.state.hasLogin == false){
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
				else{
					uni.navigateTo({
						url:"phys/history_phy?user_phone=" + this.userphone
					})
				}
			},
			
			gotoCovNotice() {
				uni.navigateTo({
					url:"covid/notice_cov"
				})
			},
			
			gotoPhyNotice() {
				uni.navigateTo({
					url:"phys/notice_phy"
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		background-image: url(../../static/exam/bkg_index.png);
		background-size: cover;
	}
	
	.welcome {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-start;
		margin-top: 80px;
		margin-bottom: 10px;
		width: 85%;
	}
	
	.grid-content {
		margin-top: 10px;
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content:  space-between;

	}
	
	.section {
		width: 40%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
		border-radius: 5px;
		padding: 10px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
	
	.item {
		width: 80%;
		margin-top: 10px;
		margin-bottom: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.image {
		width: 200rpx;
		height: 60rpx;
	}
	
	.mimage {
		width: 170rpx;
		height: 60rpx;
	}


	.title {
		font-size: 20rpx;
		margin-top: 10rpx;
		font-weight: 500;
		color: #000000;
	}
</style>
