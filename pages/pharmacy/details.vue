<template>
	<transition name="medicine-detail">
		<!--<view class="medicine" ref="medicineView" v-show="showFlag">-->
		<view class="medicine">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view class="medicine-wrapper">
					<view class="medicine-content">
						<view class="image-wrapper">
							<swiper class="swiper-box" :style="{height: swpier_height}" autoplay="true" circular="true" indicatorDots="true" indicator-active-color="#fcf6f3">
								<swiper-item  class="swiper-item" v-for="(item, index) in medicine_picture_path_list" :key="index">  
									<view class="swiper-item-view">  
										<image class="swiper-item-image":src="item" mode="aspectFit"/>  
									</view>  
								</swiper-item>
							</swiper> 
						</view>
						<view class="content-wrapper">
							<view class="information">
								<h2 class="name">
									<!--medicine name-->
									{{medicine_name}}
								</h2>
								<p class="reverse">
									库存{{medicine_reverses}}
								</p>
								<p class="price">
									<text class="text">￥{{medicine_price}}</text>
									<text class="unit">/{{medicine_unit}}</text>
								</p>
							</view>
							<view class="others">
								<view class="image">
									<image class="share-bt" src="../../static/pharmacy/image/share.png" mode="aspectFill"/>
									<image class="more-bt" src="../../static/pharmacy/image/more.png" mode="aspectFill"/>
								</view>
								<view class="buy">
									加入购物车
								</view>
							</view>
						</view>
					</view>
					<view class="split-line"></view>
					<view class="description-content">
						<view class="medicine-name">
							<h2 class="description">
								药品说明
							</h2>
						</view>
						<view class="medicine-component ">
							<h3 class="component">
								药品成份
							</h3>
							<view v-html="medicine_content">
							</view>
						</view>
						<view>
							<h3 class="specification">
								规格
							</h3>
							<view v-html="medicine_specification">
							</view>
						</view>
						<view>
							<h3 class="character">
								性状
							</h3>
							<view v-html="medicine_character">
							</view>
						</view>
						<view>
							<h3 class="symptom">
								适应症
							</h3>
							<view v-html="medicine_symptom">
							</view>
						</view>
						<view>
							<h3 class="usage">
								用法用量
							</h3>
							<view v-html="medicine_usage">
							</view>
						</view>
						<view>
							<h3 class="reaction">
								不良反应
							</h3>
							<view v-html="medicine_reaction">
							</view>
						</view>
						<view>
							<h3 class="storage">
								存放环境
							</h3>
							<view v-html="medicine_storage">
							</view>
						</view>
						<view>
							<h3 class="number">
								批准文号
							</h3>
							<view v-html="medicine_number">
							</view>
						</view>
						<view>
							<h3 class="factory">
								生产企业
							</h3>
							<view v-html="medicine_factory">
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</transition>
</template>

<script>
	import {
		getStatic
	} from "../../fetch/api.js"
	export default {
		data() {
			return {
				swpier_height: 0,
				title: '药品详情',
				showFlag: false,
				medicine_name: '',
				medicine_reverses: '',
				medicine_price: '',
				medicine_unit: '',
				medicine_content: '',
				medicine_specification: '',
				medicine_sympton: '',
				medicine_usage: '',
				medicine_reaction: '',
				medicine_storage: '',
				medicine_number: '',
				medicine_factory: '',
				medicine_character: '',
				medicine_picture_path_list: []
			}
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
		computed:{

		},
		onLoad: function(option) {
			getStatic("/pharmacy/details.json").then((res) => {
				for(var i = 0; i<3;++i)
					this.medicine_picture_path_list.push(res.data.list[option.id].path)
				this.medicine_name = res.data.list[option.id].name
				this.medicine_price = res.data.list[option.id].price
				this.medicine_reverses = res.data.list[option.id].reverses
				this.medicine_unit = res.data.list[option.id].unit
				this.medicine_content = res.data.list[option.id].content.replace(/\n/g, '<br>')
				this.medicine_specification = res.data.list[option.id].specification.replace(/\n/g, '<br>')
				this.medicine_symptom = res.data.list[option.id].symptom.replace(/\n/g, '<br>')
				this.medicine_usage = res.data.list[option.id].usage.replace(/\n/g, '<br>')
				this.medicine_reaction = res.data.list[option.id].reaction.replace(/\n/g, '<br>')
				this.medicine_storage = res.data.list[option.id].storage.replace(/\n/g, '<br>')
				this.medicine_number = res.data.list[option.id].number.replace(/\n/g, '<br>')
				this.medicine_factory = res.data.list[option.id].factory.replace(/\n/g, '<br>')
				this.medicine_character = res.data.list[option.id].character.replace(/\n/g, '<br>')
			})
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			getInformation() {

			}
		},

	}
</script>

<style lang="scss">
	.medicine {
		font-size: 150%;
		margin-top: 30rpx;
		.medicine-wrapper{
			.medicine-content{
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
				.content-wrapper
				{
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: flex-start;
					align-content: flex-start;
					position: relative;
					width: 100%;
					height:100%;
					padding: 0 5% 0;
					.information{
						width: 100%;
						height: 100%;
						box-sizing:border-box;
						.name{
							font-size: 30px;
							color: #333333;
							line-height: 100%;
							font-weight: bold;
						}
						.reverse {
							font-size: 17px;
							color: #9d9d9d;
							margin-bottom: 5px;
						}
						.price {
							font-size: 0;
							.text {
								font-size: 17px;
								color: #FB4E44;
							}
							.unit {
								font-size: 17px;
								color: #9D9D9D;
							}
							margin-top: 0px;
						}
					}
					.others{
						box-sizing:border-box;
						width: 100%;
						height: 100%;
						.image{
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: flex-start;
							align-content: flex-start;
							box-sizing:border-box;
							.more-bt
							{
								box-sizing:border-box;
								width: 50px;
								height: 50px;
							}
							.share-bt
							{
								margin: 0 5% 0 0;
								box-sizing:border-box;
								width: 50px;
								height: 50px;
							}
						}
						
						.buy {
							margin: 3% 0 0 0;
							box-sizing:border-box;
							width: 50%;
							height: 30%;
							font-size: 50%;
							line-height: 30px;
							text-align: center;
							background: #118bee;
							border-radius: 30px;
							color: #FFFFFF;	
						}
					}

				}
				
			}
			
		}
	}

	.medicine-detail-enter-active,
	.medicine-detail-leave-active {
		transition: 1.0s
	}

	.medicine-detail-leave-to,
	.medicine-detail-leave-to {
		transform: translateX(100%);
	}

	.scroll-Y {
		height: 100%;
	}

	.medicine .medicine-wrapper .description-content {
		padding: 16px 5% 16px 5%;
		position: relative;
	}

	.medicine .medicine-wrapper .description-content .medicine-name {
		line-height: 30px;
	}

	.medicine .medicine-wrapper .description-content .medicine-component {
		line-height: 30px;
	}

	.split-line {
		width: 100%;
		height: 10px;
		background: #d4d4d4;
	}
</style>
