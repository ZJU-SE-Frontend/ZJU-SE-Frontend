<template>
	<view class="page">
		<view class="content">
			<uni-list style="width: 100%;">
				<uni-list-item  v-for="(val, key) in appointment" :key="key"
				 :title="new Date(parseInt(val.appointDate)*1000).toLocaleDateString()" rightText="查看报告"
				 showArrow link="" @click="onClick(val, key)">
				</uni-list-item>
			</uni-list>
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
				appointment:null,
				text: "",
				user_phone:0
			}
		},
		methods: {
			onLoad: function(option)  {
				this.user_phone = option.user_phone;
				console.log(this.user_phone);
				// fetchGet('/api/exam/covid/appointment/'+this.user_phone).then(res => {
				fetchGet('/api/exam/covid/appointment/'+18888888888).then(res => {
					this.appointment = res.data.appointments;
				})
			},
			onClick(val, key) {
				if (val.reportStatus == 1) {
					
					uni.request({
						// url: '/api/exam/covid/report/'+val.appointId,
						url: '/api/exam/covid/report/'+39,
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
								url: "../../show_report?url=" + this.file_url
							})
						}
					})
					
					
					// fetchGet('/api/exam/covid/report/'+val.appointId).then(res => {
					// 	let pdfData = res
					// 	console.log("pdfData: "+pdfData)
						
					// 	let blob = new Blob([pdfData], {
					// 		type: 'application/pdf;charset=UTF-8'
					// 	})
					// 	pdfData = window.URL.createObjectURL(blob)			
					// 	this.file_url = encodeURIComponent(pdfData)
					// 	uni.navigateTo({
					// 		url: "../../show_report?url=" + this.file_url
					// 	})
						
					// })
					
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
