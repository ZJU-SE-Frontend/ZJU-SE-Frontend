<template>
<view>
	<image :src="usercode"></image>
</view>
</template>
<script>
	import {getPcase} from "../../fetch/api.js";
	export default {
		data() {
			return {
				usercode: "",
			}
		},
		onLoad:function(option) {
			this.usercode="../../static/center/"+option.code+".png"
			
		},
		methods: {
	
		}
	}
</script>
<style>
image {        display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
               height: 300rpx;
               width: 300rpx;
               margin-top: 200rpx;
               margin-left: auto;
               margin-right: auto;
               margin-bottom: 50rpx;
               
            } 
</style>
