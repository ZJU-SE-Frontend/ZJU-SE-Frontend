<template>
	<view class="page">
		<view class="title">
			<view class="Info">
				<text style="color: #FFFFFF ; font-size: larger; font-weight: 700;">  {{this.username}} </text>
				<text style="color: #FFFFFF ;font-size: smaller;"> {{this.userphone}} </text>
			</view>
			<button size="mini" style="border-width: 3rpx; border-color: #ffffff; margin-right: 15px;" type="default" @click="gotoHistory">预约记录</button>
		</view>
		<view class="content">
			<view class="datesel">
				<view style=" margin-left: 20px; margin-top: 10px; margin-bottom: 10px;" @click="onShowDatePicker('date')">{{date}}</view>
			</view>
			<view class="divider"/>
			<view class="uni-list">
				<view class="uni-list-cell" style=" margin-left: 20px; margin-top: 10px; margin-bottom: 10px;">
					<view class="uni-list-cell-left" style="font-size: small;">
						体检医院
					</view>
					<view class="uni-list-cell-db" style="font-size: small; font-weight: 700;">
						<picker @change="bindPickerChange" :value="index" :range="hospitals">
							<view class="uni-input">{{hospitals[index]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<button size="mini" style="align-self: center; border-radius: 1rpx; border-color: #ffffff;" type="primary" @click="gotoTimesel">查询余量</button>
		</view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import {getHospitalList_Phy, fetchGet} from "../../../fetch/api.js";
	export default {
		components: {
		            MxDatePicker
		        },
		
		data() {
			return {
				showPicker: false,
				date: new Date().toLocaleDateString(),
				type: 'date',
				value: '',
				
				hospitals: [],
				index: 0,
				
				username: "Default",
				userphone: 18888888888
			}
		},
		
		mounted () {
		    
		     
		  },
		  
		onLoad(user_info) {
			this.username = user_info.username;
			this.userphone = user_info.userphone;
			console.log("fetching...");
			var val;
			getHospitalList_Phy().then((res) => {
				this.hospitals = res.data.hospitalList
			});
			console.log(this.hospitals);
		},
		
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
			},
			
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
				},
				
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
					console.log('value => '+ e.value);
					console.log('date => ' + e.date);
					}
				},
				
			gotoHistory() {
				uni.navigateTo({
					url:"history_phy?user_phone=" + this.userphone
				})
			},
			
			gotoTimesel() {
				
				console.log('Phys -> Timesel：');
				console.log('hospital => '+ this.hospitals[this.index]);
				console.log('date => '+ this.date);
				
				uni.navigateTo({
					url:"timesel_phy?hospital=" + this.hospitals[this.index]
						+ "&appoint_date=" +  this.date
						+ "&username=" +  this.username
						+ "&user_phone=" +  this.userphone
				})
				
				
				
			}
			
		}
	}
</script>

<style>	
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url(../../../static/exam/bkg_info.png);
		background-size: cover;
		height: max-content;
	}


	.title {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		height: 90px;
		width: 100%;
		margin-top: 0;
		margin-bottom: 10px;
	}
	
	.Info {
		display: flex;
		flex-direction: column;
		margin-left: 15px;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 85%;
		height: fit-content;
		margin-top: 0;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
	}

	.datesel {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	
	.divider{
		background: #E0E3DA;
		align-self: center;
		width: 90%;
		height: 1rpx;
		}

</style>
