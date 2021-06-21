<template>
	<view class = "pagess">
		<!-- 医院信息展示栏-->
		<view class = "barr">
			<uni-card  class = "uni-cards" title="标题内容" subTitle="副标题" mode="title"  note="true">
				<view class="image-box">
					<image class="images" mode="aspectFill" src="/static/doctor.png" style = "zoom:30%;border: 5px solid #ddd;border-radius:30rpx;">
				</view>
				<view class="content-box">
					<text class="content-box-text" >{{hospital}}</text>
					<view class="tag-view" >
						<uni-tag :inverted="true" text="三甲" type="success" size="small"/>
					</view>
					<text class="content-box-position">
						<text class="iconfont icon-weizhi"></text>
						{{position}}
					</text>
				</view>
			</uni-card>
		</view>
		
		<view class="containers"><!-- 科室选择栏-->
		<!-- 下拉选择科室-->
			<view class = "roomm">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view class = "scroll-view-item" v-for = "(item,index) in room_array" :class="{'onClickStyle':clickFlag == index}" @click="onClickItem(index,item)" >{{item}}</view>
				</scroll-view>
			</view>
			<!-- 下拉选择子科室-->
			<view class = "subroom">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view class = "scroll-view-item" v-for = "item in subroom" @click = "jump_doctor(item)">{{item}}</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getdepart,getsubdep } from "../../fetch/api.js"
	var re ='';
	export default {
		
		data() {
			return {
				hospital:'',
				position:'',
				room_sub:'',
				clickFlag: 0,
				scrollTop: 0,
				phoneHeight:0,
				now:'',
				roomer:'',
				old: {
					scrollTop: 0
				},
				room_array:[
					
				],
				subroom:[
					
				]
			}
		},
		methods: {
			upper: function(e) {
			},
			lower: function(e) {
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			onClickItem(index,p){
			   this.clickFlag = index;
			   this.roomer = p;
			   getsubdep(this.roomer,this.hospital).then((res)=>{
					this.subroom=res.data.subdepartmentList
			   })
			},
			jump_doctor(p)
			{
				
				this.room_sub = p;
				uni.navigateTo({//跳转页面
					url:"/pages/registration/doctor_ver2?hospital="+ encodeURIComponent(JSON.stringify(this.hospital)) + "&room=" + encodeURIComponent(JSON.stringify(this.room_sub))
				});
			},
			
		},
		onLoad(option){   
			let _this = this;
		
			uni.getSystemInfo({ 	//异步获取。
				success(res) {
					_this.phoneHeight = res.windowHeight;//窗口高度
				}
			});
			this.hospital = JSON.parse(decodeURIComponent(option.hospital));
			this.position = JSON.parse(decodeURIComponent(option.pos));
			
			getdepart(this.hospital).then((res)=>{
				this.room_array=res.data.departmentList
				this.now = this.room_array[0]
				getsubdep(this.now,this.hospital).then((res)=>{
					this.subroom=res.data.subdepartmentList
				})
				console.log(this.now)
				re = this.room_array[0]
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
		height: 100%;
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
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		border-top:1px solid #ddd;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}
	.onClickStyle{
	  background: rgba(255,255,255,0.7);
	}
	.pagess {
		height:100%;
		width:100%;
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
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.example {
		padding: 10px;
		background-color: #fff;
	}

	.text {
		font-size: 14px;
		color: #333;
		margin-bottom: 10px;
	}
	.containers{
		display: flex;
		flex-direction: row;
		width:100%;
		height:80%;
	}
	.roomm{
		height:100%;
		width:40%;
		background: rgba(180,180,180,0.5);
	}
	.subroom{
		height:100%;
		width:60%;
		background: -webkit-linear-gradient(top, rgba(255,255,255,0.6),rgba(212,252,121,0.1), rgba(255,255,255,0.8)) no-repeat;
	}
	.scroll-Y {
		height:100%rpx;
		width:100%;
	}
	
	.scroll-view-item {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 25rpx;
	}
	.uni-cards{
		display: flex;
		flex-direction: row;
	}
	.barr{
		height:25%;
		width:100%;
		padding-top:50rpx;
		padding-left:30rpx;
		background: -webkit-linear-gradient(bottom, rgba(255,255,255,0.6),rgba(212,252,121,0.2), rgba(150,230,161,0.6)) no-repeat;
	}
	.content-box {
		padding-top: 20rpx;
		padding-left:20rpx;
		height:100%;
		flex:8;
		display: flex;
		flex-direction: column;
		position:relative;
	}
	.content-box-text {
		font-size: 30rpx;
		line-height: 30rpx;
		height:50%;
		bottom:0%;
		color:#000000;
		width:100%;
		position:absolute;
		top:10%;
	}
	.content-box-position {
		font-size: 20rpx;
		line-height: 20rpx;
		height:50%;
		bottom:0%;
		color:#3B4144;
		width:100%;
		position:absolute;
		top:120%;
	}
	.tag-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding-top:30rpx;
		width:20%;
		font-size:10rpx;
	}
</style>
