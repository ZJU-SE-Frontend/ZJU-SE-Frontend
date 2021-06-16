<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<image class="logo" src="/static/icon.png"></image>
		<text class = "title">选择医院</text>
		<select v-model = "hospitals">
			<option v-for = "item in array" >{{item.name}}</option>
		</select>
		<text class = "title">选择科室</text>
		<select  v-model = "rooms">
			<option v-for = "items in room_array">{{items.name}}</option>
		</select>
		<button @click = "jump_doctor">确认选择</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hospitals :'',
				rooms:'',
				title: '具体预约选项',
				isShow:false,
				room_array:[
					{
						name : '儿科'
					},
					{
						name : '妇科'
					},
					{
						name : '外科'
					},
					{
						name : '精神科'
					}
				],
				array:[
					{
						name : '浙江大学医学院附属第一医院'
					},
					{
						name : '浙江大学医学院附属第二医院'
					},
					{
						name : '浙江大学医学院附属邵逸夫医院'
					},
					{
						name : '杭州市第一人民医院'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			jump_doctor:function()
			{
				uni.navigateTo({//跳转页面
					url:"/pages/registration/doctor_ver2"
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
