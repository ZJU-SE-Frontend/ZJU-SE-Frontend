<template>
    <view class="patient">
       <view class="patient-list">
             <view class="list-title">
 
              <view class="list-text">
                    <text class="title">病案号：9527618975\n时间：2018-9-15-10:32</text>
                  <text class="content">主治医师：张任谦</text>
              </view>
             </view>
          <!-- 按钮 -->
          <view class="btn" @click="viewDetail">进入</view>
       </view>
	   <view class="patient-list">
	         <view class="list-title">
	    
	          <view class="list-text">
	                <text class="title">病案号：6165981657\n时间：2020-5-27-14:11</text>
	              <text class="content">主治医师：朱凯彰</text>
	          </view>
	         </view>
	      <!-- 按钮 -->
	      <view class="btn" @click="viewDetail">进入</view>
	   </view>
	   <view class="patient-list">
	         <view class="list-title">
	    
	          <view class="list-text">
	                <text class="title">病案号：9548752656\n时间：2020-7-2-17:01</text>
	              <text class="content">主治医师：孟宇瀚</text>
	          </view>
	         </view>
	      <!-- 按钮 -->
	      <view class="btn" @click="viewDetail">进入</view>
	   </view>
	   <view class="patient-list">
	         <view class="list-title">
	    
	          <view class="list-text">
	                <text class="title">病案号：9527618975\n时间：2018-9-15-10:32</text>
	              <text class="content">主治医师：孟宇瀚</text>
	          </view>
	         </view>
	      <!-- 按钮 -->
	      <view class="btn" @click="viewDetail">进入</view>
	   </view>
	   <view class="patient-list">
	         <view class="list-title">
	    
	          <view class="list-text">
	                <text class="title">病案号：9527618975\n时间：2018-9-19-10:12</text>
	              <text class="content">主治医师：孟宇瀚</text>
	          </view>
	         </view>
	      <!-- 按钮 -->
	      <view class="btn" @click="viewDetail">进入</view>
	   </view>
    </view>
	
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			// if(this.hasLogin){
			// 	console.log("hahaha")
			// }
		},
		methods: {
			 viewDetail(){
				 uni.navigateTo({
				 	url:"./detail"
				 })
			 }
			
		}
	}
</script>
<style lang="scss" scoped>
.patient{
     display: flex;
     flex-direction: column;
     align-items: center;
    .patient-list{
        width: 650rpx;
        box-shadow: 0px 4px 14px 1px rgba(85, 85, 85, 0.08);
        background-color: #FFFFFF;
        border-radius: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:30rpx;
        margin-top: 30rpx;
        .btn{
            background-color: #478FD9;
            width: 100rpx;height: 42rpx;
            border-radius: 20rpx;
            color: #FFFFFF;
            font-size: 20rpx;
            text-align: center;
            line-height: 42rpx;
        }
        .list-title{
            display: flex;
            align-items: center;
            .list-text{
                display: flex;
                flex-direction: column;
                margin-left: 23rpx;
                .title{
                    color: #333333;
                    font-size: 26rpx;
                    font-weight: 500;
                }
                .content{
                    color: #999999;
                    font-size: 20rpx;
                    margin-top: 28rpx;
                    font-weight: 400;
                }
            }
            .image{
                width: 154rpx;
                height: 104rpx;
            }
        }
    }
 
}    
</style>