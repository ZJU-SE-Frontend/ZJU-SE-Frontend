<template>
	<view class="patient">
	    <view class="patient-list" v-for="(item,i) in data">
	          <view class="list-title">
	 
	           <view class="list-text" >
	                 <text class="title">病案号：{{item.caseId}}\n描述：{{item.caseResult}}</text>
	               <text class="content">病人姓名：{{item.patientName}}</text>
	           </view>
	          </view>
	       
	       <view  class="btn" @click="detail(item.caseId)">详情</view>
	    </view>
	</view>
</template>
<script>
	import {getPcase} from "../../fetch/api.js";
	export default {
		data() {
			return {
				phone:"",
				data:[],
			}
		},
		onLoad:function(option) {
			this.phone=option.phone
			console.log(this.phone)
			getPcase(this.phone).then((res)=>{
				console.log(res.data.caseList)
				this.data=res.data.caseList
				console.log(this.data)
			})
			
		},
		methods: {
		  detail(i){
			  uni.navigateTo(
			  	{
			  		url:"./detail?phone="+this.phone+"&&caseid="+i
			  	}
			  )
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