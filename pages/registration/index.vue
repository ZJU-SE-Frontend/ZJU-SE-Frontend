<template>
	<view class="contents">
		<view class= "content" v-if = "role==1 || role==undefined">
			<uni-swiper-dot style="width:100%;" class="uni-swiper-dot-box" @clickItem=clickItem :info="info"
				:current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view draggable="false" :class="item.colorClass" class="swiper-item">
							<image class="image" :src="item.url" mode="aspectFill" draggable="false" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<view class="panel">
				<view class="block" @click="jump_choose">
					<image src="../../static/register.jpg" style="zoom:10%;" mode = "aspectFit"></image>
					<view>预约挂号</view>
				</view>
				<view class="block" @click="jump_show">
					<image src="../../static/control.jpg" style="zoom:10%;"mode = "aspectFit"></image>
					<view>预约管理</view>
				</view>
			</view>
		</view>
		<view class = "YmContent" v-if = "role==2">
				<view class="info_96">
						<view class="row4">
							<text decode="true" class="info_66">姓名</text>
							<text decode="true" class="name">{{doctorInfomation.doctorName}}</text>
						</view>
						<view class="info_69">
						</view>
						<view v-on:click="row3_70_click()" class="row3">
							<text decode="true" class="info_71">预约病人列表</text>
							<text decode="true" class="ids">详情</text>
							<image src="/static/info/images/info_73_73.jpg" mode="scaleToFill" border="0"    class="info_73"></image>
						</view>
						<view class="info_74">
						</view>
						<view class="row2">
							<text decode="true" class="info_76">手机号码</text>
							<text decode="true" class="mobile">{{doctorInfomation.doctorPhone}}</text>
						</view>
						<view class="info_79">
						</view>
						<view class="row1">
							<text decode="true" class="info_81">从业时长</text>
							<text decode="true" class="job">{{doctorInfomation.workTime}}</text>
						</view>
						<view class="info_83">
						</view>
						<view class="row1">
							<text decode="true" class="info_81">医院</text>
							<text decode="true" class="job">{{doctorInfomation.hospital}}</text>
						</view>
						<view class="info_83">
						</view>
						<view class="row1">
							<text decode="true" class="info_81">科室岗位</text>
							<text decode="true" class="job">{{doctorInfomation.department}}{{doctorInfomation.title}}</text>
						</view>
						<view class="info_83">
						</view>
						<view class="row1">
							<text decode="true" class="info_81">工号</text>
							<text decode="true" class="job">{{doctorInfomation.doctorId}}</text>
						</view>
						<view class="info_83">
						</view>
						<view class="row1">
							<text decode="true" class="info_81">介绍</text>
							<text decode="true" class="job">{{doctorInfomation.doctorInfo}}</text>
						</view>
					</view>
				
				
				<view class="loading">{{loadingText}}</view>
				<view class="ymBbottom"></view>
			</view>
	</view>
</template>

<script>
	import store from "@/common/store.js"
	import { getCurrentUserRole,getDoctorInfo} from "../../fetch/api.js"
	export default {
		components: {},
		data() {
			return {
				//医生端数据
				loadingText: '',
				animation: '',
				animationData: {},
				 
				page:0,//当前分页页码
				apiUrl:'',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:'',//方便存在本地的locakStorage 
				doctorInfomation: {
					doctorPhone: '18888988888',
					doctorName: '陈岩',
					hospital: '浙一',
					department: '儿科',
					doctorInfo: '擅长儿科哮喘疾病的治疗',
					title: '主任医师',
					doctorId: 'ID888',
					workTime: 10,
					age: 30,
					gender: 'male'
				},
				//病人端数据
				hospitals: '',
				rooms: '',
				title: '具体预约选项',
				tabBars: [{
					name: '挂普通号',
					id: 'common'
				}, {
					name: '挂专家号',
					id: 'expert'
				}],
				isShow: false,
				role:1,
				showchoose: true,
				showhospital: false,
				hos: [],
				mos: [],
				choosed_expert: {
					backgroundColor: '#808080',
					height: '100%',
					borderBottom: '2px #3B4144 inset',
					width: '40%'
				},
				choosed_common: {
					height: '100%',
					backgroundColor: '#262626',
					borderBottom: '2px #3B4144 solid',
					width: '40%'
				},
				room_array: [{
						name: '儿科'
					},
					{
						name: '妇科'
					},
					{
						name: '外科'
					},
					{
						name: '精神科'
					}
				],
				array: [{
						name: '浙江大学医学院附属第一医院'
					},
					{
						name: '浙江大学医学院附属第二医院'
					},
					{
						name: '浙江大学医学院附属邵逸夫医院'
					},
					{
						name: '杭州市第一人民医院'
					},
					{
						name: '杭州市第一人民医院'
					},
					{
						name: '杭州市第一人民医院'
					}
				],
				title: '健康预约检测系统',
				hasclick: 0,
				candidates: ['北京', '南京', '东京', '武汉', '天津', '上海', '海口'],
				title1: '预约挂号',
				title2: '预约管理',
				title3: '查看记录',
				activeIndex: -1,
				info: [
					{
						colorClass: 'uni-bg-green',
						url: '/static/prime1.jpeg',
						content: '内容 B'
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
				swiperDotIndex: 0,
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				// indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
				indicatorStyle: `height: 50px;`
			}
		},
		onShow() {
			if(store.state.hasLogin){
				this.role = store.state.uerInfo.authType;
				console.log(this.role);
				if(this.role == 2){
					console.log('yes');
							
					this.page=0;
							
					//检测有没有传入id参数
					/*
					if (options.id != null && options.id !=""){
						this.id=options.id;
					}   */
					
					var doctorPhone = store.state.uerInfo.userPhone;//option.doctorPhone;
					console.log(doctorPhone);
					getDoctorInfo(store.state.uerInfo.userPhone).then((res) => {
						this.$data.doctorInfomation = res.data
						if (this.doctorInfomation.gender == "male") this.doctorInfomation.gender = "男";
						else this.doctorInfomation.gender = "女";
						console.log(this.doctorInfomation)
					})
					console.log('y');
					// 初始化一个动画
					/*
					var animation = uni.createAnimation({
						transformOrigin: "50% 0 50%",
						duration: 300, //动画持续0.3秒
						timingFunction: 'linear', //linear 全程匀速运动
						delay: 100 //延迟1秒执行动画
					})
					this.animation = animation;
					this.scaleAndScale();*/
				}
			}
			else{
				uni.showToast({
					icon:"none",
					title:"您未登录"
				})
			}
		},
		created() {
			for (var i = 0; i < this.array.length; i++) {
				this.hos.push(this.array[i].name)
			}
			for (var i = 0; i < this.array.length; i++) {
				this.mos.push(this.room_array[i].name)
			}
		},
		methods: {
			jump_doctor() {
				if (store.state.hasLogin == false) {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				} else {
					if (this.hospitals != '' && this.rooms != '') {
						this.hasclick = 1;
						this.showchoose = false;
						this.showhospital = true;
						uni.navigateTo({ //跳转页面
							url: "/pages/registration/doctor_ver2"
						});
					} else {
						uni.showModal({
							title: '未选择医院和科室',
							content: '请先选择具体的医院和科室',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}

			},
			jump_doctors() {
				if (store.state.hasLogin == false) {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				} else {
					this.hasclick = 1;
					this.showchoose = false;
					this.showhospital = true;
					uni.navigateTo({ //跳转页面
						url: "/pages/registration/doctor_info"
					});
				}

			},
			jump_patient() {
				if (store.state.hasLogin == false) {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				} else {
					uni.navigateTo({ //跳转页面
						url: "/pages/registration/patient"
					});
				}

			},
			changes() {

				this.showchoose = true;
				this.showhospital = false;
				this.choosed_common = {
					backgroundColor: '#262626',
					height: '100%',
					borderBottom: '2px #3B4144 inset',
					width: '40%'
				};
				this.choosed_expert = {
					height: '100%',
					backgroundColor: '#808080',
					borderBottom: '2px #3B4144 solid',
					width: '40%'
				};


			},
			change_back() {
				this.showchoose = false;
				this.showhospital = true;
				this.choosed_expert = {
					backgroundColor: '#262626',
					height: '100%',
					borderBottom: '2px #3B4144 inset',
					width: '40%'
				};
				this.choosed_common = {
					height: '100%',
					backgroundColor: '#808080',
					borderBottom: '2px #3B4144 solid',
					width: '40%'
				};

			},
			choose_again() {
				this.hasclick = 0;
				this.showchoose = true;
				this.showhospital = false;
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
			showanswer() {
				uni.showModal({
					title: '预约成功',
					content: '恭喜你成功预约' + this.hospitals + '医院' + this.rooms + '科室',
					success: function(res) {
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
			change(e) {
				this.current = e;
			},
			jump_choose: function() {
				if (store.state.hasLogin == false) {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				} else {
					uni.navigateTo({ //跳转页面
						url: "/pages/registration/choose"
					});
				}

			},
			jump_show: function() {
				if (store.state.hasLogin == false) {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				} else {
					uni.navigateTo({ //跳转页面
						url: "/pages/registration/show"
					});
				}

			},
			/**
			 * 医生端函数
			* row3_70处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			row3_70_click:function(event){
			   var path = '/pages/registration/Reception'
			   path = path + '?doctorPhone=' + this.doctorInfomation.doctorPhone
			   uni.navigateTo({
			   url:path
			  })
			},
			// 定义动画内容
			scaleAndScale() {
				// 定义动画内容
				this.animation.opacity(0, 1).step() //先放大1,2倍
				this.animation.opacity(1, 0).step() //缩小至原来的大小
				// 导出动画数据传递给data层
				this.animationData = this.animation.export(); //每次执行导出动画时 会覆盖之前的动画
			},
			//刷新数据
			Refresh:function(_action) {
				getDoctorInfo(this.doctorInfomation.doctorPhone).then((res) => {
					this.$data.doctorInfomation = res.data
					if (this.doctorInfomation.gender == "male") this.doctorInfomation.gender = "男";
					else this.doctorInfomation.gender = "女";
					console.log(this.doctorInfomation)
				})
				
				setTimeout(function () {
				    uni.stopPullDownRefresh();
				}, 2000);
				
			}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		onLoad(options) {
			if(store.state.hasLogin == false){
				uni.showToast({
					icon: 'none',
					title: '请先登录'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './doctor_info.scss';
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: auto;
	}


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.content view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	nav {
		margin: 0rpx auto 40rpx;
		background-color: #5597b4;
		box-shadow: 0 1px 1px #ccc;
		border-radius: 2px;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	button {
		color: rgba(255, 255, 0, 0.96);
		background-color: rgba(0, 0, 140, 0.46);
	}

	nav view {
		display: inline-block;
		flex: 3;
		height: 100%;
		padding: 50rpx 220rpx;
		color: #fff !important;
		font-weight: bold;
		font-size: 25rpx;
		text-decoration: none !important;
		line-height: 1;
		text-transform: uppercase;
		background-color: transparent;

		-webkit-transition: background-color 0.25s;
		-moz-transition: background-color 0.25s;
		transition: background-color 0.25s;
	}


	nav.home .home,
	nav.projects .projects,
	nav.services .services,
	nav.contact .contact {
		background-color: #e35885;
	}

	.swiper-box {
		height: 500rpx;
		width: 100%;
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
		height: 500rpx;
	}

	.image {
		width: 100%;
		height: 100%;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400rpx;
			height: 500rpx;
			margin: 0 auto;
			margin-top: 8px;
		}

		.image {
			width: 100%;
			height: 100%;
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
		width: 100%;
		height: 200rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: rgba(255, 255, 255, 0.80);
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: rgba(0, 0, 0, 0.96);
	}

	.comon {
		color: rgba(0, 0, 0, 0.96);
	}

	.back {
		background-color: #262626;
		border-color: #3B4144;
		padding: 20px 0px 10px 0px;
	}

	.comm {
		background-color: #262626;
		border-color: #3B4144;
		padding: 20px 0px 10px 0px;
	}

	.classifier {
		width: 100%;
		height: 30%;
		background-color: #262626;

	}

	.tabs {
		display: flex;
		flex-direction: row;
		justify-content: center;
		overflow: hidden;
		height: 80rpx;
		width: 100%;
	}

	.tabs .tab-card-center {
		height: 100%;
		background-color: #262626;
		width: 20%;
		border-left: 2px #3B4144 solid;
		border-right: 2px #3B4144 solid;
	}

	.panel {
		display: flex;
		flex-direction: row;
		justify-content: center;
		overflow: hidden;
		height: 250rpx;
		width: 50%;
		border-radius: 20rpx;
		box-shadow: 20rpx 20rpx 2rpx 2rpx #888888;
	}

	.panel .block {
		padding: 0 15px 0 15px;
		height: 100%;
		font-size: 35rpx;
		font-weight:bold;
		flex: 2;
	}

	.panel .block image {
		height: 25%;
		width: 40%;
	}
</style>
