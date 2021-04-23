<template>
	<view>
		<uni-list>
			<uni-list-item  v-for="(val, key) in remainder" :key="key" link="" @click="onClick(key)"
			 :title="convertText[key]" showArrow show-badge="true" :badge-text="val.toString()"
			 :disabled="val<=0">
			</uni-list-item>
		</uni-list>
	</view>
	
</template>

<script>
	import {fake_fetchGet, fake_fetchPost} from "../../fake_backend.js";
	export default {
		components: {
			
		},
		
		data() {
			return {
				curHospital: "",
				curDate: "",
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
				this.curDate = option.appoint_date;
				this.username = option.username;
				this.user_phone = option.user_phone;
				this.remainder = fake_fetchGet('/api/exam/physical/remainder').data.sections;
			},
			onClick(key) {
				console.log(this.convertText[key])
				uni.navigateTo({
					url: "../confirm/confirm_phy?hospital=" + this.curHospital
						+ "&appoint_date=" +  this.curDate
						+ "&username=" +  this.username
						+ "&user_phone=" +  this.user_phone
						+ "&timeslot=" +  this.convertText[key]
				})
			},
		}
	}
</script>

<style>

</style>
