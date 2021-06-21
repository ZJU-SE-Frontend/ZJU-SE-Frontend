<template>
	<view class="content">
		<image class="logo" src="../../static/center/logo.png"></image>
 		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> 
		<view class="text-area">
			<text class="title">{{phone}}</text>
		</view> 
		<section>
			<input class="uni-input" type="password" placeholder="请输入密码" v-model="password"></input>
		</section>
		<section>
			<input class="uni-input" type="password" placeholder="再次输入密码" v-model="password2"></input>
		</section>
		<section>
			<button type="button" @click="onchpwd">修改</button>
		</section>
	</view>
</template>

<script>
	import {putchpwd} from "../../fetch/api.js";
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				title:'hello',
				phone: '',
				password:'',
				password2:''
			}
		},
		onLoad:function(option) {
			this.phone=option.phone
		},
		methods: {
			onchpwd(){
				if(this.password!=this.password2){
					this.title='两次密码不一致'
				}
				else if(this.password==''){
					this.title='密码不能为空'
				}
				else{
					putchpwd(this.phone,this.password).then((res)=>{
							if(res.st==0){
								this.title='修改成功,请重新登录'
								this.logout()
								uni.navigateBack();
							}
							else{
								this.title='修改失败'
							}
						})
				}
				
			},
			...mapMutations(['logout'])
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
