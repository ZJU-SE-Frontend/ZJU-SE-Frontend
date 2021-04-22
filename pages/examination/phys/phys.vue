<template>
	<view class="page">
		<view class="title">
			<view class="Info">
				<text style="color: #FFFFFF ; font-size: larger; font-weight: 700;">  Username </text>
				<text style="color: #FFFFFF ;font-size: smaller;"> Phonenumber </text>
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
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
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
	export default {
		components: {
		            MxDatePicker
		        },
		
		data() {
			return {
				showPicker: false,
				date: new Date().toISOString().slice(0, 10),
				type: 'date',
				value: '',
				
				array: [{name:'浙江大学医学院附属第一医院体检中心'},
						{name:'杭州市第一人民医院体检中心'}, 
						{name:'浙江省人民医院体检中心'}, 
						{name:'体检中心'}],
				index: 0,
			}
		},
		
		mounted () {
		    
		    
		  },
		  
		onLoad() {

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
				
			gotoHistory() {
				uni.navigateTo({
					url:"history/history"
				})
			},
			
			gotoTimesel() {
				uni.navigateTo({
					url:"timesel/timesel"
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
		background-image: url(../../../static/bkg_info.png);
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
