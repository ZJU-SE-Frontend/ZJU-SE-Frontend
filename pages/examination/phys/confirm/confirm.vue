<template>
	<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 10%;">
		<view class="content">
			<view class="texts" style="margin-top: 30px;">姓名：Username</view>
			<view class="texts">预留手机号：Phonenumber</view>
			<view class="texts">预约日期：Date</view>
			<view class="texts">体检医院：xxxx</view>
			<button size="mini" style="align-self: center; border-radius: 1rpx; border-color: #ffffff; margin-bottom: 20px;" type="primary">确认预约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 80%;
		height: fit-content;
		margin-top: 0;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
	
	.texts {
		margin-left: 30px;
	}

</style>
