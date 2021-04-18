<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="text">{{text}}</text>
		</view>
		<section>
			<button type="button" @click="onButtonClicked">点击</button>
		</section>
	</view>
</template>

<script>
	import {ping} from "../../fetch/api.js"
	export default {
		data() {
			return {
				text: 'Hello'
			}
		},
		onLoad() {
		},
		methods: {
			onButtonClicked(){
				ping().then((res)=>{
					this.text=res.data.message
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
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
