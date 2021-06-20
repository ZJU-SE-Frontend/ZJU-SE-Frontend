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
		{{iinfo}}
		<view class = "common">
			<uni-card  class = "uni-cards"  >
				<view class="content-box">
					<text class="content-box-position">
						<text class="iconfont icon-wenzhen"></text>
						普通门诊
					</text>
				</view>
			<view class = "discription" @click="showModal = true;iinfo = nn;">
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
		<view v-if = "showModal" class = "pop" @click = "gui">
			<view class="uni-list" style = "height:10%;width:100%;">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input" >{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<picker-view style = "height:70%;width:100%;"v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			    <picker-view-column>
			        <view class="item" v-for="(item,index) in array_time" :key="index" style="color:#000000;">{{item.times}}余量为{{item.num}}</view>
			    </picker-view-column>
			</picker-view>
			<view class="button-sp-area">
				<view class="tag-view" >
					<uni-tag :inverted="true" text="选择" type="success" @click="ajp" size="small"/>
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
					<view v-for ="item in array" @click="showModal = true;iinfo = item.doctorName;" class = "info-box">
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

<script>
	import {getStatic, getPharBoothList, getPharBoothDetail, postLoginIn, postJoinIn, getUserInfo} from "../../fetch/api.js"
	import {getEncryptedPassword} from "../../common/encrypt.js"
	import { getdoctor } from "../../fetch/api.js"
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 10;
		} else if (type === 'end') {
			year = year + 10;
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
			/*
			for (let i = month; i <= ; i++) {
			    months.push(i)
			}*/
			
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
				nn:'普通号',
				time_id:'8:00 - 9:00',
				array:[
				],
				array_time:[
					{
						times : '8:00 - 9:00',
						num :'5'
					},
					{
						times : '9:00 - 10:00',
						num:'6'
					},
					{
						times : '10:00 - 11:00',
						num :'7'
					},
					{
						times : '11:00 - 12:00',
						num:'8'
					},
					{
						times :'12:00 - 13:00',
						num:'4'
					},
					{
						times:'13:00 - 14:00',
						num:'4'
					},
					{
						times:'14:00 - 15:00',
						num:'4'
					},
					{
						times:'15:00 - 16:00',
						num:'4'
					},
					{
						times:'16:00 - 17:00',
						num:'4'
					},
					{
						times:'17:00 - 18:00',
						num:'4'
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
				mode: 'default',
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
		created :{
		},
		methods :{
			change(e) {
				this.current = e.detail.current
			},
			upper: function(e) {
			},
			lower: function(e) {
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			gui()
			{
				this.showModal = false;
			},
			bindChange (e) {
			    const val = e.detail.value
				this.time_id = this.array_time[val[0]].times;
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
			ajp:function(){
				uni.showModal({
				    title: '预约成功',
				    content: '恭喜你成功预约'+this.iinfo+'医生的'+this.time_id+'时间段~',
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
				            console.log('用户点击取消');
				        }
				    }
				});
			}
			
		},
		onLoad(option){
			this.hospital = JSON.parse(decodeURIComponent(option.hospital));
			this.room_sub = JSON.parse(decodeURIComponent(option.room));
			getdoctor(this.hospital,this.room_sub).then((res)=>{
				this.array=res.data.doctorList
			})
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
		min-height: 100%;
		height: auto;
	}
	.content {
		width:100%;
		height:auto;
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
			height:auto;
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
		height:20%;
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
		left:60%;
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
		height:200rpx;
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
		height:1000rpx;
		width:100%;
	}
	.infos{
		height:80%;
		width:100%;
	}
	.scroll-Y {
		height:750rpx;
		width:100%;
	}
	
	.scroll-view-item {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 25rpx;
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
	.tag-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding-top:30rpx;
		width:30%;
		left:35%;
		font-size:10rpx;
		position: fixed;
	}
</style>
