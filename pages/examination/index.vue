<template>
	<view class="content">
		
		<view class="grid-content">
			<uni-grid :column="4" :showBorder="false"  :square="false">
			    <uni-grid-item>
			        <view class="switch-item">
			        	<image src="/static/exam/exam_covid.png" class="image" mode="aspectFit" @click="gotoCov()"/>
			        	<text class="title" @click="gotoCov()"> 核酸检测 </text>
			        </view>
			    </uni-grid-item>
			    <uni-grid-item>
			        <view class="switch-item">
			        	<image src="/static/exam/exam_phy.png" class="image" mode="aspectFit" @click="gotoPhy()"/>
			        	<text class="title" @click="gotoPhy()"> 健康体检 </text>
			        </view>
			    </uni-grid-item>
			    <uni-grid-item>
					<view class="switch-item">
						<text class="title">   </text>
					</view>
			    </uni-grid-item>
				<uni-grid-item>
				    <view class="switch-item">
				    	<image src="/static/exam/dummy" class="image" mode="aspectFit" @click="gotoSer()"/>
				    	<text class="title" @click="gotoSer()"> [医院管理员入口] </text>
				    </view>
				</uni-grid-item>
			</uni-grid>

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
			},
			
			gotoSer(){
				uni.navigateTo({
					url:"exam_server"
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0;
		background-image: url(../../static/exam/bkg_index.png);
		background-size: cover;
	}
	
	.grid-content {
		width: 85%;
		display: flex;
		height: fit-content;
		margin-top: 100px;
		background-color: #FFFFFF;
		border-radius: 5px;
		padding: 10px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
	
	.switch-item {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5px 0;
	}
	
	.image {
		width: 60rpx;
		height: 60rpx;
	}


	.title {
		font-size: 20rpx;
		margin-top: 10rpx;
		font-weight: 500;
		color: #000000;
	}
</style>
