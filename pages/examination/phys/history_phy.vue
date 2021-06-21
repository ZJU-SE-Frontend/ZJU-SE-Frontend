<template>
	<view class="page">
		<view class="content">
			<view class=myitem v-for="(val, key) in appointment">
				<view style="display: flex; flex-direction: column">
					<view style="margin-left: 10px; color: #474747; font-size: small; justify-self: center;">{{val.hospital}}</view>					
					<view style="margin-left: 10px; color: #474747; font-size: small; justify-self: center;">{{new Date(parseInt(val.appointDate)*1000).toLocaleDateString()}}</view>					
				</view>
				<view style="display: flex;">
					<image class="image" :src="img1url+val.reportStatus+'.png'" @click="onClick(val, key)"></image>
					<!-- <image class="image" :src="img2url+val.reportStatus+'.png'" @click="onClickD(val, key)"></image> -->
				</view>
					
			</view>
				
		</view>
	</view>
</template>

<script>
	import {fetchGet} from "@/fetch/api.js"
	export default {
		components: {
			
		},
		
		data() {
			return {
				img1url: "../../../static/exam/explore",
				img2url: "../../../static/exam/download",
				
				repstatus: 0,
				appointment:null,
				text: "",
				user_phone:0
			}
		},
		methods: {
			onLoad: function(option)  {
				this.user_phone = option.user_phone;
				console.log(this.user_phone);
				fetchGet('/api/exam/physical/appointment/'+this.user_phone).then(res => {
					this.appointment = res.data.appointments;
				})
			},
			onClick(val, key) {
				if (val.reportStatus == 1) {
					uni.request({
						url: '/api/exam/physical/report/'+val.appointId,
						data: '',
						method: 'GET',
						responseType: 'arraybuffer',
						header: {
						    Authorization: sessionStorage.getItem('token')
						},
						success: res => {
							let pdfData = res.data
							console.log("pdfData: "+pdfData)
							let blob = new Blob([pdfData], {
								type: 'application/pdf;charset=UTF-8'
							})
							pdfData = window.URL.createObjectURL(blob)			
							this.file_url = encodeURIComponent(pdfData)
							uni.navigateTo({
								url: "../show_report?url=" + this.file_url
							})
						}
					})
					
				} else {
					
				}
			},
			
			onClickD(val, key) {
				if (val.reportStatus == 1) {
					
					uni.request({
						url: '/api/exam/physical/report/'+val.appointId,
						data: '',
						method: 'GET',
						responseType: 'arraybuffer',
						header: {
						    Authorization: sessionStorage.getItem('token')
						},
						//TODO: Download file
						
					})
					
					
					
				} else {
					
				}
			}
		}
	}
</script>

<style>
	.page {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-image: url(../../../static/exam/bkg_info.png);
			background-size: cover;
			height: max-content;
		}
	
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 85%;
		height: fit-content;
		margin-top: 100px;
	}
	
	.myitem {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 120rpx;
		width: 100%;
		margin-top : 10rpx;
		
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
		
	.image {
			width: 35rpx;
			height: 35rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
		
</style>
