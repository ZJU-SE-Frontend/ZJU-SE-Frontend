<template>
	<view @touchstart="start" @touchend="end">
		<view class="list_box">
			<!-- 菜单左边 -->
			<view class="head">
				<view class="item" v-for="(item,index) in titlist" :key="index" :class="{ 'active':index==List_Index }"
				:data-index="index" @tap="List_Tap">{{item}}</view>
			</view>
		</view>

<!-- 		订单列表页面 -->
		<view class="ddlistvbg">
			<view class="ddlistv" v-for="(item,lidx) in showlist" :key="lidx" @click="detaildid(lidx)">
				<view class="titbgv">
					<view class="titbgv_l">订单号：{{item.orderId}}</view>
					<view class="titbgv_r">{{item.state}}</view>
				</view>
				<view class="listv" v-for="(goods,gsidx) in item.goods" :key="gsidx">
					<image class="imgv" mode="aspectFill" :src=goods.pic @tap="onItemClicked(lidx, gsidx)"></image>
					<view class="listv_r">
						<view class="listv_r_l" @tap="onItemClicked(lidx, gsidx)">
							<view class="listv_r_l_top">{{goods.name}}</view>
							<view class="listv_r_l_btm"><text style="margin-right: 10px;">类型</text> {{goods.type}}</view>
						</view>
						<view class="listv_r_r">x{{goods.amount}}<text style="">\n\n¥{{goods.price}}</text> </view>
					</view>
				</view>
				<view class="listbg_btm">
					<view class="listbg_btm_r">实付金额：<text style="color: #f31c20; font-size: 14px;">¥{{item.totalPrice}}</text></view>
				</view>

				<view class="btmv1">下单时间：{{item.dateTime}}
				</view>
				<view class="btmv2">
					<view class="btmv2_btn" :class="{'btmv2_btn_wc':str == '去支付' || str == '确认收货' || (str == '骑手打赏' && item.state == getOrderState(item.state)) || str == '去评价'}"
					 v-for="(str,sidx) in btnlist[getOrderState(item.state)]" :key="sidx" @click.stop="btnclick(str,lidx)">{{str}}</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import store from "@/common/store.js"
	import {
		getStatic, getPharOrderList, getPharOrderDetail, getPharBoothDetail
	} from "../../fetch/api.js"
	import Vue from 'vue'
	export default {
		data() {
			return {
				titsel: 0,
				offsetnum:0,
				List_Index: 0,
				titlist: [
					'全部',
					'待支付',
					'待发货',
					'待收货',
					'已完成'
				],
				data_list:[],
				goods:[],
				dataList: [{
						name: '红酒体验店',
						addess: '郑州市黄河路弄月路',
						state: 0,
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1740110050,3481308065&fm=26&gp=0.jpg',
						tit: '【俺买酒】酒鬼酒 红坛十五年52度 500ml',
						attribute: '不加冰',
						num: '3',
						sku: '500g',
						date: '2019-12-01',
						price: '56',
						cprice: '168',
						ordernum: '4545245824515545'
					},
					{
						name: '红酒体验店',
						addess: '郑州市黄河路弄月路',
						state: 1,
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1740110050,3481308065&fm=26&gp=0.jpg',
						tit: '【俺买酒】酒鬼酒 红坛十五年52度 500ml',
						attribute: '加冰',
						num: '3',
						sku: '500g',
						date: '2019-12-01',
						price: '56',
						cprice: '168',
						ordernum: '4545245824515545'
					},
					{
						name: '红酒体验店',
						addess: '郑州市黄河路弄月路',
						state: 2,
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1740110050,3481308065&fm=26&gp=0.jpg',
						tit: '【俺买酒】酒鬼酒 红坛十五年52度 500ml',
						attribute: '不加冰',
						num: '3',
						sku: '500g',
						date: '2019-12-01',
						price: '56',
						cprice: '168',
						ordernum: '4545245824515545'
					},
					{
						name: '红酒体验店',
						addess: '郑州市黄河路弄月路',
						state: 3,
						img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1740110050,3481308065&fm=26&gp=0.jpg',
						tit: '【俺买酒】酒鬼酒 红坛十五年52度 500ml',
						attribute: '加冰',
						num: '3',
						sku: '500g',
						date: '2019-12-01',
						price: '56',
						cprice: '168',
						ordernum: '4545245824515545'
					}
				],
				showlist : [],
				btnlist: [
					['联系商家', '取消订单', '去支付'],
					['联系商家'],
					['联系商家', '查看骑手位置', '确认收货'],
					['申请售后', '评价订单', '联系商家', '骑手打赏', '再来一单'],
					['联系商家'],
					['联系商家', '骑手打赏', '去评价'],
					['联系商家', '申请退款售后']
				],
				startData:{
					clientX:'',
					clientY:''
				}
			}
		},
		methods: {
			start(e){
			    this.startData.clientX=e.changedTouches[0].clientX;
			                 
			    this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e){
			    // console.log(e)
			    const subX=e.changedTouches[0].clientX-this.startData.clientX;
			    const subY=e.changedTouches[0].clientY - this.startData.clientY;
			    if(subY>50 || subY<-50){
			        // console.log('上下滑')
			    }else{
			        if(subX>100){
			            console.log('右滑')
						if(this.titsel <= 0){
							console.log('右滑最小')
							return;
						}
						this.titsel--;
						this.offsetnum -= 60
						
			        }else if(subX<-100){
			            console.log('左滑')
						if(this.titsel >= (this.titlist.length-1)){
							console.log('左滑最大')
							return;
						}
						this.titsel++;
						console.log(this.titsel,this.offsetnum)
						this.offsetnum += 60
						
			        }else{
			            console.log('无效')
			        }
			    }
			},
			// 获取对应的状态
			getOrderState(state) {
				for(var i = 0; i < this.titlist.length; i++)
				{
					if(this.titlist[i] == state)
					{
						
						return i;
					}
				}
			},
			List_Tap(e) {
				this.showlist = [];
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.List_Index = Number(index);
				if (index == 0)
				{
					this.showlist = this.data_list;
				}
				else
				{
					for (var i = 0; i < this.data_list.length; i++) {
						if (index == this.getOrderState(this.data_list[i].state)) {
							this.showlist.push(this.data_list[i]);
						}
					}
				}
			},
			scrollset: function(e){
				console.log(e.detail.scrollLeft);
				// this.offsetnum = e.detail.scrollLeft
			},
			
			didSeltit(idx) {
				this.titsel = idx;
			},
			btnclick(str, idx) {
				console.log(str, idx);
				if(str.indexOf('查看骑手位置') != -1){
					uni.navigateTo({ 
						url:'../orderdetail/YSHLookLocation'
					})
				}
				if(str.indexOf('骑手打赏') != -1){
					uni.navigateTo({ 
						url:'../orderBtnClick/YSHRiderExceptional'
					})
				}
				if(str.indexOf('去评价') != -1 || str.indexOf('评价订单') != -1){
					uni.navigateTo({
						url:'../orderBtnClick/YSHGoodsEvaluation'
					})
				}
				if (str.indexOf('申请退款售后') != -1 || str.indexOf('申请售后') != -1) {
					uni.navigateTo({
						url: '../orderBtnClick/YSHApplyForRefundAfterSale'
					})
				}
				if (str.indexOf('去支付') != -1 || str.indexOf('再来一单') != -1) {
					uni.navigateTo({
						url: '../orderBtnClick/YSHSGoodsSureOrder'
					})
				}
				if (str.indexOf('联系商家') != -1) {
					uni.makePhoneCall({
						// 手机号
						phoneNumber: '18595857565',
						// 成功回调
						success: (res) => {
							console.log('调用成功!')
						},
						// 失败回调
						fail: (res) => {
							console.log('调用失败!')
						},
					});
				}
			},
			detaildid(idx) {
				console.log(idx);
				if (idx == 2) {
					uni.navigateTo({
						url: '../orderdetail/YSHShopOrderDetail2?type=' + idx
					})
				} else {
					uni.navigateTo({
						url: '../orderdetail/YSHShopOrderDetail?type=' + idx
					})
				}
			},
			onItemClicked(index, index2) {
				uni.navigateTo({
					url: 'details?id='+this.data_list[index].goods[index2].medicineId
				})
			}
		},
		onLoad: function(option) {
			getPharOrderList(store.state.uerInfo.userPhone).then((orderList)=>{
				orderList.data.forEach((order)=>{
					getPharOrderDetail(order.orderId).then((orderDetail)=>{
						let oneOrder = {
							"orderId": order.orderId,
							"state": order.state,
							"totalPrice": order.totalPrice,
							"dateTime": order.dateTime
						}
						let goods = []
						for(var i = 0; i < orderDetail.data.length; i++)
						{
							let tempGood = {
								"medicineId": orderDetail.data[i].medicineId,
								"amount": orderDetail.data[i].amount,
								"price": orderDetail.data[i].price,
							}
							getPharBoothDetail(orderDetail.data[i].medicineId).then((good)=>{
								tempGood["name"]=good.data.name
								tempGood["type"]=good.data.type
								tempGood["pic"]=good.data.picPath
							})
							goods.push(tempGood)
						}
						oneOrder["goods"]=goods
						this.data_list.push(oneOrder)
					})
				})
			})
			this.showlist = this.data_list;
		}
	}
</script>

<style lang="scss">
	.list_box {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;
		padding-top: 50rpx;
		.head {
			background-color: #5500ff;
			line-height: 60rpx;
			width: 100%;
			box-sizing: border-box;
			font-size: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.item {
				flex: 1;
				position: relative;
				text-align: center;
				color: #ffffff;
				&:not(:first-child) {
					margin-left: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						width: 620px;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
				}
			}
		}
	}
.ddlistvbg {
		width: 100%;
		margin-top: 20px;
		height: calc(100% - 41px);
		position: absolute;
		// background-color: #4CD964;

		.ddlistv {
			width: calc(100% - 30px);
			margin-left: 15px;
			margin-top: 10px;
			border-radius: 5px;
			background-color: #fff;

			.titbgv {
				width: calc(100% - 20px);
				height: 40px;
				line-height: 35px;
				margin-left: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.titbgv_l {
					font-size: 14px;
					color: #999999;
				}

				.titbgv_r {
					font-size: 14px;
				}
			}

			.listbg_btm {
				// background-color: #4CD964;
				height: 35px;
				width: calc(100% - 20px);
				margin-left: 10px;
				display: flex;
				justify-content: flex-end;
				border-bottom: 0.6px solid #f1f1f1;

				.listbg_btm_r {
					line-height: 30px;
					// background-color: #4CD964;
					font-size: 13px;
					margin-bottom: 10px;
					color: #999999;
				}
			}

			.btmv1 {
				// height: 35px;
				width: calc(100% - 20px);
				margin-left: 10px;
				font-size: 13px;
				line-height: 20px;
				color: #999999;
				// background-color: #007AFF;
				margin-top: 10px;
			}

			.btmv2 {
				// height: 50px;
				width: calc(100% - 20px);
				margin-left: 10px;
				margin-top: 5px;
				display: flex;
				justify-content: flex-end;
				flex-wrap: wrap;

				.btmv2_btn {
					color: #999999;
					font-size: 13px;
					height: 28px;
					line-height: 28px;
					text-align: center;
					padding: 0 13px;
					margin-left: 12px;
					border: 1px solid #999999;
					border-radius: 28px;
					margin-bottom: 15px;
				}

				.btmv2_btn_wc {
					color: #f31c20;
					border: 1px solid #f31c20;
				}
			}

			.listv {
				margin-top: 10px;
				height: 80px;
				width: 100%;
				background-color: #fff;
				display: flex;
				justify-content: space-between;

				// background-color: #4CD964;
				.imgv {
					width: 70px;
					height: 70px;
					margin-top: 5px;
					margin-left: 10px;
				}

				.listv_r {
					// background-color: #4CD964;
					width: calc(100% - 70px - 20px);
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.listv_r_l {
						// background-color: #fc02ff;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						overflow: hidden;
						width: 65%;
						height: 100%;

						.listv_r_l_top {
							font-size: 14px;
							// margin-top: 10px;
							height: 40px;
							overflow: hidden;
						}

						.listv_r_l_btm {
							font-size: 12px;
							color: #999999;
							// margin-bottom: 10px;
							height: 16px;
							overflow: hidden;
						}

						.listv_r_l_btm2 {
							font-size: 12px;
							color: #999999;
							// margin-bottom: 10px;
							height: 17px;
							overflow: hidden;
						}
					}

					.listv_r_r {
						// background-color: #ff3434; 
						width: 33%;
						height: 100%;
						line-height: 100%;
						display: flex;
						// align-items: center;
						justify-content: flex-end;
						flex-direction: column;
						margin-right: 10px;
						font-size: 13px;
						text-align: right;
					}
				}
			}
		}
	}
</style>
