<template>
	<transition name="medicine-detail">
		<!--<view class="medicine" ref="medicineView" v-show="showFlag">-->
		<view class="medicine">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">

				<view class="medicine-wrapper">
					<view class="medicine-content">
						<view class="image-wrapper">
							<image class="medicine-image" :src="medicine_picture_path" />

							<image class="share-bt" src="/static/pharmacy/image/share.png" />
							<image class="more-bt" src="/static/pharmacy/image/more.png" />
						</view>
						<view class="content-wrapper">
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
							<view class="buy">
								加入购物车
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
				medicine_picture_path: ''
			}
		},
		onLoad: function(option) {
			getStatic("/pharmacy/details.json").then((res) => {
				this.medicine_picture_path = res.data.list[option.id].path
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

<style>
	.medicine {
		position: fixed;
		left: 0;
		top: 50rpx;
		bottom: 51px;
		background: white;
		width: 100%;
		z-index: 90;
	}

	.medicine-detail-enter-active,
	.medicine-detail-leave-active {
		transition: 1.0s
	}

	.medicine-detail-leave-to,
	.medicine-detail-leave-to {
		transform: translateX(100%);
	}

	.medicine .medicine-wrapper .medicine-content .imgage-wrapper {
		position: relative;
		width: 100%;
		height: 0;
		/* 高度如何撑开？
		在定位中，使用padding-top或padding-bottom设置为100%，其实盒子高度会根据盒子的宽度进行计算
		*/
		padding-top: 100%;
	}

	.medicine .medicine-wrapper .medicine-content .image-wrapper .medicine-image {
		position: absolute;
		left: 0;
		top: 100rpx;
		width: 100%;
		height: 50%;
	}

	.medicine .medicine-wrapper .medicine-content .image-wrapper .share-bt,
	.medicine .medicine-wrapper .medicine-content .image-wrapper .more-bt {
		width: 30px;
		height: 30px;
		position: absolute;
		top: 720rpx;
	}

	.medicine .medicine-wrapper .medicine-content .image-wrapper .share-bt {
		right: 50px;
	}

	.medicine .medicine-wrapper .medicine-content .image-wrapper .more-bt {
		right: 10px;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper {
		padding: 750rpx 0 16px 16px;
		position: relative;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper .name {
		font-size: 20px;
		color: #333333;
		line-height: 20rpx;
		font-weight: bold;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper .reverse {
		font-size: 15px;
		color: #9d9d9d;
		margin-bottom: 6px;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper .product {
		height: 15px;
		margin-bottom: 15px;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper .price {
		font-size: 0;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper .price .text {
		font-size: 17px;
		color: #FB4E44;
	}

	.medicine .medicine-wrapper .medicine-content .content-wrapper .price .unit {
		font-size: 17px;
		color: #9D9D9D;
	}

	.medicine .medicine-wrapper .medicine-content .buy {
		width: 64px;
		height: 30px;
		font-size: 12px;
		line-height: 30px;
		text-align: center;
		background: #118bee;
		border-radius: 30px;
		position: absolute;
		right: 12px;
		top: 800rpx;
	}

	.scroll-Y {
		height: 100%;
	}

	.medicine .medicine-wrapper .description-content {
		padding: 16px 0 16px 16px;
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
