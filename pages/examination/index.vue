<template>
	<view class="content">
		<view class="switch-item">
			<image class="logo" src="/static/exam_phy.png" @click="gotoPhy"></image>
			<text class="title" @click="gotoPhy"> 体检服务 </text>
		</view>
		<view class="switch-item">
			<image class="logo" src="/static/exam_covid.png" @click="gotoCov"></image>
			<text class="title" @click="gotoCov"> 核酸检测 </text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			gotoPhy() {
				uni.navigateTo({
					url:"phys/phys"
				})
			},
			
			gotoCov() {
				uni.navigateTo({
					url:"covid/covid"
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 20%;
	}
	
	.switch-item {
		width: 240rpx;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 2.5%;
	}

	.logo {
		height: 60%;
		width: 60%;
	}

	.title {
		font-size: 30rpx;
		margin-top: 15rpx;
		font-weight: 500;
		color: #000000;
	}
</style>
