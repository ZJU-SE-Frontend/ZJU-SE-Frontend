<template>
	<view>

		<view class="patient_info_box">
			<view class="patient_info">
				<image class="logo" src="/static/logo.png"></image>

				<text class="patient_name">{{name}}</text>

				<view class="info_text_area">
					<text class="patient_height">{{patient_height}}</text>
					<text class="patient_weight">{{patient_weight}}</text>
					<text class="patient_phone">{{patient_phone}}</text>
					<text class="patient_id">{{patient_id}}</text>
					<text class="patient_age">{{patient_age}}</text>
				</view>

			</view>
		</view>

		<text class="history_title">{{history_title}}</text>

		<view class="patient_case_box">
			<view class="case1_box">
				
				<text class="case1_id">{{case1_id}}</text>
				<!--
				<text class="case1_time">{{case1_time}}</text>
				<text class="case1_doctor">{{case1_doctor}}</text>
				<text class="case1_detail">{{case1_detail}}</text>
				<text class="case1_result">{{case1_result}}</text>
				<text class="case1_medicine">{{case1_medicine}}</text>
				-->
				<view class="button_view">
					<u-row gutter="16">
						<u-col span="6">
							<u-button  @click="gotocase1">
								<u-icon name="arrow-right"></u-icon>
							</u-button>
						</u-col>
					</u-row>
				</view>

			</view>
			
			<view class="case2_box">
				<text class="case2_id">{{case2_id}}</text>
				<view class="button_view">
					<u-row gutter="16">
						<u-col span="6">
							<u-button @click="gotocase1">
								<u-icon name="arrow-right"></u-icon>
							</u-button>
						</u-col>
					</u-row>
				</view>
			</view>

			<view class="case3_box">
				<text class="case3_id">{{case3_id}}</text>
				<view class="button_view">
					<u-row gutter="16">
						<u-col span="6">
							<u-button  @click="gotocase1">
								<u-icon name="arrow-right"></u-icon>
							</u-button>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				name: '张三',
				patient_weight: '体重：60 kg',
				patient_height: '身高：170 cm',
				patient_age:    '年龄：21 岁',
				patient_phone:  '手机号：18112345678',
				patient_id:     '身份证号：330103200002131998',
				history_title:  '历史病历',
				
				case1_id:       '病案号：9527618975\n时间：2018-9-15-10:32\t主治医师：张任谦\n症状：心律失常，发热，乏力，有盗汗\n诊断结果：干燥综合征\n诊断建议：建议服用盐酸胺碘酮片',
				case1_time: 	'时间：2018-9-15-10:32',
				case1_doctor:	'主治医师：张任谦',
				case1_detail:	'症状：心律失常，发热，乏力，有盗汗',
				case1_result:	'诊断结果：干燥综合征',
				case1_medicine: '诊断建议：建议服用盐酸胺碘酮片',
				
				case2_id:		'病案号：6165981657\n时间：2020-5-27-14:11\t主治医师：朱凯彰\n症状：咳嗽，胸闷，无痰，时有打喷嚏，鼻炎发作\n诊断结果：过敏性咳嗽\n诊断建议：建议服用氯雷他定糖浆',
				case2_time:		'时间：2020-5-27-14:11',
				case2_doctor:	'主治医师：朱凯彰',
				case2_detail:	'症状：咳嗽，胸闷，无痰，时有打喷嚏，鼻炎发作',
				case2_result:	'诊断结果：过敏性咳嗽',
				case2_medicine: '诊断建议：建议服用氯雷他定糖浆',
						
				case3_id:		'病案号：9548752656\n时间：2020-7-2-17:01\t主治医师：孟宇瀚\n症状：一周前不慎摔倒，左侧髋部剧烈疼痛\n诊断结果：左侧股骨粗隆间骨折\n诊断建议：建议低盐低脂饮食，进行骨科常规护理',
				case3_time:		'时间：2020-7-2-17:01',
				case3_doctor:	'主治医师：孟宇瀚',
				case3_detail:	'症状：一周前不慎摔倒，左侧髋部剧烈疼痛',
				case3_result:	'诊断结果：左侧股骨粗隆间骨折',
				case3_medicine: '诊断建议：建议低盐低脂饮食，进行骨科常规护理',						
				
			}
		},
		onLoad() {

		},
		methods: {
			gotocase1() {
				uni.navigateTo({
					url: '../forum/index'
				})
			},
		}
	}
</script>


<style>
	.patient_info_box {
		background-color: #00aaff;
		margin-top: 0rpx;
		height: 310rpx;
		width: 100%;
		position: fixed;

		display: flex;
		flex-direction: column;
		align-items: margin-left;
		justify-content: margin-left;
	}

	.logo {
		height: 150rpx;
		width: 150rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.patient_name {
		font-size: 44rpx;
		color: #000000;
		margin-left: -115rpx;
	}

	.info_text_area {
		background-color: #0389ff;
		height: 280rpx;
		width: 530rpx;
		font-size: 35rpx;

		position: fixed;
		margin-top: -233rpx;
		margin-left: 204rpx;

	}

	.patient_height {
		position: fixed;
		margin-top: 15rpx;
		margin-left: 20rpx;
	}

	.patient_weight {
		position: fixed;
		margin-top: 15rpx;
		margin-left: 300rpx;
	}

	.patient_age {
		position: fixed;
		margin-top: 75rpx;
		margin-left: 20rpx;
	}

	.patient_phone {
		position: fixed;
		margin-top: 135rpx;
		margin-left: 20rpx;
	}

	.patient_id {
		position: fixed;
		margin-top: 195rpx;
		margin-left: 20rpx;
	}

	.history_title {
		font-size: 44rpx;
		color: #000000;
		position: fixed;
		margin-top: 320rpx;
		margin-left: 20rpx;
	}
	
	.patient_case_box {
		background-color: #d9d9da;
		margin-top: 400rpx;
		height: 850rpx;
		width: 100%;
		position: fixed;
	
		align-items: margin-center;
		justify-content: margin-center;
	}
	
	.case1_box {
		background-color: #c0c0c1;
		margin-top: 10rpx;
		height: 280rpx;
		width: 100%;
		position: fixed;
	}
	.case1_id {
		margin-top: 10rpx;
		margin-left: 20rpx;
		position: fixed;
	}
	
	.button1{
		font-size: 15rpx;
		margin-top: 5rpx;
		margin-left: 650rpx;
		position: fixed;
	}
	
	.case2_box {
		background-color: #c0c0c1;
		margin-top: 300rpx;
		height: 280rpx;
		width: 100%;
		position: fixed;
	}
	
	.case2_id {
		margin_top: 60rpx;
		margin-left: 20rpx;
		position: fixed;
	}
	
	.case3_box {
		background-color: #c0c0c1;
		margin-top: 590rpx;
		height: 250rpx;
		width: 100%;
		position: fixed;
	}
	.case3_id {
		margin_top: 60rpx;
		margin-left: 20rpx;
		position: fixed;
	}
	
	.button_view {
		margin-top: 5rpx;
		font-size: 12rpx;
		margin-left: 650rpx;
	}
	
	
</style>
