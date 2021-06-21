<template>
	<view class="content">
		<sl-filter :independence="true" :color="'#666666'" :themeColor="'#000000'" :menuList.sync="menuList" @result="sortResult"></sl-filter>
		<view class="input">
			<textarea class="title-text" placeholder="请输入你想提的问题" auto-height="true" v-model="title"/>
		</view>
		<view class="input">
			<textarea class="content-text" placeholder="请输入问题的具体描述"maxlength="-1" v-model="content"/>
		</view>
		<button class="load-button" @tap="submitQuestion()">提交</button>
	</view>
</template>

<script>
	import {publicQuestion,getCurrentUserPhone} from '../../fetch/api.js'
	import slFilter from './sl-filter.vue'
	export default {
		components: {
			slFilter
		},
		data() {
			return {
				title : '',
				userPhone : null,
				content : '',
				menuList: [
					{
						'title': '外科',
						'key': 'sort',
						'isSort': true,
						'reflexTitle': true,
						'detailList': [{
								'title': '外科',
								'value': 0
							},
							{
								'title': '内科',
								'value': 1
							},
							{
								'title': '牙科',
								'value': 2
							},
							{
								'title': '科普',
								'value': 3
							}
						]
					}
				],
				session : 0
			}
		},
		methods: {
			submitQuestion() {
				if (this.title.length > 0 && this.content.length > 0) {
					const params = {
						"title" : this.title,
						"userPhone" : this.userPhone,
						"content" : this.content,
						"session" : this.session
					};
					// console.log(params)
					publicQuestion(params);
					var pages = getCurrentPages();
					var beforePage = pages[pages.length - 2];
					beforePage.refresh();
					uni.navigateBack({
						animationDuration: 500,
						animationType: 'pop-out'
					})
				}
			},
			sortResult(value) {
				this.session = value.sort
				console.log(this.session)
			},
			async getCurrentUser() {
				this.userPhone = await getCurrentUserPhone()
				console.log(this.userPhone)
			},
			onLoad() {
				this.getCurrentUser()
			}
		}
	}
</script>

<style>
	.input {
		width: 730rpx;
		margin: 0 10rpx 0 10rpx;
		border-width: 0rpx 0rpx 2rpx 0rpx;
		background-color: #ffffff;
		border-color: #9a9a9a;
		border-style: solid;
	}
	
	.title-text {
		width: 700rpx;
		padding: 15rpx;
		margin: 0rpx 0rpx 0rpx 0rpx;
		border-width: 0rpx 0rpx 0rpx 0rpx;
	}
	
	.content-text {
		width: 700rpx;
		padding: 15rpx;
		margin: 0rpx 0rpx 0rpx 0rpx;
		border-width: 0rpx 0rpx 0rpx 0rpx;
	}
	
	.load-button {
		text-align: center;
		display: flex;
		justify-content: center;
		width: 730rpx;
		margin: 10rpx 10rpx 0 10rpx;
		border: 0;
		align-items: center;
		color: #007AFF;
		background-color: #F6F6F6;
		font-size: 30rpx;
		border-radius: 12rpx;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
	}
</style>
