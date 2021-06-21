<template>
	<view class="content">
		<image class="logo" src="/static/doctor.png"></image>
		<view class="text-area">
			<text class="status">您选择的是{{JSON.parse(decodeURIComponent(this.$route.query.hospital))}}医院的{{JSON.parse(decodeURIComponent(this.$route.query.room))}}科室</text>
		</view>
		
		<view class="pop" v-if="showModal">
			<view class = "inner" >
				<scroll-view scroll-y style="border-radius:10px;"  show-scrollbar="false" enable-flex = "true" enhanced ="true" class = "pp">
					<!--  style="width: 60%; height: 70%; position: absolute;left:30%;"  -->
					<view class="vui">
						<radio-group @change="radioChange" class = "ra">
							<label class="mdd" v-for="(item, index) in array_time" >
								<view @click = "time_id = item.times;">
									<radio :value="item.times" :checked="index === current" />
								</view>
								<view>时段：{{item.times}}余量：{{item.num}}</view>
							</label>
						</radio-group>
					</view>
				</scroll-view>
			</view>
			<button class = "bt" @click="ajp">预约</button>
		</view>
		<scroll-view scroll-y style="height: 500px;border-radius:10px;"  show-scrollbar="false" enable-flex = "true" enhanced ="true">
			<view class = "vui">
				<ul>
					<li class = "tex">选择医生</li>
					<li v-for = "item in array" class = "ahref" @click="showModal=true;iinfo = item.name;">
						<a  >{{item.name}}{{item.reputation}}<span> > </span></a>
					</li>
				</ul>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import {getStatic, getPharBoothList, getPharBoothDetail, postLoginIn, postJoinIn, getUserInfo} from "../../fetch/api.js"
	import {getEncryptedPassword} from "../../common/encrypt.js"
	
	export default {
		data() {
			return {
				showModal: false,
				iinfo:'',
				current: 0,
				time_id:'8:00 - 9:00',
				array:[
					{
						name : '符严街',
						reputation :'主任医师'
					},
					{
						name : '庄炳东',
						reputation :'副主任医师'
					},
					{
						name : '测试者',
						reputation:'医生'
					},
					{
						name : 'kirito',
						reputation:'护士'
					},
					{
						name :'我看行',
						reputation:'医生'
					},
					{
						name:'选我吧',
						reputation:'医生'
					}
				],
				array_time:[
					{
						times : '8:00 - 9:00',
						num :'5'
					},
					{
						times : '9:00 - 10:00',
						num:'6'
					},
					{
						times : '10:00 - 11:00',
						num :'7'
					},
					{
						times : '11:00 - 12:00',
						num:'8'
					},
					{
						times :'12:00 - 13:00',
						num:'4'
					},
					{
						times:'13:00 - 14:00',
						num:'4'
					},
					{
						times:'14:00 - 15:00',
						num:'4'
					},
					{
						times:'15:00 - 16:00',
						num:'4'
					},
					{
						times:'16:00 - 17:00',
						num:'4'
					},
					{
						times:'17:00 - 18:00',
						num:'4'
					}
				]
			}
		},
		created :{
		},
		methods :{
			ajp:function(){
				uni.showModal({
				    title: '预约成功',
				    content: '恭喜你成功预约'+this.iinfo+'医生的'+this.time_id+'时间段~',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击i确定');
							/*
							uni.navigateTo({//跳转页面
								url:"/pages/registration/index"
							});*/
							
							uni.switchTab({
							       url: '/pages/registration/index'
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		},
		onLoad() {
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position:relative;
		z-index: 1;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.pop {
	  position: fixed;
	  top: 20%;
	  left: 26.5%;
	  width: 49.5%;
	  height:70%;
	  z-index: 3;
	  border-radius:10px;
	  background-color:rgba(255,255,255,0.96);
	  display:flex;
	  flex-direction: column;
	  justify-content:space-evenly;
	  align-items: center;
	}
	.pop .inner{
		position:relative;
		z-index:2;
		display:flex;
		justify-content:space-evenly;
		flex-direction: row;
		height:90%;
		width:100%;
	}
	.pop .bt{
		width:40%;
	}
	.pop .inner .pp{
		height:100%;
	}
	.pop .inner .pp .vui{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height:100%;
	} 
	.pop .inner .pp .ra{
		height:100%;
		width:100%;
	}
	.pop .inner .pp .vui .ra .mdd{
		height:10%;
		width:90%;
		text-align:center;
		list-style-type:none;
		background-color:rgba(0,0,0,0.3);
		padding:2% 5% 0% 5%;
		border-radius:10px;
	}

	.btn {
	  background-color: #fff;
	  border-radius: 4px;
	  padding:10px 20px;
	}
	.vui{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height:100%;
		}
		.vui ul .tex{
			height:10%;
			width:90%;
			font-size:20px;
			background-color:#3F536E;
			border-radius:10px;
			text-align:center;
			padding:0% 5% 0% 5%;
		}
		.vui ul{
			height:90%;
			width:70%;
			list-style-type:none;
			text-align:center;
		}
		.vui ul .ahref{
			height:10%;
			width:90%;
			text-align:center;
			list-style-type:none;
			background-color:rgba(0,0,0,0.3);
			padding:2% 5% 0% 5%;
			border-radius:10px;
		}
		.vui ul li a{
			display:flex;
			justify-content:space-between;
			font-size:20px;
			color:#fff;
		}
</style>
