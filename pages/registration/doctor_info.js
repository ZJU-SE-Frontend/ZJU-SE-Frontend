import app from "../../App.vue"
import {getDoctorInfo} from "../../fetch/api.js";


	// 定义全局参数,控制数据加载
	var _self, page = 1,timer = null;

	export default {
		data() {
			return {
				loadingText: '',
				animation: '',
				animationData: {},
 
				page:0,//当前分页页码
				apiUrl:'',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:'',//方便存在本地的locakStorage 
				doctorInfomation: {
					doctorPhone: '18888988888',
					doctorName: '陈岩',
					hospital: '浙一',
					department: '儿科',
					doctorInfo: '擅长儿科哮喘疾病的治疗',
					title: '主任医师',
					doctorId: 'ID888',
					workTime: 10,
					age: 30,
					gender: 'male'
				}
			}
		},
		components:{

		},
		onLoad(options) {
			_self = this;

			this.page=0;

			//检测有没有传入id参数
			if (options.id != null && options.id !=""){
				this.id=options.id;
			}   
			
			var doctorPhone = 18888988888//option.doctorPhone;
			getDoctorInfo(this.doctorInfomation.doctorPhone).then((res) => {
				this.$data.doctorInfomation = res.data
				if (this.doctorInfomation.gender == "male") this.doctorInfomation.gender = "男";
				else this.doctorInfomation.gender = "女";
				console.log(this.doctorInfomation)
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
			/**
			* row3_70处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			row3_70_click:function(event){
			   var path = '/pages/registration/Reception'
			   path = path + '?doctorPhone=' + this.doctorInfomation.doctorPhone
			   uni.navigateTo({
			   url:path
			  })
			},
			// 定义动画内容
			scaleAndScale() {
				// 定义动画内容
				this.animation.opacity(0, 1).step() //先放大1,2倍
				this.animation.opacity(1, 0).step() //缩小至原来的大小
				// 导出动画数据传递给data层
				this.animationData = this.animation.export(); //每次执行导出动画时 会覆盖之前的动画
			},
			//刷新数据
			Refresh:function(_action) {
				getDoctorInfo(this.doctorInfomation.doctorPhone).then((res) => {
					this.$data.doctorInfomation = res.data
					if (this.doctorInfomation.gender == "male") this.doctorInfomation.gender = "男";
					else this.doctorInfomation.gender = "女";
					console.log(this.doctorInfomation)
				})
				
				setTimeout(function () {
				    uni.stopPullDownRefresh();
				}, 2000);
				
			}
		}
	}
