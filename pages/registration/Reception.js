import app from "../../App.vue"
import {getPatientAppointList} from "../../fetch/api.js"


	// 定义全局参数,控制数据加载
	var _self, page = 1,timer = null;

	export default {
		data() {
			return {
				loadingText: '',
				animation: '',
				animationData: {},
				doctor_phone : "18888988888",
				appointList: [
				      {
				        "patientPhone": "18888888888",
				        "patientName": "卢本伟",
				        "patientGender": "male",
				        "patientAge": 40,
				        "department": "儿科子科室1",
				        "appointDate": 1618934400,
				        "section": 1
				      },
				      {
				        "patientPhone": "18888888888",
				        "patientName": "卢本伟",
				        "patientGender": "male",
				        "patientAge": 40,
				        "department": "儿科子科室1",
				        "appointDate": 1618934400,
				        "section": 3
				      }
				],
				
			
 
				page:0,//当前分页页码
				// apiUrl:'https://www.ymznkf.com/wx_server',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:''//方便存在本地的locakStorage  
			}
		},
		components:{

		},
		onLoad(options) {
			_self = this;
			
			//检查是否登录参考代码,需要用的时候，可以把注释取掉
			//if(this.checkLogin()==false){
			//	return;
			//}
			
			//this.getLaction();//得到gps

			this.page=0;
			

			//检测有没有传入id参数
			if (options.id != null && options.id !=""){
				this.id=options.id;
			}  
			
			getPatientAppointList(this.doctor_phone).then((res)=>{
				this.appointList = res.data.appointList
				this.appointList.forEach(function(item, index){
					console.log(item.patientGender)
					if(item.patientGender == "male") item.patientGender = "男";
						else item.patientGender = "女";
					
					var date = new Date(item.appointDate * 1000);
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '';
					item.appointDate = Y+M+D;
				})
				
			})
			
			// 初始化一个动画
			var animation = uni.createAnimation({
				transformOrigin: "50% 0 50%",
				duration: 300, //动画持续0.3秒
				timingFunction: 'linear', //linear 全程匀速运动
				delay: 100 //延迟1秒执行动画
			})
			this.animation = animation;
			this.scaleAndScale();

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");

		},
		onShow() {
			console.log("on show");
			//if(this.checkLogin()==false){
			//	return;
			//}

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		methods: {
			jumpToNewPage(){
				console.log("jump success!")
				uni.navigateTo({
					url: '/pages/registration/patient'
				});
			}
			,
			// 定义动画内容
			scaleAndScale() {
				// 定义动画内容
				this.animation.opacity(0, 1).step() //先放大1,2倍
				this.animation.opacity(1, 0).step() //缩小至原来的大小
				// 导出动画数据传递给data层
				this.animationData = this.animation.export(); //每次执行导出动画时 会覆盖之前的动画
			},
			noscaleAndScale() {
				this.animation.scale(1, 1).step()
				this.animationData = this.animation.export()
			},
			changeRepresentation(gender){
				switch(gender){
					case "male" : return "男";
					case "female" : return "女";
				}
			}
			,
			Reception_click:function(e){
				console.log(e)
				var path = '/pages/registration/patient?patient_phone='
				path += e
				console.log(path)
				uni.navigateTo({
					url: path
				})
			},
			/**
			* Reception_6_6处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			Reception_6_6_click:function(event){
			
			},
			
			/**
			* Reception_7_7处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			Reception_7_7_click:function(event){
			
			   uni.navigateTo({
			   url:'/pages/reception_chat/reception_chat'
			  })
			},
			
			/**
			* Reception_34_34处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			Reception_34_34_click:function(event){
			
			},
			
			/**
			* arraw_36处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			arraw_36_click:function(event){
			
			   wx.redirectTo({
			   url:'/pages/index/index'
			  })
			},
			
			

			//刷新数据
			Refresh:function(_action) {
				getPatientAppointList(this.doctor_phone).then((res)=>{
					this.appointList = res.data.appointList
					this.appointList.forEach(function(item, index){
						console.log(item.patientGender)
						if(item.patientGender == "male") item.patientGender = "男";
							else item.patientGender = "女";
						
						var date = new Date(item.appointDate * 1000);
						var Y = date.getFullYear() + '-';
						var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '';
						item.appointDate = Y+M+D;
					})
					
				})
				
				setTimeout(function () {
				    uni.stopPullDownRefresh();
				}, 2000);
			},
		}
	}
