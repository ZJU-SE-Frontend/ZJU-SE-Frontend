<template>
	<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 10%;">
		<view class="content">
			<view class="texts" style="margin-top: 30px;">姓名：{{this.username}}</view>
			<view class="texts">预留手机号：{{this.user_phone}}</view>
			<view class="texts">体检医院：{{this.curHospital}}</view>
			<view class="texts">预约时间：{{new Date(this.curDate).toLocaleDateString()}} {{this.timeslot}}</view>
			
			<button size="mini" style="align-self: center; border-radius: 1rpx; border-color: #ffffff; margin-bottom: 20px;" type="primary">确认预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curHospital: "",
				curDate: "",
				username: "",
				user_phone: 0,
				timeslot: ""
			}
		},
		methods: {
			onLoad: function(option) {
				this.curHospital = option.hospital;
				this.curDate = parseInt(option.appoint_date);
				this.username = option.username;
				this.user_phone = option.user_phone;
				this.timeslot = option.timeslot;
				
				console.log(this.curHospital + this.curDate + this.username + this.user_phone)
				},
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
