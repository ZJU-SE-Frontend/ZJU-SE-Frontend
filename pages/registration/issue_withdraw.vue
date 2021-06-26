<template>
	<view>
		<!-- 组合示例 -->
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">
				{{docData.doctorName}}
				<text>\n {{docData.hospital}} {{docData.department}} </text>
			</view>
			<view class="uni-flex uni-row">
				<view class="text uni-flex" style="width: 150rpx;height: 150rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
					<image src="../../static/monster.jpg" style="width: 150rpx;height: 150rpx;"></image>
				</view>
				<view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;">
					<view v-if="isExpert"  class="text" style="height: 250rpx;text-align: left;padding-left: 20rpx;padding-top: 10rpx;">
					<!-- <view class="text" style="height: 250rpx;text-align: left;padding-left: 20rpx;padding-top: 10rpx;"> -->
						医生个人简介：{{docData.doctorInfo}}
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="-webkit-flex: 1;flex: 1;">时段：{{regsec}}</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">预约余量：{{remainder}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 多行文本输入框 -->
		<uni-section title="退号原因陈述" type="line"></uni-section>
		<view class="easy_input">
			<uni-easyinput type="textarea" v-model="value" placeholder="请输入退号原因"></uni-easyinput>
		</view>
		<!-- 提交按钮 -->
		<view class="button">
			<button class="button" type="primary" @click="confirmDialog"><text class="button-text">提交</text></button>
		</view>
		<!-- PopUp 对话框 -->
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" title="有病得治,三思后行" content="确认解除预约?" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<!-- 消息提示 -->
		<uni-popup id="popupMessage" ref="popupMessage" type="message" @change="change">
			<uni-popup-message :type="info" message="撤销预约失败":duration="2000"></uni-popup-message>
		</uni-popup>

	</view>
</template>

<script>
	import { deleteAppointment } from "../../fetch/api.js"
	import { getCurrentUserPhone } from "../../fetch/api.js"
	import { getDoctorInfo } from "../../fetch/api.js"
	import { getRemainder } from "../../fetch/api.js"
	import store from "@/common/store.js"
	
	export default {
		data() {
			return {
				value: '',
				placeholderStyle: "color:#499721;font-size:16px",
				styles: {
					color: 'blue',
					borderColor: '#499721'
				},
				docData:{},
				remainder: 0,
				regsec: '',
				isExpert :false
			}
		},
		methods : {
			confirmDialog(){
				this.$refs.popupDialog.open()
			},
			dialogConfirm(done) {
				
				// issue withdraw to backend ZJC
				var date=this.appointDate;
				var section=this.section;
				var tel=this.telephone;
				// console.log("date = " + date)
				// console.log("section = " + section)
				// console.log("telephone = " + tel)
				deleteAppointment(tel, date, section).then((res)=>{
					  this.remoteStatus=res.st
					  console.log("status = " + this.remoteStatus)
				})
				uni.showModal({
				   title: '退号成功',
				   content: '恭喜您退号成功，返回主页重新预约',
				   cancelText: "详情", // 取消按钮的文字  
				   success: function (res) {
					   if (res.confirm) {
						   uni.switchTab({
						   	   url: '/pages/registration/index'
						   });
					   } 
					   else if (res.cancel) {
						   uni.navigateTo({//跳转页面
								url:"/pages/registration/show"
						   });
					   }
				   }
				});
				
			},
			dialogClose(done) {
				done()
			},
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			}
		},
		onLoad(option){
			this.appointDate = JSON.parse(decodeURIComponent(option.appointDate));
			this.section = JSON.parse(decodeURIComponent(option.section));
			this.doctorPhone = JSON.parse(decodeURIComponent(option.DoctorPhone));
			this.regsec=(this.section+8) + " - " + (this.section+9)
			 console.log("appointDate = " + this.appointDate);
			 console.log("section = " + this.section);
			 console.log("doctorPhone = " + this.doctorPhone);
			this.telephone = store.state.uerInfo.userPhone;
			this.isExpert=(this.doctorPhone!="00000000000");
			
			// fetch doctor info 
			getDoctorInfo(this.doctorPhone).then((res)=>{
				  this.fetchDocStatus=res.st
				  this.docData=res.data
				  console.log("this.docData.doctorName" + this.docData.doctorName)
				  console.log("getDoctorInfo status = " + this.fetchDocStatus)
			})
			
			// fetch remainder
			getRemainder(this.doctorPhone,this.appointDate,this.section).then((res)=>{
				  this.fetchRemainderStatus=res.st
				  this.remainder=30-res.data.appointNum
				  console.log("this.remainder" + this.remainder)
				  console.log("fetchRemainderStatus = " + this.fetchRemainderStatus)
			})
		},
		unBackPress(option){
			uni.navigateTo({//jump back
				url:"/pages/registration/show"
			})
			return true;
		}
}
	
</script>

<style>
	@import url("../../common/uni.css");
	@import url("../../common/uni-nvue.css");
	
	.easy_input {
		/* padding: 0 15px 15px; */
		
	}
	
	.button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 40px;
		margin: 0 15px;
		border-radius: 5px;
	}
	
	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
		
		 overflow: hidden;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

</style>
