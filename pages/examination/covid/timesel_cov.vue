<template>
	<view class="page">
		<view class="content">
			<uni-list style="width: 100%">
				<uni-list-item  v-for="(val, key) in remainder" :disabled="val<=0" :key="key" link="" @click="onClick(val, key)"
				 :title="convertText[key]" showArrow show-badge="true" :badge-text="val.toString()"
				 >
				</uni-list-item>
			</uni-list>
		</view>
	</view>
	
</template>

<script>
	import {fetchGet} from "@/fetch/api.js";
	export default {
		components: {
			
		},
		
		data() {
			return {
				curHospital: "",
				curDate: 0,
				username: "",
				user_phone: 0,
				
				
				convertText: ["8:00-9:00","9:00-10:00","10:00-11:00","11:00-12:00",
					"13:30-14:30","14:30-15:30","15:30-16:30","16:30-17:30"],
				remainder: null
			}
		},
		methods: {
			onLoad: function(option) {
				this.curHospital = option.hospital;
				this.curDate = new Date(option.appoint_date).getTime();
				console.log(this.curDate + '[CURDATE]')
				this.username = option.username;
				this.user_phone = option.user_phone;
				fetchGet('/api/exam/covid/remainder/',{
					hospital: this.curHospital,
					appointDate: this.curDate / 1000
				}).then(res => {
					this.remainder = res.data.sections;
				})
			}, 
			onClick(val, key) {
				console.log(this.convertText[key])
				console.log(val)
				if (val>0) {
					uni.navigateTo({
						url: "confirm_cov?hospital=" + this.curHospital
							+ "&appoint_date=" +  this.curDate
							+ "&username=" +  this.username
							+ "&user_phone=" +  this.user_phone
							+ "&timeslot=" +  this.convertText[key]
							+ "&section=" +  parseInt(key+1)
					})
				}
			},
		}
	}
</script>

<style>
	.page {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-image: url(../../../static/exam/bkg_cov.png);
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
