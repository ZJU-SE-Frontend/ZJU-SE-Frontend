<template>
	<view>
		<uni-list>
			<uni-list-item  v-for="(val, key) in appointment" :key="key"
			 :title="stampToDate(val.appointDate)" rightText="查看报告" showArrow>
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
				appointment:null,
				user_phone:0
			}
		},
		methods: {
			onLoad: function(option)  {
				this.user_phone = option.user_phone;
				console.log(this.user_phone);
				this.appointment = fake_fetchGet('/api/exam/physical/appointment').data.appointments
			},
			stampToDate(s){
				var time = new Date(s*1000);
				return time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate();
			}
		}
	}
</script>

<style>

</style>
