<template>
    <view class="patient">
       <view class="patient-list">
             <view class="list-title">
 
              <view class="list-text">
                    <text class="title">病案号：9527618975\n时间：2018-9-15-10:32</text>
                  <text class="content">主治医师：张任谦</text>
				  <text class="content">症状：心律失常，发热，乏力，有盗汗</text>
				  <text class="content">诊断结果：干燥综合征</text>
				  <text class="content">诊断建议：建议服用盐酸胺碘酮片</text>
              </view>
             </view>
          
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