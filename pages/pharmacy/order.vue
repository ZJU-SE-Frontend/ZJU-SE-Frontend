<!-- 下面模板页面 有钱的 可以进一步根据自己的业务需求进行修改美化 和自己的系统衔接-->
<template>
	<view class="content">
			<view class="order_details_1">
				<view class="order_details_7">
					<text class="status">订单创建成功</text>
					<text class="smallTitle">订单详情</text>
				</view>
				<view class="order_details_2">
					<view class="goods">
						<view v-for="(item, index) in mediList" :key="index" class="row">
							<image :src="item.img" mode="scaleToFill" border="0"    class="pic"></image>
							<view class="order_details_10">
								<text decode="true" class="good">{{item.name}}</text>
								<text decode="true" class="num">*{{item.count}}</text>
							</view>
							<text decode="true" class="money">{{item.count*item.price}}</text>
						</view>
					</view>
					<view class="order_details_15">
						<text decode="true" class="order_details_16" >共{{getNum}}份小计￥{{getAllPrice}}元</text>
					</view>
				</view>
				<button @tap="submit" class="btAdd">确认订单</button>
			</view>
	</view>
</template>

<script>
	import store from "@/common/store.js"
	import {postPharOrderAdd} from "@/fetch/api.js"
	export default {
		data() {
			return {
				
				goodslist: [ //下单的商品信息，只用于渲染，不作为订单参数提交，根据自己的商品信息自行渲染
				{
					good:'杯鸭碟头饭',
					num:'数量:1',
					pic:'/static/pharmacy/image/order_details_pic_9.jpg',
					money:'￥2880',
				
				},
				{
					good:'杯鸭碟头饭',
					num:'数量:1',
					pic:'/static/pharmacy/image/order_details_pic_9.jpg',
					money:'￥2880',
				
				},
				{
					good:'杯鸭碟头饭',
					num:'数量:1',
					pic:'/static/pharmacy/image/order_details_pic_9.jpg',
					money:'￥2880',
				
				},
				],
				mediList:[],
				param:{
					money:"0.01",             //商品价格（必填）number类型
					},
			}
			
		},
		onLoad(options) {
			this.initData(options);
		},
		computed: {
			getNum(){
				let result=0;
				this.mediList.forEach((good) => {
						result += good.count;
					});
				
				return result;
			},
			getAllPrice() {
				let result = 0;
				let result1 = 0;
				this.mediList.forEach((good) => {
						result1 += this.accMul(good.count, good.price);
						result = result1.toFixed(2);
					});
				
				return result
			}
		},
		methods: {
			accMul(arg1, arg2) {
				let m = 0,
					s1 = '',
					s2 = '';
				if (arg1 && arg1 != null)
					s1 = arg1.toString();
				if (arg2 && arg2 != null)
					s2 = arg2.toString();
				// console.log('m1',s2.replace('.',''))
				try {
					m += s1.split('.')[1].length
				} catch (e) {}
				try {
					m += s2.split('.')[1].length
				} catch (e) {}
			
				return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
			},
			
			submit(){
				if(store.state.hasLogin != false){
					let list = []
					this.mediList.forEach((item)=>{
						list.push({
							"medicineId": item.id,
							"amount": item.count
						})
					})
					postPharOrderAdd(store.state.uerInfo.userPhone, "配送中", list).then((res)=>{
						console.log(res)
						if(res.st==0){
							uni.showToast({
								title:"订单创建成功",
								icon:"none"
							});
						}
						else{
							uni.showToast({
								title:"订单创建失败",
								icon:"none"
							});
						}
					})
				}
				else{
					uni.showToast({
						title:"请先登录",
						icon:"none"
					});
				}
			},
			async initData(options)
			{
				console.log(options);
				this.mediList = await JSON.parse(options.data);
				console.log(this.mediList);
			}
		}
	}

</script>
<style lang="scss" scoped>
   button::after {border: none;width: auto;}
   input{outline: none;border: none;list-style: none;width: auto;}
   .list_item{float: left;}
   .ym_hide{display: none;}
   .ym_show{display: block;}
   .slide-image {  width: 100%;  height:100%;}
   .list_horizontal {width: auto; display:inline-block; }
    .order_details_1{white-space:normal;width:100%;height:100%;padding:0upx;clear:both;float:left;background-color:#f6f6f6;text-align:left; border-radius:0upx;font-size:8upx;}
    .order_details_1 .order_details_7{white-space:normal;width:100%;height:164upx;padding-left:0upx;padding-right:0upx;padding-top:0upx;padding-bottom:20upx;clear:both;margin-top:0upx;margin-left:0upx;float:left;background-color:rgb(86, 119, 252);text-align:left; border-radius:0upx;font-size:8upx;}
    .order_details_1 .order_details_7 .status{white-space:normal;width:362upx;height:62upx;padding:0upx;clear:both;margin-top:22upx;margin-left:29upx;float:left;text-align:left; border-radius:0upx; color:#ffffff;font-size:49upx; line-height:62upx;}
    .order_details_1 .order_details_7 .smallTitle{white-space:normal;width:452upx;height:38upx;padding:0upx;clear:both;margin-top:6upx;margin-left:29upx;float:left;text-align:left; border-radius:0upx; color:#ffffff;font-size:26upx; line-height:38upx;}
    .order_details_1 .order_details_2{white-space:normal;width:690upx;padding:0upx;clear:both;margin-top:20upx;margin-left:29upx;float:left;background-color:#ffffff;text-align:left; border-color:#e1e1e1; border-width:1upx; border-style:solid; border-radius:15upx;font-size:8upx;}
    .order_details_1 .order_details_2 .goods{white-space:normal;width:690upx;min-height:121upx;padding-left:0upx;padding-right:0upx;padding-top:0upx;padding-bottom:20upx;clear:both;margin-top:0upx;margin-left:0upx;float:left;text-align:left; border-bottom-color:#e1e1e1; border-bottom-width:1upx; border-bottom-style:solid; border-radius:0upx;font-size:8upx;}
    .order_details_1 .order_details_2 .goods .row{white-space:normal;width:643upx;height:113upx;padding:0upx;margin-top:18upx;margin-left:24upx;float:left;text-align:left; border-radius:0upx;font-size:8upx;}
    .order_details_1 .order_details_2 .goods .row .pic{white-space:normal;width:91upx;height:90upx;padding:0upx;margin-top:13upx;margin-left:4upx;float:left;text-align:left; border-radius:0upx;font-size:8upx; line-height:90upx;}
    .order_details_1 .order_details_2 .goods .row .order_details_10{white-space:normal;width:372upx;height:91upx;padding:0upx;margin-top:13upx;margin-left:15upx;float:left;text-align:left; border-radius:0upx;font-size:8upx;}
    .order_details_1 .order_details_2 .goods .row .order_details_10 .good{white-space:normal;width:366upx;height:43upx;padding:0upx;clear:both;margin-top:0upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx; color:#646464;font-size:33upx; line-height:43upx;}
    .order_details_1 .order_details_2 .goods .row .order_details_10 .num{white-space:normal;width:234upx;height:29upx;padding:0upx;clear:both;margin-top:12upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx; color:#646464;font-size:22upx; line-height:29upx;}
    .order_details_1 .order_details_2 .goods .row .money{white-space:normal;width:138upx;height:36upx;padding:0upx;margin-top:13upx;margin-left:19upx;float:left;text-align:right; border-radius:0upx; color:#000000;font-size:24upx; line-height:36upx;}
    .order_details_1 .order_details_2 .order_details_15{white-space:normal;width:416upx;height:79upx;padding:0upx;clear:both;margin-top:33upx;margin-left:265upx;float:left;text-align:left; border-radius:0upx;font-size:8upx;}
    .order_details_1 .order_details_2 .order_details_15 .order_details_16{white-space:normal;width:399upx;height:49upx;padding:0upx;margin-top:0upx;margin-left:4upx;float:left;text-align:right; border-radius:0upx; color:#646464;font-size:34upx; line-height:49upx;}
    .order_details_1 .banner{white-space:normal;width:690upx;height:270upx;padding:0upx;clear:both;margin-top:100upx;margin-left:29upx;float:left;text-align:left; border-radius:0upx;font-size:8upx; line-height:270upx;}
    .order_details_1 .btAdd{white-space:normal;width:690upx;height:87upx;padding:0upx;clear:both;margin-top:64upx;margin-left:29upx;float:left;background-color:rgb(86, 119, 252);text-align:center;justify-content:center; border-radius:40upx; color:#ffffff;font-size:36upx; line-height:87upx;} 
</style>