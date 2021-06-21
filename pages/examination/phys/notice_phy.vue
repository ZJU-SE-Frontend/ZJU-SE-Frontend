<template>
	<view class="page">
		<view class="content" style="font-size: smaller;">
			<center>体检注意事项：</center>
			1. 受检时请带好身份证，请勿携带贵重物品及饰品。一般物品可在前台存包。 
			<br/>2. 请在体检前一天晚八时后不要再吃任何食物（按时服用的药物在24：00前仍可服用），可以饮少量白水。 
			<br/>3. 体检当日应空腹（不进食）进行抽血化验、腹部超声检查。 
			<br/>4. 为了保证检查质量，需空腹检查的两个项目有一定等候时间。 
			<br/>5. 增做子宫、附件及前列腺B超项目者，需检前憋足尿。 
			<br/>6. 糖尿病、高血压、心脏病等慢性病患者，请将平时服用的药物随身携带备用。
			<br/>7. 进行各科检查时，请务必按体检表内容进行逐项检查，若自动放弃检查某一项目造成漏诊，会影响健康状况的评估。
			<br/>8. 依据体检表内项目，在导检护士引导下，可以根据各科等候时间长短、人员多少，作出灵活安排，以缩短体检全程时间。
			<br/>9. 检查完毕后，请仔细核对体检表项目，确认无漏项后，请将体检表交到前台。
			<br/>10. 体检结果将于3-5个工作日内生成，具体发放方式请咨询医院前台。
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
			background-image: url(../../../static/exam/bkg_info.png);
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
