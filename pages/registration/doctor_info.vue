<template>
	<view class="YmContent">
			<view class="info_96">
				<view class="row4">
					<text decode="true" class="info_66">姓名</text>
					<text decode="true" class="name">{{doctorInfomation.doctorName}}</text>
				</view>
				<view class="info_69">
				</view>
				<view v-on:click="row3_70_click()" class="row3">
					<text decode="true" class="info_71">预约病人列表</text>
					<text decode="true" class="ids">详情</text>
					<image src="/static/info/images/info_73_73.jpg" mode="scaleToFill" border="0"    class="info_73"></image>
				</view>
				<view class="info_74">
				</view>
				<view class="row2">
					<text decode="true" class="info_76">手机号码</text>
					<text decode="true" class="mobile">{{doctorInfomation.doctorPhone}}</text>
				</view>
				<view class="info_79">
				</view>
				<view class="row1">
					<text decode="true" class="info_81">从业时长</text>
					<text decode="true" class="job">{{doctorInfomation.workTime}}</text>
				</view>
				<view class="info_83">
				</view>
				<view class="row1">
					<text decode="true" class="info_81">医院</text>
					<text decode="true" class="job">{{doctorInfomation.hospital}}</text>
				</view>
				<view class="info_83">
				</view>
				<view class="row1">
					<text decode="true" class="info_81">科室岗位</text>
					<text decode="true" class="job">{{doctorInfomation.department}}{{doctorInfomation.title}}</text>
				</view>
				<view class="info_83">
				</view>
				<view class="row1">
					<text decode="true" class="info_81">工号</text>
					<text decode="true" class="job">{{doctorInfomation.doctorId}}</text>
				</view>
				<view class="info_83">
				</view>
				<view class="row1">
					<text decode="true" class="info_81">介绍</text>
					<text decode="true" class="job">{{doctorInfomation.doctorInfo}}</text>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import info from "./doctor_info.js";
export default info;
</script>

<style lang="scss" scoped>
   @import './doctor_info.scss'
</style>