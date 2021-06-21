<template>
    <view class="uni-list">
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">
				当前选择
			</view>
			<view class="uni-list-cell-db">
				<picker mode="multiSelector" @change="cha" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
					<view class="uni-input">{{multiArray[0][multiIndex]}}</view>
				</picker>
			</view>
		</view>
    
    </view>
</template>
<script>
    export default {
        data() {
            return {
				multiArray: [
					['亚洲', '欧洲']
				],
				num:0,
				multiIndex: 0
            }
        },
		created:function(){
			var arr = [];
			var dats = [];
			var dates = new Date;
			var year = dates.getFullYear();
			var mouth = dates.getMonth()+1;
			var day = dates.getDate();
			var strds = "周" + "日一二三四五六".charAt(new Date().getDay());
			console.log(strds);
			if(mouth<10){
				mouth = '0'+mouth
			}
			if(day<10){
				day = '0'+day
			}
			var str = strds+":"+year+'-'+mouth+'-'+day;
			var index = 0;
			var strm;
			var strd;
			var d = this.mGetDate(year,mouth);
			arr.push(d-day);
			if (d - day<6){//此时这一个月内不足7天
				arr.push(6-(d-day));
			}
			for(var j =0; j<arr.length;j++){
				for(var x = 0;x<arr[j];x++){
					if(j==0){//此时，日期需要加上当前日期
						strm = parseInt(j+mouth)
						if(parseInt(j+mouth)<=9){
							strm = '0'+parseInt(j+mouth)
						}
						strd = parseInt(x+day)
						if(parseInt(x+day)<9){
							strd = '0'+parseInt(x+1)
						}
						dats.push(year+'-'+strm+'-'+strd)
					}
					else if(j==1){
						strm = parseInt(j+mouth)
						if(parseInt(j+mouth)<=9){
							strm = '0'+parseInt(j+mouth)
						}
						strd = parseInt(x+1)
						if(parseInt(x+1)<9){
							strd = '0'+parseInt(x+1)
						}
						dats.push(year+'-'+strm+'-'+strd)
					}
					
				}
			}
		            
			// index 为当前日期所对应的下标。
			var zm = [];
			for(var z = 0;z<dats.length;z++){
				var strdz = "周" + "日一二三四五六".charAt(new Date(dats[z]).getDay());
				zm.push(strdz+":"+dats[z])
			}
			// this.multiArray[0] = dats // dats 为没有星期几的日期
			this.multiArray[0] = zm // dats 为没有星期几的日期
			console.log(zm)
			var flag = 0;
			for(var i=0;i<zm.length;i++){
				if(str == zm[i] ){
					index = i;
					console.log("位置",i);
					flag = 1;
				}
			}
			if(flag == 0) console.log('没有');
			this.multiIndex = index
		},
        methods: {
            mGetDate:function(year,month){
				var d = new Date(year, month, 0);
				return d.getDate();
            },
			cha:function(e){
				this.multiIndex = this.num;
			},
			bindMultiPickerColumnChange: function(e) {
				this.num = e.detail.value;
				//this.multiIndex = e.detail.value;
			}
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS */
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750rpx;
		/* #ifdef H5 */
		width:100%;
		/* #endif */
		height: 80rpx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1rpx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 34rpx;
        padding-right: 34rpx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750rpx;
		width:100%;
    }

    .update-tips {
        position: absolute;
        left: 0;
        top: 41px;
        right: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #FDDD9B;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .update-tips-text {
        font-size: 14px;
        color: #ffffff;
    }

    .refresh {
        width: 750rpx;
		width:100%;
        height: 64px;
        justify-content: center;
    }

    .refresh-view {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

    .loading-text {
        margin-left: 2px;
        font-size: 16px;
        color: #999999;
    }

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28rpx;
        color: #999;
    }
</style>
