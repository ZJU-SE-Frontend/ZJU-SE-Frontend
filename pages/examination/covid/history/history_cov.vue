<template>
	<view class="page">
		<view class="content">
			<uni-list style="width: 100%;">
				<uni-list-item  v-for="(val, key) in appointment" :key="key"
				 :title="stampToDate(val.appointDate)" rightText="查看报告" showArrow>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {fake_fetchGet, fake_fetchPost} from "../../fake_backend.js";
	import {fetchGet} from "@/fetch/api.js"
	export default {
		components: {
			
		},
		
		data() {
			return {
				appointment:null,
				user_phone:0
			}
		},
		methods: {
			onLoad: function(option)  {
				this.user_phone = option.user_phone;
				console.log(this.user_phone);
				fetchGet('/api/exam/covid/appointment/'+this.user_phone).then(res => {
					this.appointment = res.data.appointments;
				})
			},
			stampToDate(s){
				var time = new Date(s*1000); 
				return time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate();
			} 
		}
	}
</script>

<style>
	.page {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-image: url(../../../../static/exam/bkg_cov.png);
			background-size: cover;
			height: max-content;
		}
	
	.content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		width: 85%;
		height: fit-content;
		margin-top: 100px;
		background-color: #FFFFFF;
		border-radius: 0px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
		
</style>
