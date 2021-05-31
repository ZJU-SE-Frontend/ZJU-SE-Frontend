<template>
	<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 10%;">
		<view class="content">
			<view class="texts" style="margin-top: 30px;">姓名：{{this.username}}</view>
			<view class="texts">预留手机号：{{this.user_phone}}</view>
			<view class="texts">体检医院：{{this.curHospital}}</view>
			<view class="texts">预约时间：{{new Date(this.curDate).toLocaleDateString()}} {{this.timeslot}}</view>
			
			<button size="mini" style="align-self: center; border-radius: 1rpx; border-color: #ffffff; 
				margin-bottom: 20px;" type="primary" @click="postConfirm">确认预约</button>
		</view>
	</view>
</template>

<script>
	import {postAppointment_Cov, fetchGet, fetchPost} from "../../../fetch/api.js";
	export default {
		data() {
			return {
				curHospital: "",
				curDate: "",
				username: "",
				user_phone: 0,
				timeslot: "",
				section:0
			}
		},
		
		onLoad: function(option) {
			this.curHospital = option.hospital;
			this.curDate = parseInt(option.appoint_date);
			this.username = option.username;
			this.user_phone = option.user_phone;
			this.timeslot = option.timeslot;
			this.section = option.section;
			this.state = "unknown";
			
			console.log("confrim "+this.section)
			},
		
		methods: {
			
			
			postConfirm() {
				

				
				console.log("post...");
				fetchPost('/api/exam/covid/appointment', {
					"userPhone": this.user_phone,
					"hospital": this.curHospital,
					"appointDate": this.curDate / 1000,
					"section": this.section
				}).then(res => {
					if (res.st == 0) {
						uni.showToast({
							title: '预约成功'
						})
						}
					else {
						uni.showToast({
							icon: 'none',
							title: '预约失败'
						})
						};
					
				})
				
				uni.switchTab({
					url:"../index"
				});
				
			}
				
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 80%;
		height: fit-content;
		margin-top: 0;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
		font-size: small;
	}
	
	.texts {
		margin-left: 30px;
	}

</style>
