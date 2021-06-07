<template>
	<view class="page">
		<view class="content">
		<text style="color:#FFFFFF">{{curHospital}}</text>
		<view class=myitem>
		    <view class="title">默认容量</view>
			<view style="display: flex; flex-direction: row; align-content: flex-end;">
				<input class="uni-input" v-model="defaultval"  focus :name="defaultval" />
				<image mode="aspectFit" style=" margin-right: 30rpx; width: 120rpx; height: 50rpx;" src="../../../static/exam/updateR.png" @click="applyDef"></image>
			</view>
		</view>
		
		<view class=block style="width: 100%; padding-bottom: 20rpx;">
		
			<view class="datesel" style="align-self: center; margin-top: 20rpx; margin-bottom: 20rpx;">
				<image class="image" src="../../../static/exam/calendar.png" @click="onShowDatePicker('date')"></image>
				<view style=" margin-left: 0px; " >{{date}}</view>
			</view>
			
			<view style="width: 100%" v-if="updata" >
				<view class=mylistitem  v-for="(val, key) in remainder" :key="key" link="" >
					<text style="width: 100px; margin-left: 5%; ">{{convertText[key]}}</text>
					
					<view style="display: flex; flex-direction: row;"> 
						<input class="uni-input" v-model="remainder[key]" :name="val"> </input>
						<image mode="aspectFit" style=" margin-right: 30rpx; width: 120rpx; height: 50rpx;" src="../../../static/exam/update.png" @click="apply(key)"></image>
					</view>
					
					
				</view>
			</view>
		
		</view>
		
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
		</view>
	</view>
	
</template>

<script>
	import {fetchGet, fetchPut} from "@/fetch/api.js";
	import MxDatePicker from "../../../components/mx-datepicker/mx-datepicker.vue";
	
	function sleep(time){
		return new Promise(function(resolve){
			setTimeout(resolve, time);
		});
	}
	
	export default {
		components: {
		            MxDatePicker
		        },
		
		data() {
			return {
				curHospital: "杭州市第一人民医院",
				curDate: new Date().toLocaleDateString(),
				username: "",
				user_phone: 0,
				
				showPicker: false,
				date: new Date().toLocaleDateString().slice(0, 10),
				type: 'date',
				value: '',
				defaultval: '',
				
				
				convertText: ["8:00-9:00","9:00-10:00","10:00-11:00","11:00-12:00",
					"13:30-14:30","14:30-15:30","15:30-16:30","16:30-17:30"],
				remainder: null,
				
				updata: true,
				cursections: "",
			}
		},
		
		onLoad(e) {
			this.curHospital = e.hospital;
			console.log(this.curHospital);

			fetchGet('/api/exam/physical/remainder/',{
				hospital: this.curHospital,
				appointDate: new Date(this.curDate).getTime() / 1000,
			}).then(res => {
				this.remainder = res.data.sections;
				this.defaultval = res.data.defaultCapacity;
			})
			
			this.$forceUpdate();
		},
		
		methods: {
			
			
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
				},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
					this.updata = false;
					fetchGet('/api/exam/physical/remainder/',{
						hospital: this.curHospital,
						appointDate: new Date(this.date).getTime() / 1000,
					}).then(res => {
						this.remainder = res.data.sections;
						this.updata = true;
						this.$forceUpdate();
						
					})
					}
				},
			apply:function(e) {
				
				if (!/^[0-9]+$/.test(e)) {
					uni.showToast({
						title: '请输入非负整数',
						icon: 'none'
					})
				} else {
				
				
					this.updata = false;
					
					console.log(e)
					
					console.log(this.curHospital)
					console.log(this.defaultval)
					let i = 0;
					
					fetchPut('/api/exam/physical/setting',{
						hospital: this.curHospital,
						type: 1,
						appointDate: new Date(this.date).getTime() / 1000,
						defaultCapacty: this.defaultval,
						defaultCapacity: this.defaultval,
						section: e+1,
						remainder: this.remainder[e]
					}).then(res => {
						console.log(res)
						this.updata = true;
						this.$forceUpdate();
						uni.showToast({
							title: '更新成功'
						})
					})
				
				}
								
			},
			
			applyDef() {
				
				if (!/^[0-9]+$/.test(this.defaultval)) {
					uni.showToast({
						title: '请输入非负整数',
						icon: 'none'
					})
				} else {
				
				
					this.updata = false;
					
					console.log("Modify Default")
					console.log(this.defaultval)
					let i = 0;
					
					fetchPut('/api/exam/physical/setting',{
						hospital: this.curHospital,
						type: 0,
						appointDate: new Date(this.date).getTime() / 1000,
						defaultCapacty: this.defaultval,
						defaultCapacity: this.defaultval,
					}).then(res => {
						console.log(res);
						uni.showToast({
							title: '更新成功'
						})	
					})
					
					sleep(800).then(()=>{
						fetchGet('/api/exam/physical/remainder/',{
							hospital: this.curHospital,
							appointDate: new Date(this.date).getTime() / 1000,
						}).then(res => {
							this.remainder = res.data.sections;	
							this.updata = true;
							this.$forceUpdate();
						})
					})			
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
		margin-top: 80px;
	}
	
	.myitem {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: space-between;
		padding-top: 15rpx;
		height: 65rpx;
		width: 100%;
		margin-top : 2rpx;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
	.mylistitem {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: space-between;
		height: 80rpx;
		width: 100%;
		margin-top : 2rpx;
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
		margin-top: 30rpx;
	    margin-left: 50%;
	    text-align: center;
	    margin-right: 10%;
	    border-left: 0px;
	    border-right: 0px;
	    border-top: 0px;
	    border-radius: 0;
	    border-bottom-width: 1px;
	    border-bottom-color: #000000;
	}
	.uni-input {
		align-self: baseline;
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
	}
	
	.title {
		margin-left: 20px;
		font-size: 14px;
		line-height: 20px;
		width: 100px;
	}
	.block {
		display: flex;
		flex-direction: column;
		justify-content: baseline;
		height: min-content;
		height: max-content;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
		margin-top: 10rpx;
	}
	.datesel {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.image {
			width: 35rpx;
			height: 35rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
	
</style>
