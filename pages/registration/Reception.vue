<template>
	<view class="YmContent"  :animation="animationData">
	<view class="YmContent">
			<view class="Reception_1">
				<view v-for="(patient, index) in appointList" :key="index" class="Reception_2" >
					<view class="Reception_3">
						<view class="Reception_4">
							<view class="Reception_8">
								<text decode="true" class="Reception_12" >{{patient.patientName}}</text>
								<text decode="true" class="Reception_13">{{patient.patientGender}}</text>
								<view class="Reception_14">
								</view>
								<text decode="true" class="Reception_15">{{patient.patientAge}}</text>
								<text decode="true" class="Reception_18">{{patient.department}}</text>
							</view>
							<view class="Reception_9">
								<text decode="true" class="Reception_19">联系电话：{{patient.patientPhone}}</text>
								<view class="Reception_23">
								</view>
							</view>
							<view class="Reception_10">
								<text decode="true" class="Reception_24">预约日期：{{patient.appointDate}}</text>
								<view class="Reception_28">
								</view>
							</view>
							<text decode="true" class="Reception_11">预约时间段：{{patient.section}}</text>
						</view>
						<view class="Reception_5">
							<button @click="Reception_click(patient.patientPhone)" class="Reception_7">病人详情
							</button>
						</view>
					</view>
				</view>
			</view>
		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
	</view>
</template>

<script>
import Reception from "./Reception.js";
export default Reception;
</script>

<style lang="scss" scoped>
   // @import url("/animate.min.css");
   @import './Reception.scss'
</style>