<template>
	<view class="page">
		<view class="content" style="font-size: smaller;">
			<center>核酸检测注意事项：</center>
			1. 检测前2小时内采集请勿进食，以免呕吐；釆样前半小时请不要吸烟、喝酒等。
			<br/>
			2. 采样前后请戴好口罩。可准备好一个备用口罩。
			<br/>
			3. 等待采样时请保持人际1米以上距离，不攀谈。
			<br/>
			4. 采集后立即离开采集地点，避免在采集地点周围吐痰，呕吐。
			<br/>
			5. 采样、取报告时需携带身份证及收据，人证合一。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice:""
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.page {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-image: url(../../../static/exam/bkg_cov.png);
			background-size: cover;
			height: max-content;
		}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 70%;
		height: fit-content;
		margin-top: 100px;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow:1px 1px 2px #7d7d7d;
	}
</style>
