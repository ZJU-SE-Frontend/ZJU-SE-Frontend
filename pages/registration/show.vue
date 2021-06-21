<template>
	<view class="Main">
		
		<!-- <view>
			<uni-search-bar placeholder="请输入患者电话" @confirm="search" :focus="true" @blur="blur" @input="input" @cancel="cancel" @change="change" @clear="clear" cancelButton="always" cancel-text="取消">
				
			</uni-search-bar>
			
		</view> -->
		
		
		<!-- <view>
			<picker mode="multiSelector" @columnchange="bindPickerChange" :range="multiArray" cancel="false">
				<view class="uni-input">{{multiArray[0][Index[0]]}}, {{multiArray[1][Index[1]]}}, {{multiArray[2][Index[2]]}}</view>
			</picker>
		</view> -->
		
		<scroll-view>
			<uni-table border :loading="loading" stripe :emptyText="loading?'加载中...':'暂无更多数据'">
				
				<uni-tr v-for="(it, i) in past">
					<uni-td align="center">{{it.hospital}}</uni-td>
					<uni-td align="center">{{it.department}}</uni-td>
					<uni-td align="center">{{it.doctorName}}</uni-td>
					<uni-td align="center">{{getLocalTime(it.appointDate, it.section)}}</uni-td>
					<uni-td height="50">
						<button class="btn1" type="default" size="mini" @click="popout(i, 1)" plain="true">详情</button>
						<button class="btn1" type="default" size="mini" plain="true">退号</button>
					</uni-td>
				</uni-tr>
				
				<uni-tr v-for="(it, i) in fur1">
					<uni-td align="center">{{it.hospital}}</uni-td>
					<uni-td align="center">{{it.department}}</uni-td>
					<uni-td align="center">{{it.doctorName}}</uni-td>
					<uni-td align="center">{{getLocalTime(it.appointDate, it.section)}}</uni-td>
					<uni-td height="50">
						<button class="btn2" type="default" size="mini" @click="popout(i, 2)">详情</button>
						<button class="btn2" type="default" size="mini" @click="onClick(i, 1)">退号</button>
					</uni-td>
				</uni-tr>
					
				<uni-tr v-for="(it, i) in fur2">
					<uni-td align="center">{{it.hospital}}</uni-td>
					<uni-td align="center">{{it.department}}</uni-td>
					<uni-td align="center">{{it.doctorName}}</uni-td>
					<uni-td align="center">{{getLocalTime(it.appointDate, it.section)}}</uni-td>
					<uni-td height="50">
						<button class="btn3" type="default" size="mini" @click="popout(i, 3)">详情</button>
						<button class="btn3" type="default" size="mini" @click="onClick(i, 2)">退号</button>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="showpage">
				<button class="mini-btn" type="default" size="mini" plain="true" @click="backward()">-</button>
				<text>{{this.pageno}}</text>
				<button class="mini-btn" type="default" size="mini" plain="true" @click="forward()">+</button>
			</view>	
		</scroll-view>
		
		<uni-popup type="center" id="pop-details-dialog" ref="popup" :maskClick="false">
			<scroll-view class="popdialog">
				<view class="[text-align, popdialog]">
					<uni-table border:=true class="popdialog">
						<uni-tr>
							<uni-td>医院</uni-td>
							<uni-td>{{this.detail.hospital}}</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>科室</uni-td>
							<uni-td>{{this.detail.department}}</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>医生名</uni-td>
							<uni-td>{{this.detail.doctorName}}</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>医生电话</uni-td>
							<uni-td>{{this.detail.doctorPhone}}</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>预约时间</uni-td>
							<uni-td>{{getLocalTime(this.detail.appointDate, this.detail.section)}}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
				<view align="center">
					<button class="mini-btn" @click="pophide()">close</button>
				</view>
			</scroll-view>
		</uni-popup>

	</view>
</template>

<script>
	import {getappoint} from "../../fetch/api.js"
	import { getCurrentUserPhone } from "../../fetch/api.js"
	
export default {
	
	components: {},
	data() {
		return {
			pop: false,
			ex: false,
			mess: 'asdads',
			showitems:[
			],
			items:{
			},
			loading: false,
			popno: 0,
			searchValue: "",
			pageno: 1,
			detail: {
				hospital: "",
				department: "",
				doctorName: "",
				doctorPhone: "",
				appointDate: ""
			},
			past: [],
			fur1: [],
			fur2: []
		}
	},
	created() {
		this.loading = true
		setTimeout(() => {
			console.log('----');
			this.loading = false
		}, 2000)
	},
	onLoad(option) {
		console.log("onload");
		this.searchValue = getCurrentUserPhone();
		console.log("phone " + this.searchValue["user_phone"]);
		if(this.searchValue["user_phone"] != ""){
			getappoint(this.searchValue["user_phone"]).then((res)=>{
			
				this.items = res.data.appointList;
				var date = (new Date()).getTime() / 1000;
				console.log("now: " + date);
				var s = 20;
				if(this.items.length < 20){
					s = this.items.length;
				}
				for(var i = 0; i < s; i++){
					if(this.items[i].appointDate - date < 0){
						this.past.push(this.items[i]);
						console.log("res: " + (this.items[i].appointDate - date))
					}else if(date - this.items[i].appointDate < 86400){
						this.fur1.push(this.items[i]);
						console.log("res: " + (this.items[i].appointDate - date))
					}
					else{
						this.fur2.push(this.items[i]);
						console.log("res: " + (this.items[i].appointDate - date))
					}
				}
				console.log("length: " + this.past.length + this.fur1.length + this.fur2.length);
			})
		}
	},
	methods :{
		beforeDestroy(){
		    document.body.style.backgroundColor = '#fff'
		},
		onClick(i, j){
			//console.log('执行click事件')
			if(j == 1){
				uni.navigateTo({//跳转页面
					url:"/pages/registration/issue_withdraw?appointDate="+ encodeURIComponent(JSON.stringify(this.fur1[i].appointDate)) + "&section=" + encodeURIComponent(JSON.stringify(this.fur1[i].section))
				});
			}else if(j == 2){
				console.log(i);
				console.log("fur2l " + this.fur2.length);
				uni.navigateTo({//跳转页面
					url:"/pages/registration/issue_withdraw?appointDate="+ encodeURIComponent(JSON.stringify(this.fur2[i].appointDate)) + "&section=" + encodeURIComponent(JSON.stringify(this.fur2[i].section))
				});
			}
		},
		popout(a, e){
			this.popno = a;
			if(e == 1){
				this.detail = this.past[this.popno];
			}else if(e == 2){
				this.detail = this.fur1[this.popno];
			}else if(e == 3){
				this.detail = this.fur2[this.popno];
			}
			this.$refs.popup.open();
		},
		pophide(){
			this.$refs.popup.close()
		},
		getLocalTime(ap, s) {
			var dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
			var time = "";
		    switch(s){
				case 0: time = "8:00-9:00"; break;
				case 1: time = "9:00-10:00"; break;
				case 2: time = "10:00-11:00"; break;
				case 3: time = "11:00-12:00"; break;
				case 4: time = "12:00-13:00"; break;
				case 5: time = "13:00-14:00"; break;
				case 6: time = "14:00-15:00"; break;
				case 7: time = "15:00-16:00"; break;
				case 8: time = "16:00-17:00"; break;
				case 9: time = "17:00-18:00"; break;
				case 10: time = "18:00-19:00"; break;
				case 11: time = "19:00-20:00"; break;
				case 12: time = "20:00-21:00"; break;
				case 13: time = "21:00-22:00"; break;
				case 14: time = "22:00-23:00"; break;
				case 15: time = "23:00-24:00"; break;
				default: ;
			}
			return (new Date(parseInt(ap) * 1000).toLocaleString('cn', dateOptions)) + " \n " +time;
		},
		backward(){
			if(this.pageno > 1){
				this.pageno--;
				for(var i = 0; i < 20; i++){
					if(this.items[(this.pageno - 1) * 20 + 1].appointDate - date < 0){
						this.past.push(this.items[(this.pageno - 1) * 20 + 1]);
					}else if(date - this.items[(this.pageno - 1) * 20 + 1].appointDate < 86400){
						this.fur1.push(this.items[(this.pageno - 1) * 20 + 1]);
					}
					else{
						this.fur2.push(this.items[(this.pageno - 1) * 20 + 1]);
					}
				}
			}else{
				uni.showToast({
					title: "已经是首页了",
					icon: 'none'
				})
			}
		},
		forward(){
			var i = 20, a = 0, b = 0, c = 0;
			if(this.items.length - this.pageno * 20 > 0){
				if(this.items.length - this.pageno * 20 < 20){
					i = this.items.length - this.pageno * 20;
				}
				for(var j = 0; j < i; j++){
					if(this.items[(this.pageno - 1) * 20 + 1].appointDate - date < 0){
						this.past.splice(a, 1, this.items[(this.pageno - 1) * 20 + 1]);
						a++;
					}else if(date - this.items[(this.pageno - 1) * 20 + 1].appointDate < 86400){
						this.fur1.splice(b, 1, this.items[(this.pageno - 1) * 20 + 1]);
						b++;
					}
					else{
						this.fur2.splice(c, 1, this.items[(this.pageno - 1) * 20 + 1]);
						c++;
					}
				}
				
				for(var j = a; j < this.past.length; j++){
					this.past.splice(j, 1);
				}
				for(var j = a; j < this.fur1.length; j++){
					this.fur1.splice(j, 1);
				}
				for(var j = a; j < this.fur2.length; j++){
					this.fur2.splice(j, 1);
				}
				this.pageno++;
			}else{
				uni.showToast({
					title: "已经是尾页了",
					icon: 'none'
				})
			}
		}
	},
	//function 
}
</script>


<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		height: 100%;
	}
	
	.i-select{
			flex:1;
			display: flex;
			flex-direction: row;
			height: 100upx;
			align-items: center;
			border-radius: 5upx;
			background-color: #FFFFFF;
			color: #000000;
	},

	button {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.button-sp-area {
		margin: 0 auto;
		width: 60%;
	}

	.mini-btn {
		margin-right: 10rpx;
	}

	.text-align{
		text-align: center;
		color: #000000;
	}

	.popdialog{
		background-color: #FFFFFF;
		border-radius: 5rpx;
		width: auto;
	}
	
	picker{
	    width: 100%;
		line-height: 100rpx;
	    height: line-height;
		color: #000000;
		text-align: center;
	}
	
	.Main{
		height: 100%;
		background: -webkit-linear-gradient(bottom, rgba(150, 255, 161, 1.0), rgba(255,255,255,0.6)) no-repeat;
	}
	
	.showpage{
		display: flex;
		flex-direction: row;
  		align-items: center;
		text-align: center;
  		justify-content: center;
		color: #000000;
	}
	
	.btn1{
		width: 70px;
		height: 35px;
		color: #000000;
		font-size: 12px;
		line-height: 35px;
		border-radius: 17px;
	}
	
	.btn2{
		width: 70px;
		height: 35px;
		background-color: #FF5500;
		color: #000000;
		font-size: 12px;
		line-height: 35px;
		border-radius: 17px;
	}
	
	.btn3{
		width: 70px;
		height: 35px;
		background-color: #73BEFA;
		color: #000000;
		font-size: 12px;
		line-height: 35px;
		border-radius: 17px;
	}

</style>