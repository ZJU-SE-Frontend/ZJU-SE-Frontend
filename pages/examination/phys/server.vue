<template>
	<view class="page">
		<view>
		    <view class="title"><text class="uni-form-item__title">默认容量</text></view>
		    <view class="uni-input-wrapper">
		        <input class="uni-input" focus placeholder=default />
		    </view>
		</view>
		
		<view class="datesel">
			<view style=" margin-left: 0px; margin-top: 0px; margin-bottom: 0px;" @click="onShowDatePicker('date')">{{date}}</view>
		</view>
		
		<uni-list style="width: 100%">
			<uni-list-item  v-for="(val, key) in remainder" :key="key" link="" @click="onClick(key)"
			 :title="convertText[key]" showArrow show-badge="true" :badge-text="val.toString()"
			 :disabled="val<=0">
			</uni-list-item>
		</uni-list>
		<button size="mini" style="align-self: center; border-radius: 1rpx; border-color: #ffffff;" type="primary" @click="gotoTimesel">提交更改</button>
		
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>

<script>
	import {fake_fetchGet, fake_fetchPost} from "../fake_backend.js";
	import MxDatePicker from "../../../components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
		            MxDatePicker
		        },
				
		onLoad() {
			this.remainder = fake_fetchGet('/api/exam/physical/remainder').data.sections;
		},
		
		data() {
			return {
				
				showPicker: false,
				date: new Date().toLocaleDateString().slice(0, 10),
				type: 'date',
				value: '',
				default: "10",
				
				convertText: ["8:00-9:00","9:00-10:00","10:00-11:00","11:00-12:00",
					"13:30-14:30","14:30-15:30","15:30-16:30","16:30-17:30"],
				remainder: null
			}
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
		align-items: flex-start;
	}
	
	.uni-input-wrapper {
	    display: flex;
	    padding: 8px 13px;
	    flex-direction: row;
		align-items: baseline;
	    background-color: #FFFFFF;
	}
	
	.title {
	    padding: 0px 0px;
	}
	
	.uni-input {
		margin-left: 10px;
	    line-height: 28px;
		width: fit-content;
	    font-size: 15px;
	    padding: 0px;
	    flex: 1;
	    background-color: #FFFFFF;
	}
	
	.datesel {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
</style>
