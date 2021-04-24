<template>
	<view class="page">
		<view class="content">
		<view style="display: flex; flex-direction: row; align-items: baseline; ">
		    <view class="title"><text class="uni-form-item__title">默认容量</text></view>
		    <view class="uni-input-wrapper">
		        <input class="uni-input-head" focus  :value="defaultval" />
		    </view>
		</view>
		
		<view class="datesel">
			<view style=" margin-left: 15px; margin-top: 0px; margin-bottom: 5px;" @click="onShowDatePicker('date')">{{date}}</view>
		</view>
		
		<uni-list style="width: 100%">
			<view class="block"  v-for="(val, key) in remainder" :key="key" link="" @click="onClick(key)">
				<text style="width: 100px; margin-left: 5%; ">{{convertText[key]}}</text>
				<input class="uni-input" :value="val"> </input>
			</view>
			</uni-list-item>
		</uni-list>
		<button size="mini" style="align-self: center; border-radius: 1rpx; border-color: #ffffff;" type="warn" @click="gotoTimesel">提交更改</button>
		
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
	</view>
	
</template>

<script>
	import {fake_fetchGet, fake_fetchPost} from "../fake_backend.js";
	import {fetchGet} from "@/fetch/api.js";
	import MxDatePicker from "../../../components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
		            MxDatePicker
		        },
		
		data() {
			return {
				curHospital: "",
				curDate: "",
				username: "",
				user_phone: 0,
				
				showPicker: false,
				date: new Date().toLocaleDateString().slice(0, 10),
				type: 'date',
				value: '',
				defaultval: 100,
				
				
				convertText: ["8:00-9:00","9:00-10:00","10:00-11:00","11:00-12:00",
					"13:30-14:30","14:30-15:30","15:30-16:30","16:30-17:30"],
				remainder: null
			}
		},
		methods: {
			onLoad: function(option) {
				this.curHospital = option.hospital;
				this.curDate = option.appoint_date;
				this.username = option.username;
				this.user_phone = option.user_phone;
				this.remainder = fake_fetchGet('/api/exam/physical/remainder').data.sections;
			},
			onClick(key) {
				console.log(this.convertText[key])
				uni.navigateTo({
					url: "../confirm/confirm_phy?hospital=" + this.curHospital
						+ "&appoint_date=" +  this.curDate
						+ "&username=" +  this.username
						+ "&user_phone=" +  this.user_phone
						+ "&timeslot=" +  this.convertText[key]
				})
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
	
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 85%;
		height: fit-content;
		margin-top: 100px;
		background-color: #FFFFFF;
		border-radius: 0px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
	.uni-input-wrapper {
	    padding: 8px 13px;
	    background-color: #FFFFFF;
		height: max-content;
		width: 160px;
	}
	.uni-input-head {
	    padding: 0px;
	    flex: 1;
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		border-radius: 0;
		border-bottom-width: 1px;
		border-bottom-color: #000000;
	    background-color: #FFFFFF;
	}
	.uni-input {
	    padding: 0px;
	    flex: 1;
		margin-left: 40%;
		text-align: center;
		margin-right: 10%;
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		border-radius: 0;
		border-bottom-width: 1px;
		border-bottom-color: #000000;
	    background-color: #FFFFFF;
	}
	.uni-form-item__title {
		margin-left: 20px;
	    font-size: 12px;
	    line-height: 20px;
	}
	
	.title {
	    padding: 0px 0px;
	}
	
	
	.block {
		display: flex;
		flex-direction: row;
		justify-content: baseline;
		height: min-content;
		height: 30px;
	}
	
	.datesel {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
</style>
