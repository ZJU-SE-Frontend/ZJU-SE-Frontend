<template>
	<view class = "pagess">
		<!-- 搜索栏-->
		<view class = "search">
			<view class="example">
				<uni-easyinput prefixIcon="search" v-model="value" placeholder="请输入医院/科室(未开发)" @iconClick="iconClick"></uni-easyinput>
			</view>
		</view>
		<!-- 医院列表-->
		<view class = "hoses">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view class="example-body" v-for ="item in hospitals" @click = "jump_room(item.hospital,item.position)">
					<uni-card  class = "uni-cards" title="标题内容" subTitle="副标题" mode="title"  note="true">
						<view class="image-box">
							<image class="images" mode="aspectFill" src="/static/doctor.png" style = "zoom:30%;border: 5px solid #ddd;border-radius:30rpx;">
						</view>
						<view class="content-box">
							<text class="content-box-text" >{{item.hospital}}</text>
							<view class="tag-view" >
								<uni-tag :inverted="true" text="三甲" type="success" size="small"/>
							</view>
							<text class="content-box-position">
								<text class="iconfont icon-weizhi"></text>
								{{item.position}}
								</text>
						</view>
						
					</uni-card>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { gethospital } from "../../fetch/api.js"
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				hosp:'',
				pos:'',
				room_array:[
					{
						name : '儿科'
					},
					{
						name : '妇科'
					},
					{
						name : '外科'
					},
					{
						name : '精神科'
					}
				],
				hospitals:{
					
				}
			}
		},
		methods: {
			scroll: function(e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			jump_room(e,p){
				this.hosp = e;
				this.pos = p;
				uni.navigateTo({//跳转页面
					url:"/pages/registration/room?hospital="+ encodeURIComponent(JSON.stringify(this.hosp)) + "&pos=" + encodeURIComponent(JSON.stringify(this.pos))
				});
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
			}
		},
		onLoad(option){
			gethospital().then((res)=>{
				this.hospitals=res.data.hospitalList
				console.log('123')
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
	.pagess{
		height:100%;
		width:100%;
	}
	.search{
		height:10%;
		width:100%;
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
	.hoses{
		height:95%;
		width:100%;
	}
	.scroll-Y {
		height: 100%;
		width:100%;
	}
	.scroll-view-item {
		height: 300rpx;
		width:100%;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.uni-cards{
		display: flex;
		flex-direction: row;
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
