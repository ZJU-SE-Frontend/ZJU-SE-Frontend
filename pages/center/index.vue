<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="text" style="text-align:center">{{text}}</text>
		</view>
		<section>
			<button type="button" @click="onButtonClicked">登陆测试用户</button>
		</section>
	</view>
</template>

<script>
	import {loginIn, joinIn} from "../../fetch/api.js"
	import {getEncryptedPassword} from "../../common/encrypt.js"
	export default {
		data() {
			return {
				text: '未登录'
			}
		},
		onLoad() {
		},
		methods: {
			onButtonClicked(){
				loginIn("13733333333", "123456").then((res)=>{
					if(res.st==0)
						this.text="登陆成功\n"+res.data.jwt
					else if(res.st==1)
						this.text="登陆失败"
				});
			}
			/*onButtonClicked(){
				joinIn("13744444444","hahh", "123456", 1, "test1@zju.edu.cn").then((res)=>{
					if(res.st==0)
						this.text="注册成功\n"+res.data.jwt
					else if(res.st==1)
						this.text="注册失败"
				});
			}*/
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
