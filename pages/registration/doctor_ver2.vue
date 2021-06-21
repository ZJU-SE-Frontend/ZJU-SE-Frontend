<template>
	<view class="content">
		<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view draggable="false" :class="item.colorClass" class="swiper-item">
						<image class="image" :src="item.url" mode="aspectFill" draggable="false" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 挂普通号-->
		<view class = "common">
			<uni-card  class = "uni-cards"  >
				<view class="content-box">
					<text class="content-box-position">
						<text class="iconfont icon-wenzhen"></text>
						普通门诊(正在开发)
					</text>
				</view>
			<view class = "discription" @click="show">
				<view class="image-box">
					<image class="images" mode="aspectFill" src="/static/doctor.png" style = "zoom:20%;border: 5px solid #ddd;border-radius:30rpx;">
				</view>
				<view class = "id">
					<view class = "ids">
						<text class = "id1">{{room_sub}}</text>
					</view>
					<text>￥15</text>
				</view>
			</view>

			</uni-card>
		</view>
		<view v-if = "showModal" class = "pop" >
			<view class="uni-list" style = "height:10%;width:100%;">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker mode="multiSelector" @change="cha" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
							<view class="uni-input">{{multiArray[0][multiIndex]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view  class = "choo">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y2" @scrolltoupper="upper" @scrolltolower="lower"
					@scroll="scroll">
					<view class = "scroll-view-item">
						<uni-tag :inverted="item.t" :disabled="item.t" :text="item.show" :type="item.state" @click="ajp(item.times,item.ind)" size="small" v-for = "(item,index) in array_time" class = "trt" />
					</view>
					</scroll-view>
			</view>
			<view class="button-sp-area">
				<view class="tag-view2" >
					<uni-tag :inverted="true" text="取消" type="warning" @click="showModal =false;" size="small"/>
				</view>
			</view>
		</view>
		
		<uni-card   :isShadow="true" class = "experts" title="标题内容" subTitle="副标题" mode="title"  note="true" >
			<view class="content-experts">
				<text class="content-experts-text">
					<text class="iconfont icon-wenzhen"></text>
					专家门诊
				</text>
			</view>
			<view  class="infos" >
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view v-for ="item in array" @click="show2(item.doctorName,item.doctorPhone,$event)" class = "info-box" v-if = "item.doctorName!=nn">
						<view class="image-box-experts">
							<image class="images" mode="aspectFill" src="/static/doctor.png" />
						</view>
						<view class = "image-box-info">
							<view class = "ids-experts">
								<text class = "id1">{{item.doctorName}}</text>
								<text>{{item.doctorInfo}}</text>
								<text>￥15</text>
							</view>
						</view>
					</view>
				</scroll-view>
				
			</view>
		</uni-card>
	</view>
</template>

/*
任务：
目前，可以选择新的日期，但是如何在选择新的日期之后立刻刷新余量等
开放更多的时间段
*/
<script>
	import {getStatic, getPharBoothList, getPharBoothDetail, postLoginIn, postJoinIn, getUserInfo} from "../../fetch/api.js"
	import {getEncryptedPassword} from "../../common/encrypt.js"
	import { getdoctor,insert_record,getRemainder,getCurrentUserPhone} from "../../fetch/api.js"
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year;
		} else if (type === 'end') {
			year = year;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			const date = new Date()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			const hours = []
			
			
			/*
			for (let i = ; i <= date.getFullYear(); i++) {
			    years.push(i)
			}*/
			//years.push(date.getFullYear());
			
			for (let i = month; i <=month ; i++) {
			    months.push(i)
			}
			
			for (let i = 1; i <= 31; i++) {
			    days.push(i)
			}
			return {
				hospital:'',
				room_sub:'',
				showModal: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				iinfo:'',
				dates:'',
				nn:'普通号',
				time_id:'8:00 - 9:00',
				array:[
				],
				now_hour:0,
				indexss:'',
				userphone:'',
				choose_phone:'',
				time:{
					times:'',
					num:0,
					ind:''
				},
				/***********************/
				multiArray: [
					['周一', '测占位']
				],
				num:0,
				multiIndex: [0, 0, 0],
				datt:[],
				/***********************/
				array_time:[
					{
						times : '8:00 - 9:00',
						num :'5',
						ind:'0',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times : '9:00 - 10:00',
						num:'6',
						ind:'1',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times : '10:00 - 11:00',
						num :'7',
						ind:'2',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times : '11:00 - 12:00',
						num:'8',
						ind:'3',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times :'12:00 - 13:00',
						num:'4',
						ind:'4',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'13:00 - 14:00',
						num:'4',
						ind:'5',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'14:00 - 15:00',
						num:'4',
						ind:'6',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'15:00 - 16:00',
						num:'4',
						ind:'7',
						ins:'0',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'16:00 - 17:00',
						num:'4',
						ind:'8',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'17:00 - 18:00',
						num:'4',
						ind:'9',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'18:00 - 19:00',
						num:'4',
						ind:'10',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'19:00 - 20:00',
						num:'4',
						ind:'11',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'20:00 - 21:00',
						num:'4',
						ind:'12',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'21:00 - 22:00',
						num:'4',
						ind:'13',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'22:00 - 23:00',
						num:'4',
						ind:'14',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					},
					{
						times:'23:00 - 24:00',
						num:'4',
						ind:'15',
						ins:'-1',
						t:'false',
						state:'success',
						show:''
					}
				],
				info: [{
						colorClass: 'uni-bg-red',
						url: '/static/doctor1.webp',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: '/static/yue.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: '/static/health.jpg',
						content: '内容 C'
					}
				],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				section:'0',
				mode: 'default',
				state:0,
				dotsStyles: {},
				//处理日期选择
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				
				swiperDotIndex: 0,
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				// indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
				indicatorStyle: `height: 50px;`
			}
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		methods :{
			change(e) {
				this.current = e.detail.current
			},
			cha:function(e){
				this.multiIndex = this.num;
				this.date = this.datt[this.num];
				
				var p = this.innfo;
				var q = this.choose_phone;
				var phone  = q;
				var inn = p;
				
				var new_str = this.date;
				new_str = new_str.replace(/ /g,'-');
				var arr = new_str.split("-");
				var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]));
				this.dates = datum.getTime()/1000;
				
				var dd = this.dates;
				var j = 0;
				var h = this.now_hour;
				var sec = 0;
				var d = this.date;
				var flag = 0;
				if(this.num!=0) flag = 1;
				
				function conp(item, index) {
					getRemainder(phone,dd,index).then((res)=>{
						item.num =30-res.data.appointNum;
						item.show = item.times + "余量 "+("" + item.num) + "/30";
						if (item.num <=0 || (item.ind<h&&flag == 0) ){
							//item.t = 'true';
							item.state = "error";
						}
						else if(item.num<=2 && item.num>0){
							item.state = "warning";
							item.t = 'false';
						}
						else{
							item.state = "success";
							item.t = 'false';
						}
					})
				}
				this.array_time.forEach(conp);
				///this.section = sec;
			},
			bindMultiPickerColumnChange: function(e) {
				this.num = e.detail.value;
				//this.multiIndex = e.detail.value;
			},
			show(e){
				this.showModal = true;
				this.iinfo = "普通号";
				this.choose_phone = "00000000000";
				//this.choose_phone = q;
				const val = e.detail.value;
				//console.log(val);
				var new_str = this.date;
				
				new_str = new_str.replace(/ /g,'-');
				var arr = new_str.split("-");
				var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]));
				this.dates = datum.getTime()/1000;
				var dd = this.dates;
				var j = 0;
				var h = this.now_hour;
				new_str = new Date().toISOString().slice(0, 10);
				new_str = new_str.replace(/ /g,'-');
				var arr = new_str.split("-");
				var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]));
				var ddd = datum.getTime()/1000;
				var sec = 0;
				for (var i = 0;i<=9;i++)
				{
					if(this.array_time[i].ind<h && ddd == dd){
						this.array_time[i].t = 'true';
						this.array_time[i].state = "error";
					}
					else{
						this.array_time[i].state = "success";
						this.array_time[i].t = 'false';
					}
				}
			},
			show2(p,q,e){
				this.showModal = true;
				this.iinfo = p;
				this.choose_phone = q;
				var phone  = q;
				var inn = p;
				const val = e.detail.value;
				//console.log(val);
				var new_str = this.date;
				new_str = new_str.replace(/ /g,'-');
				var arr = new_str.split("-");
				var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],0,0,0));
				this.dates = datum.getTime()/1000;
				var dd = this.dates;
				var j = 0;
				var h = this.now_hour;
				var sec = 0;
				var d = this.date;
				var flag = 0;
				if(this.num!=0) flag = 1;
				new_str = new Date().toISOString().slice(0, 10);
				new_str = new_str.replace(/ /g,'-');
				var arr = new_str.split("-");
				var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]));
				var ddd = datum.getTime()/1000;
				console.log(this.date);
				function conp(item, index) {
					getRemainder(phone,dd,index).then((res)=>{
						item.num =30-res.data.appointNum;
						item.show = item.times + "余量 "+("" + item.num) + "/30";
						if (item.num <=0 || (item.ind<h&&flag == 0) ){
							item.t = 'true';
							item.state = "error";
						}
						else if(item.num<=2 && item.num>0){
							item.state = "warning";
							item.t = 'false';
						}
						else{
							item.state = "success";
							item.t = 'false';
						}
					})
				}
				this.array_time.forEach(conp);
				///this.section = sec;
			},
			onChange(e){
				this.section= e;
			},
			upper: function(e) {
			},
			lower: function(e) {
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			bindChange(e) {
			    const val = e.detail.value
				console.log(val[0]);
				for (var i=0;i<=9;i++)
				{
					if(this.array_time[i].ins == val[0]){
						this.time_id = this.array_time[i].times;
						this.section = this.array_time[i].ind;
					}
				}
				console.log(this.time_id);
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			ajp(p,q){
				/*
				生成预约记录并插入
				*/
			   var new_str = this.date;
			   var ddddd = this.date;
			   new_str = new_str.replace(/ /g,'-');
			   var arr = new_str.split("-");
			   var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]));
			   this.dates = datum.getTime()/1000;
			   this.time_id = p;
			   this.section = q;
			   console.log(123);
			   var ph = this.userphone.user_phone;
			   var ph2 = this.choose_phone;
			   var se = this.section;
			   var da = this.dates;
			   var st = 0;
			   var doc = this.iinfo;
			   var time = this.time_id;
			   uni.showModal({
				   title: '确认预约',
				   content: '您确定预约'+doc+'医生'+ddddd+'日的'+time+'时间段?',
				   cancelText: "取消", // 取消按钮的文字  
				   success: function (res) {
					   if (res.confirm) {
						   insert_record(ph,ph2,da,se).then((res)=>{
						   	st=res.st
						   })
						   if(st == 0){
							   uni.showModal({
								   title: '预约成功',
								   content: '恭喜你成功预约'+doc+'医生的'+time+'时间段~',
								   cancelText: "详情", // 取消按钮的文字  
								   success: function (res) {
									   if (res.confirm) {
										   console.log('用户点击确定');
										
										/*
										uni.navigateTo({//跳转页面
											url:"/pages/registration/index"
										});*/
										
										uni.switchTab({
											   url: '/pages/registration/index'
										});
									   } else if (res.cancel) {
										   uni.navigateTo({//跳转页面
											url:"/pages/registration/show"
										   });
									   }
								   }
							   });
							}
							else{
								uni.showToast({
									title: "预约失败",
								});
							}
					   } else if (res.cancel) {
					   }
				   }
			   });
			},
			mGetDate:function(year,month){
				var d = new Date(year, month, 0);
				return d.getDate();
			}
		},
		onLoad(option){
			this.hospital = JSON.parse(decodeURIComponent(option.hospital));
			//console.log("完成1");
			this.room_sub = JSON.parse(decodeURIComponent(option.room));
			//console.log("完成2");
			this.userphone = getCurrentUserPhone();
			//console.log("完成3");
			
			getdoctor(this.hospital,this.room_sub).then((res)=>{
				this.array=res.data.doctorList
			})
			//console.log("完成4");
			
			var myDate = new Date();
			this.now_hour = myDate.getHours(); //获取当前小时数(0-23)
			this.now_hour = this.now_hour - 8;
			this.section = this.now_hour + 1;
		},
		created:function(){
			var arr = [];
			var dats = [];
			var dates = new Date;
			var year = dates.getFullYear();
			var mouth = dates.getMonth()+1;
			var day = dates.getDate();
			var strds = "周" + "日一二三四五六".charAt(new Date().getDay());
			console.log(strds);
			if(mouth<10){
				mouth = '0'+mouth
			}
			if(day<10){
				day = '0'+day
			}
			var str = strds+":"+year+'-'+mouth+'-'+day;
			var index = 0;
			var strm;
			var strd;
			var d = this.mGetDate(year,mouth);
			
			if (d - day<6){//此时这一个月内不足7天
				arr.push(d-day);
				arr.push(6-(d-day));
			}
			else
				arr.push(7);
			for(var j =0; j<arr.length;j++){
				for(var x = 0;x<arr[j];x++){
					if(j==0){//此时，日期需要加上当前日期
						strm = parseInt(j+mouth)
						if(parseInt(j+mouth)<=9){
							strm = '0'+parseInt(j+mouth)
						}
						strd = parseInt(x+day)
						if(parseInt(x+day)<9){
							strd = '0'+parseInt(x+1)
						}
						dats.push(year+'-'+strm+'-'+strd)
					}
					else if(j==1){
						strm = parseInt(j+mouth)
						if(parseInt(j+mouth)<=9){
							strm = '0'+parseInt(j+mouth)
						}
						strd = parseInt(x+1)
						if(parseInt(x+1)<9){
							strd = '0'+parseInt(x+1)
						}
						dats.push(year+'-'+strm+'-'+strd)
					}
					
				}
			}
			this.datt = dats;       
			// index 为当前日期所对应的下标。
			var zm = [];
			for(var z = 0;z<dats.length;z++){
				var strdz = "周" + "日一二三四五六".charAt(new Date(dats[z]).getDay());
				zm.push(strdz+":"+dats[z])
			}
			// this.multiArray[0] = dats // dats 为没有星期几的日期
			this.multiArray[0] = zm // dats 为没有星期几的日期
			console.log(zm)
			var flag = 0;
			for(var i=0;i<zm.length;i++){
				if(str == zm[i] ){
					index = i;
					console.log("位置",i);
					flag = 1;
				}
			}
			if(flag == 0) console.log('没有');
			this.multiIndex = index
		}
		
	}
</script>

<style>
@charset "UTF-8";

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		height: 100%;
	}
	.content {
		width:100%;
		height:100%;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		height:300rpx;
		border-style: outset;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}

	.example-body {
		background-color: #ffffff;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 1px 0;
	}

	.swiper-box {
		height: 500rpx;
		width:100%;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #999;
		color: #fff;
		height:500rpx;
		width:100%;
	}

	.image {
		width: 100%;
		height:100%;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 100%;
			height:30%;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
			height:100%;
		}
	}

	/deep/ .image img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
	.uni-cards{
		height:100%;
		width:100%;
		display: flex;
		flex-direction: column;
	}
	.image-box {
		height: 100%;
		width:15%;
		padding-bottom:10rpx;
	}
	.images {
		width: 100%;
		height: 100%;
		flex: 1;
	}
	.discription{
		height:70%;
		display: flex;
		flex-direction: row;
		width:100%;
	}
	.id{
		height:100%;
		width:50%;
		display: flex;
		flex-direction: column;
		padding-left:20rpx;
	}
	.ids{
		height:100%;
		width:100%;
		display: flex;
		flex-direction: row;
	}
	.id1{
		font-size:30rpx;
	}
	.id2{
		font-size:20rpx;
		color:#333333;
		padding-left:20rpx;
	}
	.btn{
		height:30%;
		width:20%;
		font-size:15rpx;
	}
	.content-box {
		height:30%;
		display: flex;
		flex-direction: column;
		position:relative;
	}
	.content-experts{
		padding-left:20rpx;
		padding-top:20rpx;
		height:5%;
	}
	.content-experts-text{
		font-size: 25rpx;
		line-height: 35rpx;
		height:100%;
		width:100%;
		bottom:0%;
		color:#000000;
	}
	.content-box-text {
		font-size: 35rpx;
		line-height: 35rpx;
		height:50%;
		bottom:0%;
		color:#000000;
		width:100%;
		position:absolute;
	}
	.content-box-texts {
		font-size: 35rpx;
		height:50%;
		bottom:0%;
		color:#000000;
		width:100%;
		position:absolute;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.pop {
	  position: fixed;
	  top: 20%;
	  left: 15%;
	  width: 70%;
	  bottom:30%;
	  z-index: 3;
	  border-radius:10px;
	  background-color:rgba(255,255,255,0.96);
	}
	.uni-list-cell {
		height:100%;
		width:100%;
		display:flex;
		flex-direction:row;
		justify-content: space-evenly;
		position:relative;
	}
	.uni-list-cell-left {
		flex:2;
		color:#000000;
		height:100%;
		position:absolute;
		left:20%;
		top:10%;
	}
	.uni-list-cell-db {
		flex:8;
		color:#000000;
		height:100%;
		position:absolute;
		top:10%;
		left:50%;
	}
	picker-view {
	    width: 100%;
	    height: 600rpx;
	    margin-top:20rpx;
	}
	
	.item {
	    line-height: 100rpx;
	    text-align: center;
	}
	
	button {
	    height:100%;
		width:60%;
		display:block;
		margin:0 auto;
	}
	
	.button-sp-area {
	    margin: 0 auto;
	    width: 60%;
		height:10%;
	}
	.button-sp-area button view {
		margin:0 auto;
		
	}
	.uni-fab-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		position: absolute;
		width:100%;
		height:10%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.common{
		font-size:14rpx;
		height:20%;
		width:100%;
		padding-top:20rpx;
		padding-left:30rpx;
		padding-bottom:20rpx;
		background: -webkit-linear-gradient(bottom, rgba(255,255,255,0.6),rgba(212,252,121,0.2), rgba(150,230,161,0.6)) no-repeat;
		border-bottom:15rpx rgba(246,246,246,0.3)  solid;
		border-top:15rpx rgba(150,230,161,0.4) solid;
	}
	.experts{
		font-size:14rpx;
		height:60%;
		width:100%;
	}
	.infos{
		height:40%;
		width:100%;
	}
	.scroll-Y {
		height:100%;
		width:100%;
	}
	.scroll-Y2 {
		height:100%;
		width:80%;
		padding-left:15%;
	}
	
	.scroll-view-item {
		height: 15%;
		text-align: center;
		font-size: 25rpx;
		width:100%;
		padding-top:10%;
	}
	.trt{
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top:30rpx;
		width:80%;
		font-size:10rpx;
	}
	.info-box{
		height:30%;
		display: flex;
		flex-direction: row;
		width:100%;
		padding-left:10rpx;
		background-color: rgba(255,255,255,1);
		padding-top:10rpx;
		border-bottom:15rpx rgba(246,246,246,0.3)  solid;
		border-top:15rpx rgba(246,246,246,0.3) solid;
	}
	.image-box-experts{
		height: 80%;
		width:15%;
		padding-bottom:10rpx;
		padding-left:10rpx;
	}
	.image-box-info{
		height:100%;
		width:70%;
		display: flex;
		flex-direction: column;
		padding-left:20rpx;
	}
	.ids-experts{
		height:100%;
		width:100%;
		display: flex;
		flex-direction: column;
		padding-left:20rpx;
	}
	.tag-view1 {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding-top:30rpx;
		width:20%;
		left:25%;
		font-size:10rpx;
		position: fixed;
	}
	.choo{
		display: flex;
		flex-direction: column;
		height:75%;
		width:100%;
	}
	.tag-view_choose {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding-top:30rpx;
		padding-left:10%;
		width:80%;
		font-size:10rpx;
	}
	.tag-view2 {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding-top:30rpx;
		width:20%;
		left:41%;
		font-size:10rpx;
		position: fixed;
	}
</style>
