<template>
	<view class="content">

		<scroll-view class="menu-wrapper" scroll-y :style="'height:'+height+'px'">
			<view ref="menuWrapper">
				<!--  :class="{'current': currentIndex == index}" @click="selectMenu(index,$event)" -->
				<view style="position: relative;" v-for="(item,index) in goods" :key="index" ref="menuList" @click="select(index)"
				 :class="{'current': currentIndex == index}">

					<view class="menu-item">{{item.name}}</view>
					<text class="allcount" v-if="getAllCount>=item.count&&item.count>0">{{item.count}}</text>
					<!-- <text class="allcount">1</text> -->
				</view>
			</view>
		</scroll-view>
		<!--  @scroll="scroll" -->
		<scroll-view class="items-wrapper" scroll-y :style="'height:'+height+'px'" :scroll-top="itemsTop">
			<view ref="itemsWrapper">
				<view ref="foodList" class="items" v-for="(item, i) in goods" :key="i">

					<view class="food-title" style="background: #f3f5f7">
						{{item.name}}
					</view>
					<view class="food" v-for="(food, index) in item.items" :key="index" >
						<image :src="food.img" mode="" style="width: 75px;height: 75px;margin-top: 6px;"@tap="onItemClicked(index, index)"></image>
						<view class="food-info" >
							<text style="font-size: 15px;margin-top: 2px;" @tap="onItemClicked(index, index)">{{food.name}}</text>
							<text style="font-size: 13px;margin: 2px 0;" @tap="onItemClicked(index, index)">{{food.description}}</text>
							<text style="font-size: 13px;margin: 2px 0 4px;" @tap="onItemClicked(index, index)">月售{{food.sellCount}}</text>

							<!-- 加减 -->
							<view class="food-btm">
								<text class="food-price" @tap="onItemClicked(index, index)">￥{{food.price}}</text>
								<cartcontrol :food="food" @add="addCart" @dec="decreaseCart" ></cartcontrol>
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<shopcart :goods="goods" @add="addCart" @dec="decreaseCart" @delAll="delAll"></shopcart>
	</view>
</template>

<script>
	import shopcart from './components/shopcart.vue';
	import cartcontrol from './components/cartcontrol.vue'
	import {getStatic} from '../../fetch/api.js'
	import Vue from 'vue'
	// import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				title: 'Hello',
				goods: [],
				
				height: 0,
				itemsTop: 0,
				currentIndex: 0
			}

		},
		components: {
			shopcart,
			cartcontrol
		},
		onLoad() {
			this.height = Number(uni.getSystemInfoSync().windowHeight) - 55;
			getStatic("/pharmacy/data.json").then((res)=>{
				res.data.list.forEach((ele)=>{
					var found = false
					for(var i = 0; i < this.goods.length; i++) {
						if(this.goods[i].name == ele.type){
							this.goods[i].items.push({
								"id": ele.id,
								"name": ele.name,
								"price": ele.price,
								"oldPrice": "",
								"description": ele.description,
								"sellCount": Math.floor((Math.random()*100)),
								"img": ele.picPath
							})
							found = true
						}
					}
					if(!found){
						this.goods.push({
							"name": ele.type,
							"items": [{
								"id": ele.id,
								"name": ele.name,
								"price": ele.price,
								"oldPrice": "",
								"description": ele.description,
								"sellCount": Math.floor((Math.random()*100)),
								"img": ele.picPath
							}]
						})
					}
				})
			})
		},
	
		computed: {
			getList() {
				let result = [];
				this.goods.forEach((good) => {

					good.items.forEach((food) => {

						if (food.count) {
							result.push(food)
						}
					})
				})
				console.log('result', result);
				return result
			},
			// 获得购物车所有商品数量
			getAllCount: function(item) {
				let result = [];
				let count = 0;

				for (let i = 0; i < this.goods.length; i++) {
					count = 0;
					this.goods[i].items.forEach((food) => {

						if (food.count >= 0) {
							count += food.count
							Vue.set(this.goods[i], 'count', count)
						}
					})
					// console.log('result', count);
					result.push(count)
				}

				result.sort(function(a, b) {
					return a - b;
				})
				count = result[result.length - 1]
				// console.log('result', count);
				return count;
			},

		},
		methods: {

			// 点击侧边栏
			select(index) {
				this.currentIndex = index;
				this.setScrollH(index);

			},

			// 设置点击侧边栏右边滚动的高度
			setScrollH: function(index) {
				var that = this;
				let height = 0;
				var query = uni.createSelectorQuery();
				// console.log('query',query);
				let items = query.selectAll('.items');
				// console.log('items', items);

				this.$nextTick(function() {
					items.fields({
						size: true
					}, data => {
						if (index == 0) {
							that.itemsTop = 0;
						}
						for (let i = 0; i < index; i++) {

							height += parseInt(data[i].height);
							that.itemsTop = height;
						}

					}).exec();
				})

			},
			
			addCart: function(item) {
				if (item.count >= 0) {
					item.count++
					this.goods.forEach((good) => {
						good.items.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
						})
					})
					// console.log('c++', JSON.stringify(item))

				} else {
					console.log('add')
					this.goods.forEach((good) => {
						good.items.forEach((food) => {
							if (item.name == food.name)
								Vue.set(food, 'count', 1)
							// food.count = 1
							// console.log('add-shop', JSON.stringify(food))
						})
					})
				}

			},
			decreaseCart(item) {
				if (item.count) {
					item.count--
					this.goods.forEach((good) => {
						good.items.forEach((food) => {
							if (item.name == food.name)
								food.count = item.count
							// console.log('dec-shop', JSON.stringify(this.items))
						})
					})
				}
			},
			// 清空购物车
			delAll() {
				this.goods.forEach((good) => {
					good.items.forEach((food) => {
						if (food.count) {
							food.count = 0
							// console.log(JSON.stringify(food));
						}
					})
				})
			},
			onItemClicked(index, index2) {
				uni.navigateTo({
					url: 'details?id='+index2
				})
			}
		}
	}
</script>

<style>
	.content {
		/* text-align: center; */
		/* height: 400upx; */
		display: flex;
		position: absolute;
		top: 0;
		bottom: 55px;
		width: 100%;
		overflow: hidden;
	}

	.current {
		position: relative;
		z-index: 0;
		background-color: #fff;
		color: #00A0DC;
	}

	.menu-wrapper {
		text-align: center;
		width: 22%;
		display: flex;
		flex-direction: column;
		background: #f3f5f7;

	}

	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
	}

	.allcount {
		position: absolute;
		right: 6px;
		top: 8px;
		display: inline-block;
		padding: 0 4px;
		font-size: 9px;
		line-height: 16px;
		font-weight: 400;
		border-radius: 50%;
		background-color: #f01414;
		color: #ffffff;
	}

	.items-wrapper {
		margin-left: 4px;
		width: 78%;
	}

	.food,
	.food-btm,
	.content {
		display: flex;
		flex-direction: row;
	}

	.food-title {
		padding: 2px 0;
	}

	.food-info {
		margin-left: 10px;
		margin-right: 16px;
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.food-btm {
		justify-content: space-between;

	}

	.food-price {
		color: #f01414;
		font-size: 16px;
	}
</style>
