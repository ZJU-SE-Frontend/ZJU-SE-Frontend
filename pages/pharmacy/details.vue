<template>
	<view class="">
		<view class="image-wrapper">
			<swiper class="swiper-box" :style="{height: swpier_height}" autoplay="true" circular="true" indicatorDots="true" indicator-active-color="#fcf6f3">
				<swiper-item  class="swiper-item" v-for="(item, index) in medicine_picture_path_list" :key="index">  
					<view class="swiper-item-view">  
						<image class="swiper-item-image":src="item" mode="aspectFit"/>  
					</view>  
				</swiper-item>
			</swiper> 
		</view>
		<unisection title="商品介绍" type="line"></unisection>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"名称："+medicine_name}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"原价：￥"+medicine_price}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"现价：￥"+medicine_price}}</view>

		<unisection title="商品规格" type="line"></unisection>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"状态："+"库存中"}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"类型："+medicine_type}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"库存："+quantity}}</view>
		<view style="margin-left: 20rpx;">
		<uni-number-box  :min="1" :max="999" :value="quan" @change="myquan($event)"></uni-number-box>
		</view>
		<unisection title="商品详情" type="line"></unisection>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"适用症："+ medicine_indication}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"用法用量："+ medicine_usageAndDosage}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"不良反应："+ medicine_adr}}</view>
		<view style="color: #999999;margin: 20rpx;font-size: 30rpx;">{{"禁忌症："+ medicine_contraindications}}</view>
	
		<!--unisection title="商品详情图" type="line"></unisection>
		<image style="width: 100%;margin-top: 20rpx;height: 350px;" src="../../static/pharmacy/indexad.jpg"></image-->

		<view class="isbottom">
		</view>
		<view>
		<uniGoodsNav class="isbutto" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
	</view>
	</view>
</template>

<script>
	//引入
	import uniNumberBox from "../../components/uni-number-box/uni-number-box.vue"
	import uniGoodsNav from '../../components/uni-goods-nav/uni-goods-nav.vue'
	import unisection from '../../components/goo-section/goo-section.vue'
	import {getPharBoothDetail} from '../../fetch/api.js' 
	import {
		uniList,
		uniListItem,
		uniListChat
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				swpier_height: 0,
				title: '药品详情',
				showFlag: false,
				medicine_picture_path_list: [],
				medicine_name :'',
				medicine_type :'',
				medicine_price :'',
				medicine_indication :'',
				medicine_usageAndDosage :'',
				medicine_adr :'',
				medicine_contraindication :'',
				quantity: Math.floor(Math.random()*2000),
				quan: 1, //初始数量
				quan1: 0, //最终数量
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'cart',
					text: '购物车',
					//info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
			}
		},
		onLoad: function(option) {
			console.log(option.id)
			getPharBoothDetail(option.id).then((res) => {
				console.log(res)
				for(var i = 0; i<3;++i)
					this.medicine_picture_path_list.push(res.data.picPath)
				this.medicine_name = res.data.name
				this.medicine_type = res.data.type
				this.medicine_price = res.data.price
				this.medicine_indication = res.data.lIndication
				this.medicine_usageAndDosage = res.data.usageAndDosage
				this.medicine_adr = res.data.adr
				this.medicine_contraindications = res.data.contraindications
			})
		},
		components: {
			uniGoodsNav,
			uniNumberBox,
			unisection
		},
		mounted() {
			this.screenWidth = document.body.clientWidth;
			this.screenHeight = document.body.clientHeight;
			this.swpier_height = (this.screenWidth*3/4) + 'rpx'
			window.onresize = () => {
				return (() => {
					this.screenWidth = document.body.clientWidth;
					this.screenHeight = document.body.clientHeight;
					this.swpier_height = (this.screenWidth*3/4) + 'rpx'
				})()
			};
		},
		methods: {
			//存取數量
			myquan(e) {
				this.quan1 = e
			},
			//左侧
			onClick(e) {
				switch (e.index) {
					case 0:
						//客服
						break
					case 1:
						//购物车
						break
				}
			},
			//右侧
			buttonClick(e) {
				switch (e.index) {
					case 0:
						console.log("加入购物车")
						this.mycat();
						break
					case 1:
						this.orno();
						break
				}
			},
			//确认下单
			orno() {
				var thit = this
				uni.showModal({
					title: '提示',
					content: '确认下单',
					success: function(res) {
						if (res.confirm) {
							thit.getwxid();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//下单
			getwxid() {
				uni.showToast({
					title: '下单成功',
					duration: 2000
				});
			},
			mycat(){
				uni.showToast({
					title: '加入购物车成功',
					duration: 2000
				});
			}
		
		}
	}
</script>

<style lang="scss">
	.image-wrapper{
		width: 100%;
		height: 100%;
		.swiper-box
		{
			left: 0;
			width: 100%;
			.swiper-item{
				height:100%;
				.swiper-item-view{
					width: 100%;
					height: 100%;
					.swiper-item-image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
	.body_list {
		border-bottom: 1rpx none #3B4144;
		margin-bottom: 40rpx;
		margin-top: 40rpx;
	}

	.body_list_1 {
		margin-left: 40rpx;
		margin-bottom: 40rpx;
		font-size: 35rpx;
	}

	.hot_goods {
		background: #eee;
		overflow: hidden;

		.tit {
			height: 50px;
			line-height: 50px;
			color: #b50e03;
			text-align: center;
			letter-spacing: 20px;
			background: #fff;
			margin: 10rpx 0;
		}
	}

	.datetime {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;

		.datetime1 {
			border: 1rpx solid #3B4144;
			width: 30%;
			height: 130rpx;
			margin: 10rpx;
			text-align: center;
			border-radius: 15rpx;
			background-color: #FFFFFF;

			.datetime11 {
				text-align: center;
				font-size: 25rpx;
				position: relative;

			}
		}

		.ismycolor {
			border: 3rpx solid #AAAAAA;
			width: 30%;
			height: 130rpx;
			margin: 10rpx;
			text-align: center;
			border-radius: 15rpx;
			background-color: #E5E5E5;

			.datetime11 {
				font-size: 25rpx;
				position: relative;
				text-align: center;

				color: #AAAAAA;
			}
		}

		.mycolor {
			border: 3rpx solid #E64340;
			width: 30%;
			height: 130rpx;
			margin: 10rpx;
			text-align: center;
			border-radius: 15rpx;
			background-color: #FFFFFF;

			.datetime11 {
				font-size: 25rpx;
				position: relative;
				text-align: center;

				color: #E64340;
			}
		}
	}

	.time {
		border-top: 1rpx none #3B4144;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;

		.timenoon {
			border: 1rpx solid #3B4144;
			width: 45%;
			height: 200rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
			border-radius: 15px;
			background-color: #FFFFFF;

			.timenoon1 {
				text-align: center;
				position: relative;
				top: 50rpx;
				margin-bottom: 20rpx;
				font-size: 40rpx;
			}
		}

		.mycolor {
			border: 1rpx solid #E64340;
			width: 45%;
			height: 200rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
			border-radius: 15px;
			background-color: #FFFFFF;

			.timenoon1 {
				text-align: center;
				position: relative;
				top: 50rpx;
				margin-bottom: 20rpx;
				font-size: 40rpx;
				color: #E64340;
			}
		}

		.ismycolor {
			border: 1rpx solid #AAAAAA;
			width: 45%;
			height: 200rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
			border-radius: 15px;
			background-color: #E5E5E5;

			.timenoon1 {
				text-align: center;
				position: relative;
				top: 50rpx;
				margin-bottom: 20rpx;
				font-size: 40rpx;
				color: #AAAAAA;
			}
		}
	}

	.buttionyes {
		width: 80%;
		height: 80%;
		margin: 10rpx;
		margin-left: 10%;
	}

	.isbuttionyes {
		background-color: #FFFFFF;
		text-align: center;
		width: 100%;
		position: fixed;
		bottom: 1rpx;
	}

	.isbottom {
		text-align: center;
		width: 450rpx;
		height: 100rpx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
		left: 200rpx;
	}

	.list-text1 {
		width: 100%;
		height: 50upx;
		line-height: 90upx;
		font-size: 25upx;
		color: #555;
		flex: 1;
	}
</style>
