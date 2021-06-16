<template>
	<view>
		<view>
		</view>

		<view>
			<h3>病人姓名: {{name}}</h3>
			<p>病人电话: {{tele}}</p>
			<p>病人科室: {{room}}</p>
			<p>时间: {{time}} - {{dayTime}}</p>
			<h3>历史病例</h3>
			<view class="example">
				<v-table :columns="columns" :list="illnessHis"></v-table>
			</view>
<!-- 			<view v-for="(his,i) in illnessHis">
				{{i+1}} .
				{{his.time}} {{his.room}}
				{{his.symptom}}
				{{his.diagnosis}}
				{{his.suggest}}
			</view> -->
		</view>
	</view>

</template>
<script>
	import vTable from "@/components/no-bad-table/table.vue"
	export default {
		components: {
			vTable
		},
		data() {
			return {
				title: '病人详细信息',
				name: '陈岩',
				tele: '177777777',
				room: '外科',
				time: '2021-5-7',
				dayTime: '下午',
				illnessHis: [{
						time: '2021-04-03',
						room: '外科',
						symptom: '皮肤溃烂',
						diagnosis: '发炎',
						suggest: '服用**药'
					},
					{
						time: '2021-05-17',
						room: '内科',
						symptom: '吞咽困难',
						diagnosis: '上呼吸道感染',
						suggest: '服用头孢'
					},
				],
				columns: [{
						title: "时间",
						key: "time"
					},
					{
						title: '科室',
						key: 'room'
					},
					{
						title: '症状',
						key: 'symptom'
					},
					{
						title: '诊断',
						key: 'diagnosis'
					},
					{
						title: '治疗方案',
						key: 'suggest'
					}
				],
			}
		},
		created: {},
		methods: {},
		onLoad() {}
	}
</script>

<style>
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
