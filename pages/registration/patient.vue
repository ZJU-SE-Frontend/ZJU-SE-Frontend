<template>
	<view >
		<view>
			<text class="word-v-middle">病人信息</text>
		</view>
		<view class="info_69">
		</view>
		<view>
			<text class="key">姓名:</text>
			<text class="value">{{patient.patientName}}</text>
		</view>
		<view>
			<text class="key">电话:</text>
			<text class="value">{{patient.patientPhone}}</text>
		</view>
		
		<view>
			<text class="word-v-middle">历史病例</text>
		</view>
		<view class="example">
			<v-table :columns="columns" :list="patient.caseHistory"></v-table>
		</view>
	</view>

</template>
<script>
	import store from "@/common/store.js"
	import {
		getPatientInfo
	} from "../../fetch/api.js"
	import vTable from "@/components/no-bad-table/table.vue"
	export default {
		components: {
			vTable
		},
		data() {
			var patient_phone = 18888888888;
			return {
				patient: {
					patientName: '陈岩',
					patientPhone: patient_phone,
					room: '外科',
					time: '2021-5-7',
					caseHistory: [{
						caseId: '1',
						time: '2021-04-03',
						doctorName: '赵嘉成',
						doctorPhone: '18888999888',
						department: '内科',
						caseResult: '儿科记录11111111111111111111111111'
					}],
				},
				columns: [{
						title: "病历号",
						key: "caseId"
					},
					{
						title: "时间",
						key: "time"
					},
					{
						title: '科室',
						key: 'department'
					},
					{
						title: '诊断结果',
						key: 'caseResult'
					},
					{
						title: '医生姓名',
						key: 'doctorName'
					}
				],
			}
		},
		methods: {},
		onLoad(option) {
			var patient_phone = option.patient_phone;
			getPatientInfo(patient_phone).then((res) => {
				this.patient = res.data
				this.patient = transTime(this.patient)
			})
		}
	}

	function timestampToTime(timestamp) {
		var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		return Y + M + D;
	}

	function transTime(patient) {
		for (var i = 0; i < patient.caseHistory.length; i++) {
			patient.caseHistory[i].time = timestampToTime(patient.caseHistory[i].time);
		}
		return patient;
	}
</script>

<style>
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.info_69 {
		white-space: normal;
		width: 691upx;
		height: 1upx;
		padding: 0upx;
		clear: both;
		margin-top: 10upx;
		margin-left: 29upx;
		float: left;
		background-color: #000000;
		text-align: left;
		border-radius: 0upx;
		font-size: 2upx;
		line-height: 4upx;
	}

	.word-v-middle {
		margin-bottom: 0;
		font-size: 20px;
		min-height: 31px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 31px;
		margin-top: 0px;
		color: #000000;
		white-space: normal;
		font-weight: 600;
	}

	.key {
		margin-left: 20px;
		margin-bottom: 0;
		font-size: 18px;
		min-height: 31px;
		flex-direction: row;
		justify-content: left;
		height: 31px;
		margin-top: 0px;
		color: #000000;
		white-space: normal;
		font-weight: 600;
	}

	.value {
		position: relative;
		font-size: 17px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-weight: 500;
	}

	.content {
		display: table-row;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.table_header {
		font-weight: 600;
		font-size: 35rpx;
		text-align: center !important;
		background-color: #EBEEF5 !important;
	}

	.td_header {
		font-weight: 600;
		width: 1% !important;
	}

	tr {
		background-color: white !important;
	}

	td {
		font-size: 30rpx;
		text-align: center !important;
		width: 33%;
		border: 1rpx solid rgba(0, 0, 0, 0.1);
	}
</style>
