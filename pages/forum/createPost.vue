<template>
	<view class="content">
		<view class="input">
			<textarea class="title-text" placeholder="请输入主题贴标题" auto-height="true" v-model="title"/>
		</view>
		<view class="input">
			<textarea class="content-text" placeholder="请输入主题贴内容"maxlength="-1" v-model="content"/>
		</view>
		<button class="load-button" @tap="submitPost()">提交</button>
	</view>
</template>

<script>
	import {publicPost} from '../../fetch/api.js'
	export default {
		data() {
			return {
				title : '',
				content : ''
			}
		},
		methods: {
			submitPost() {
				if (this.title.length > 0 && this.content.length > 0) {
					const params = {
						"session" : "交流空间",
						"title" : this.title,
						"authorName" : "卢本伟",
						"authorPhone" : "18888888888",
						"content" : this.content
					};
					publicPost(params);
					var pages = getCurrentPages();
					var beforePage = pages[pages.length - 2];
					beforePage.refresh();
					uni.navigateBack({
						animationDuration: 500,
						animationType: 'pop-out'
					})
				}
			},
			onLoad() {
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
