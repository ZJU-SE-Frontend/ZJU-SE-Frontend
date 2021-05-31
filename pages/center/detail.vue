<template>
    <view class="patient">
       <view class="patient-list">
             <view class="list-title">
 
              <view class="list-text">
                    <text class="title">病案号：{{id}}\n时间：{{createTime}}</text>
                  <text class="content">主治医师：{{doctorName}}\n联系方式：{{doctorPhone}}</text>
				  <text class="content">就诊医院：{{hospital}}</text>
				  <text class="content">诊断结果：{{caseResult}}</text>
				  <text class="content">诊断费用：{{cost}}</text>
				  <text class="content">诊断药物：{{medicine}}</text>
              </view>
             </view>
          
       </view>
    </view>
	
</template>
<script>
	import {getPdetail} from "../../fetch/api.js";
	export default {
		data() {
			return {
				phone:"",
				id:"",
				hospital: "",
				doctorName: "",
				doctorPhone: "",
				caseResult: "",
				cost: 0,
				medicine: "",
				createTime: 0,
			}
		},
		onLoad:function(option) {
			
			this.phone=option.phone;
			this.id=option.caseid;
			getPdetail(this.phone,this.id).then((res)=>{
				this.hospital=res.data.hospital
				this.doctorName=res.data.doctorName
				this.doctorPhone=res.data.doctorPhone
				this.caseResult=res.data.caseResult
				this.cost=res.data.cost
				this.medicine=res.data.medicine
				this.createTime=res.data.createTime
			})
			
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