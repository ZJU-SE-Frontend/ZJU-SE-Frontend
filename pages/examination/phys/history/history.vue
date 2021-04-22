<template>
	<view>
		<uni-list>
			<uni-list-item  v-for="(val, key) in appointment" :key="key"
			 :title="val.appointDate.toString()" rightText="查看报告" showArrow>
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
				appointment:null
			}
		},
		methods: {
			onLoad() {
				this.appointment = fake_fetchGet('/api/exam/physical/appointment').data.appointments
			},
		}
	}
</script>

<style>

</style>
