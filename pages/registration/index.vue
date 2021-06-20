<template>
	<view class="content">
		<!--
		<nav  v-on:click.prevent>
			<view class="projects" @click="jump_register">{{title1}}</view>
			<view class="services" @click="jump_withdraw">{{title2}}</view>
		</nav>
		-->
		<uni-swiper-dot style = "width:100%;"class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view draggable="false" :class="item.colorClass" class="swiper-item">
						<image class="image" :src="item.url" mode="aspectFill" draggable="false" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class = "panel">
			<view class = "block" @click = "jump_choose">
				<image src = "../../static/register.jpg" style = "zoom:40%;"></image>
				<view >预约挂号</view>
			</view>
			<view class = "block">
				<image src = "../../static/control.jpg" style = "zoom:40%;"></image>
				<view>预约管理</view>
			</view>
			<view class = "block">
				<image src = "../../static/pay.jpg" style = "zoom:40%;"></image>
				<view>账单支付</view>
			</view>
			<view class = "block">
				<image src = "../../static/person.jpg" style = "zoom:40%;"></image>
				<view>个人信息</view>
			</view>
			
		</view>
		<!--
		<view class = "tabs">
			<view class="tab-card-other"  @click="changes"  v-bind:style="choosed_expert">专家号</view>
			<view class = "tab-card-center">|</view>
			<view class="tab-card-other"  @click="change_back"  v-bind:style="choosed_common">普通号</view>
		</view>    
		<view class = "back" v-if = "showchoose">
			<view class="example-body">
				<uni-combox  v-model = "hospitals" class = "comon" labelWidth = "350px" label="所在医院"  :candidates="hos" placeholder="请选择医院" emptyTips="无数据"></uni-combox>
				<uni-combox  v-model = "rooms" class = "comon" labelWidth = "350px" label="选择科室"  :candidates="mos" placeholder="请选择科室" emptyTips="无数据"></uni-combox>
			</view>
			<button @click = "jump_doctor">确认选择</button>
		</view>
		
		
		<view class = "comm" v-if = "showhospital">
			<view class="example-body">
				<uni-combox  v-model = "hospitals" class = "comon" labelWidth = "350px" label="所在医院"  :candidates="hos" placeholder="请选择医院" emptyTips="无数据"></uni-combox>
				<uni-combox  v-model = "rooms" class = "comon" labelWidth = "350px" label="选择科室"  :candidates="mos" placeholder="请选择科室" emptyTips="无数据"></uni-combox>
			</view>
			<button @click = "showanswer">确认选择</button>
		</view>
		-->
		<view class = "classifier">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				hospitals :'',
				rooms:'',
				current:'expert',
				title: '具体预约选项',
				tabBars: [{
				    name: '挂普通号',
				    id: 'common'
				}, {
				    name: '挂专家号',
				    id: 'expert'
				}],
				isShow:false,
				showchoose:true,
				showhospital:false,
				hos:[],
				mos:[],
				choosed_expert:{
					backgroundColor:'#808080',
					height:'100%',
					borderBottom:'2px #3B4144 inset',
					width:'40%'
				},
				choosed_common:{
					height:'100%',
					backgroundColor: '#262626',
					borderBottom:'2px #3B4144 solid',
					width:'40%'
				},
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
				array:[
					{
						name : '浙江大学医学院附属第一医院'
					},
					{
						name : '浙江大学医学院附属第二医院'
					},
					{
						name : '浙江大学医学院附属邵逸夫医院'
					},
					{
						name : '杭州市第一人民医院'
					},
					{
						name : '杭州市第一人民医院'
					},
					{
						name : '杭州市第一人民医院'
					}
				],
				title: '健康预约检测系统',
				hasclick:0,
				candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
				title1:'预约挂号',
				title2:'预约管理',
				title3:'查看记录',
				activeIndex: -1,
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
			}
		},
		created() {
			for (var i=0;i< this.array.length;i++){
				this.hos.push(this.array[i].name)
			}
			for (var i=0;i< this.array.length;i++){
				this.mos.push(this.room_array[i].name)
			}
		},
		methods: {
			jump_doctor()
			{
				if(this.hospitals!=''&&this.rooms!='')
				{
					this.hasclick = 1;	
					this.showchoose = false;
					this.showhospital = true;
					uni.navigateTo({//跳转页面
						url:"/pages/registration/doctor_ver2"
					});
				}
				else{
					uni.showModal({
					    title: '未选择医院和科室',
					    content: '请先选择具体的医院和科室',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}		
			},
			changes()
			{
				this.showchoose = true;
				this.showhospital = false;
				this.choosed_common = {
					backgroundColor:'#262626',
					height:'100%',
					borderBottom:'2px #3B4144 inset',
					width:'40%'
				};
				this.choosed_expert = {
					height:'100%',
					backgroundColor:'#808080',
					borderBottom:'2px #3B4144 solid',
					width:'40%'
				};
			},
			change_back()
			{
				this.showchoose = false;
				this.showhospital = true;
				this.choosed_expert = {
					backgroundColor:'#262626',
					height:'100%',
					borderBottom:'2px #3B4144 inset',
					width:'40%'
				};
				this.choosed_common = {
					height:'100%',
					backgroundColor: '#808080',
					borderBottom:'2px #3B4144 solid',
					width:'40%'
				};
			},
			choose_again()
			{
				this.hasclick = 0;
				this.showchoose = true;
				this.showhospital = false;
			},
			showanswer()
			{
				uni.showModal({
				    title: '预约成功',
				    content: '恭喜你成功预约'+this.hospitals+'医院'+this.rooms+'科室',
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
			},
			change(e){
			    this.current = e;
			},
			jump_choose: function(){
				uni.navigateTo({//跳转页面
					url:"/pages/registration/choose"
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:100%;
		height:auto;
	}


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	view{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width:100%;
	}
	nav{
		margin:0rpx auto 40rpx;
		background-color:#5597b4;
		box-shadow:0 1px 1px #ccc;
		border-radius:2px;
		width:100%;
		display:flex;
		flex-direction: row;
	}
	button{
		color:rgba(255,255,0,0.96);
		background-color: rgba(0,0,140,0.46);
	}
	nav view{
		display:inline-block;
		flex:3;
		height:100%;
		padding: 50rpx 220rpx;
		color:#fff !important;
		font-weight:bold;
		font-size:25rpx;
		text-decoration:none !important;
		line-height:1;
		text-transform: uppercase;
		background-color:transparent;

		-webkit-transition:background-color 0.25s;
		-moz-transition:background-color 0.25s;
		transition:background-color 0.25s;
	}

	
	nav.home .home,
	nav.projects .projects,
	nav.services .services,
	nav.contact .contact{
		background-color:#e35885;
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
	}
	.image {
		width: 100%;
		height:100%;
	}
	
	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400rpx;
			height:500rpx;
			margin: 0 auto;
			margin-top: 8px;
		}
	
		.image {
			width: 100%;
			height:100%;
		}
	}
	.content .example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		width:100%;
		height:200rpx;
	}
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: rgba(255,255,255,0.80);
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: rgba(0,0,0,0.96);
	}
	.comon {
		color:rgba(0,0,0,0.96);
	}
	.back {
		background-color: #262626;
		border-color: #3B4144;
		padding:20px 0px 10px 0px;
	}
	.comm {
		background-color: #262626;
		border-color: #3B4144;
		padding:20px 0px 10px 0px;
	}
	.classifier{
		width:100%;
		height:30%;
		background-color: #262626;
		
	}
	.tabs {
		display:flex;
	    flex-direction: row;
		justify-content: center;
	    overflow: hidden;
	    height: 80rpx;
		width:100%;
	}
	.tabs .tab-card-center {
		height:100%;
		background-color: #262626;
		width:20%;
		border-left: 2px #3B4144 solid;
		border-right: 2px #3B4144 solid;
	}
	.panel {
		display:flex;
		flex-direction: row;
		justify-content: center;
		overflow: hidden;
		height: 300rpx;
		width:100%;
	}
	.panel .block{
		padding:0 15px 0 15px;
		height:100%;
		flex:2;
	}
	.panel .block image{
		height:25%;
		width:33%;
	}
</style>
