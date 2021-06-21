<template>
	<view style = "height:100%;width:100%;">
		挂号须知
		使用条款：登录您的账户，完善您的身份信息之后可以开始预约
		祝您使用愉快
		挂号操作：
		选择医院，选择科室和子科室之后，可以选择普通号和专家号，普通号为叫号进入随机诊室诊疗，专家号为选择特定的专家的特定时段
		选择需要预约的时段后，点击确定即可完成挂号操作，可以通过详情查看预约记录
		<view>
			<button @click = "jump_choo">我已明确</button>
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
			jump_choo:function(){
				uni.navigateTo({//跳转页面
					url:"/pages/registration/choose"
				});
			}
		}
	}
</script>

<style>

</style>
