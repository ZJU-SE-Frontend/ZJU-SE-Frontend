<template>
	<view>
		<!-- 话题 -->
		<view class="topic-wrap">
			<!-- 分类 -->
			<view class="topic-classify">
				<block v-for="classIfy of classIfyList" :key="classIfy.id">
					<view @tap="handleClassIfyChange(classIfy.id)" class="classift-item" :class="{'selected': currentClassIfy === classIfy.id}">
						{{ classIfy.name }}
					</view>
				</block>
			</view>

			<!-- 列表 -->
			<view  v-if="currentClassIfy==0" class="post">
				<view v-if="postList.length" class="topic-list">
					<!-- 话题项 -->
					<block v-for="topic of postList.slice((page - 1)*limit, page*limit)">
						<view @tap="navigator('./contentPost?id=' + topic.topicId)" class="topic">
							<view class="topic-type">讨论</view>
							<view class="topic-info">
								<view class="topic-title">{{ topic.title }}</view>
								<view class="topic-other">
									<view class="topic-view">
										<text>{{ topic.replyCnt }}回复·{{ topic.viewCnt }}浏览</text>
									</view>
									<view class="topic-time">{{ topic.lastEditTime }}</view>
								</view>
							</view>
						</view>
					</block>
					<!-- 分页器 -->
					<view class="pagination">
						<view class="pagination-action">
							<view @tap="handlePageChange('prev')" class="prev">prev</view>
							<view @tap="handlePageChange('next')" class="next">next</view>
						</view>
						<view class="current-page">
							<block v-if="currentClassIfy==2 && profileTab==0">
								当前是第{{ profilePostPage }}页
							</block>
							
							<block v-if="currentClassIfy==0">
								当前是第{{ page }}页
							</block>
						</view>
					</view>
				</view>
			</view>
			
			<view  v-if="(currentClassIfy==2 && profileTab==0 )" class="post">
				<view v-if="topicList.length" class="topic-list">
					<!-- 话题项 -->
					<block v-for="topic of topicList">
						<view @tap="navigator('./contentPost?id=' + topic.topicId)" class="topic">
							<!-- <view class="topic-author-avatar"> -->
								<!-- <image class="author-avatar-url" :src="topic.author.avatar_url" lazy-load></image> -->
							<!-- </view> -->
							<view class="topic-type">讨论</view>
							<view class="topic-info">
								<view class="topic-title">{{ topic.title }}</view>
								<view class="topic-other">
									<view class="topic-view">
										<text>{{ topic.replyCnt }}回复·{{ topic.viewCnt }}浏览</text>
									</view>
									<!-- <view class="topic-time">{{ moment(topic.lastEditTime).format('YYYY-MM-DD HH:mm:ss') }}</view> -->
									<view class="topic-time">{{ topic.lastEditTime }}</view>
								</view>
							</view>
						</view>
					</block>
					<!-- 分页器 -->
					<view class="pagination">
						<view class="pagination-action">
							<view @tap="handlePageChange('prev')" class="prev">prev</view>
							<view @tap="handlePageChange('next')" class="next">next</view>
						</view>
						<view class="current-page">
							<block v-if="currentClassIfy==2 && profileTab==0">
								当前是第{{ profilePostPage }}页
							</block>
							
							<block v-if="currentClassIfy==0">
								当前是第{{ page }}页
							</block>
						</view>
					</view>
				</view>
			</view>
			
			<view  v-if="currentClassIfy==1 || (currentClassIfy==2 && profileTab==1 )" class="qa">
				<view v-if="topicList.length" class="topic-list">
					<!-- 话题项 -->
					<block v-for="topic of topicList">
						<view @tap="navigator('./contentQa?id=' + topic.questionId)" class="topic">
							<!-- <view class="topic-author-avatar"> -->
								<!-- <image class="author-avatar-url" :src="topic.author.avatar_url" lazy-load></image> -->
							<!-- </view> -->
							<view class="topic-type">问答</view>
							<view class="topic-info">
								<view class="topic-title">{{ topic.title }}</view>
								<view class="topic-other">
									<view class="topic-view">
										<text>{{ topic.answerCnt }}回复·{{ topic.viewCnt }}浏览</text>
									</view>
									<!-- <view class="topic-time">{{ moment(topic.lastEditTime).format('YYYY-MM-DD HH:mm:ss') }}</view> -->
									<view class="topic-time">{{ topic.lastEditTime }}</view>
								</view>
							</view>
						</view>
					</block>
					<!-- 分页器 -->
					<view class="pagination">
						<view class="pagination-action">
							<view @tap="handlePageChange('prev')" class="prev">prev</view>
							<view @tap="handlePageChange('next')" class="next">next</view>
						</view>
						<view class="current-page">
							<block v-if="currentClassIfy==2 && profileTab==1">
								当前是第{{ profileQuestionPage }}页
							</block>
							
							<block v-if="currentClassIfy==1">
								当前是第{{ page }}页
							</block>
							
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="currentClassIfy ==2 && profileTab == 2" class = "qa">
				<view v-if="topicList.length" class ="topic-list">
				<!-- 话题项 -->
					<block v-for="topic of topicList">
						<view @tap="navigator('./contentQa?id=' + topic.data.questionId)" class="topic">
							<!-- <view class="topic-author-avatar"> -->
								<!-- <image class="author-avatar-url" :src="topic.author.avatar_url" lazy-load></image> -->
							<!-- </view> -->
							<view class="topic-type">回答</view>
							<view class="topic-info">
								<view class="topic-title">{{ topic.data.content }}</view>
								<view class="topic-other">
									<view class="topic-view">
										<text>{{ topic.data.replyCnt }}回复·{{ topic.data.viewCnt }}浏览</text>
									</view>
									<!-- <view class="topic-time">{{ moment(topic.lastEditTime).format('YYYY-MM-DD HH:mm:ss') }}</view> -->
									
								</view>
							</view>
						</view>
					</block>
					<view class="pagination">
						<view class="pagination-action">
							<view @tap="handlePageChange('prev')" class="prev">prev</view>
							<view @tap="handlePageChange('next')" class="next">next</view>
						</view>
						<view class="current-page">
							<block v-if="currentClassIfy==2 && profileTab==2">
								当前是第{{ profileAnswerPage }}页
							</block>
						</view>
					</view>
				</view>
			</view>
			
			<view  v-if="currentClassIfy==2 && profileTab==3 " class="post">
				<view v-if="topicList.length" class="topic-list">
					<!-- 话题项 -->
					<block v-for="topic of topicList">
						<view @tap="navigator('./contentPost?id=' + topic.topicId)" class="topic">
							<!-- <view class="topic-author-avatar"> -->
								<!-- <image class="author-avatar-url" :src="topic.author.avatar_url" lazy-load></image> -->
							<!-- </view> -->
							<view class="topic-type">讨论</view>
							<view class="topic-info">
								<view class="topic-title">{{ topic.title }}</view>
							</view>
						</view>
					</block>
					<!-- 分页器 -->
					<view class="pagination">
						<view class="pagination-action">
							<view @tap="handlePageChange('prev')" class="prev">prev</view>
							<view @tap="handlePageChange('next')" class="next">next</view>
						</view>
						<view class="current-page">
							<block v-if="currentClassIfy==2 && profileTab==3">
								当前是第{{ profileFavoritePage }}页
							</block>
							
							<block v-if="currentClassIfy==0">
								当前是第{{ page }}页
							</block>
						</view>
					</view>
				</view>
			</view>
			
			<view  v-if="currentClassIfy==2" class="profile">
				<view @tap="handleGetUserPost()" class="block" >					
						<text>发帖：{{this.postCnt}}</text>
				</view>
				<view @tap="handleGetUserQuestion()" class="block">
					<text>提问:{{this.questionCnt}}</text>
				</view>
				<view @tap="handleGetUserAnswer()" class="block">
					<text>回答:{{this.answerCnt}}</text>
				</view>			
				<view @tap="handleGetUserFavorite()" class="block">
					<text>收藏:{{this.favoriteCnt}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const moment = require('moment')
	import {getPostList,getUserPost,getUserAnswer,getUserQuestion,getUserFavorite,getQuestionList,getCurrentUserPhone,getAnswerContent} from '../../fetch/api.js'
	export default {
		data() {
			return {
				// 当前帖子分类
				currentClassIfy: 0,
				// 分类列表
				classIfyList: [{
					id: 0,
					name: '讨论贴'
				}, {
					id: 1,
					name: '问答'
				}, {
					id: 2,
					name: '个人中心'
				}, ],
				// 帖子列表
				topicList: [],
				postList: [],
				// 页码
				page: 1,
				profilePostPage : 1,
				profileQuestionPage : 1,
				profileAnswerPage : 1,
				profileFavoritePage : 1,
				// 条数
				limit: 7,
				userPhone: null,
				postCnt: 0,
				questionCnt:0,
				answerCnt:0,
				favoriteCnt:0,
				profileTab:0
			}
		},
		methods: {
			onNavigationBarButtonTap(e) {
				if (this.handleGetTab() == '讨论贴') {
					uni.navigateTo({
						'url': './createPost'
					})
				}
				else if (this.handleGetTab() == '问答') {
					uni.navigateTo({
						'url': './createQuestion'
					})
					console.log('新建问答')
				}
			},
			// 获取数据
			async handleGetTopicList(params) {
				if (params.tab == '讨论贴') {
					const params = {
						'pageSize' : 2147483647,
						'pageNo' : 1
					}
					var posts = await getPostList(params);
					if (posts.data.posts.length > 0) {
						var list = posts.data.posts;
						list.sort(function(a,b){return a.lastEditTime - b.lastEditTime}).reverse()
						this.postList = []
						for(var i = 0; i < list.length; i++) {
							if(list[i].title != "") {
								list[i].lastEditTime = moment(list[i].lastEditTime*1000).format('YYYY-MM-DD HH:mm:ss')
								this.postList.push(list[i])
							}
						}
					}
				}
				else if (params.tab == '问答') {
					var questions = await getQuestionList(params.limit, params.page);
					if (questions.data.questions.length > 0) {
						this.topicList = questions.data.questions;
						for(var i = 0; i < this.topicList.length; i++) {
							this.topicList[i].lastEditTime = moment(this.topicList[i].lastEditTime*1000).format('YYYY-MM-DD HH:mm:ss')
						}
						return true;
					}
					else {
						return false;
					}
					console.log('问答页')
				}
			},
			
			async handleGetUserPost(params){	
				this.profileTab = 0
				if(params == null){
					params = {
						tab:this.handleGetTab(),
						userPhone:this.userPhone,
						pageSize:this.limit,
						pageNo:this.profilePostPage
					}
				}
								
				if(params.tab == '个人中心'){
					console.log("None page")
					if(params.pageNo){
						console.log(params.pageNo)
					}else{
						console.log("None page")
					}
					
					var posts = await getUserPost(params.userPhone,params.pageSize,params.pageNo)
					console.log("查询用户帖子")
					if (posts.data.posts.length > 0) {
						this.topicList = posts.data.posts;
						for(var i = 0; i < this.topicList.length; i++) {
							this.topicList[i].lastEditTime = moment(this.topicList[i].lastEditTime*1000).format('YYYY-MM-DD HH:mm:ss')
						}
						return true;
					}
					else {
						return false;
					}
				}
			},
			
			async handleGetUserQuestion(params){
				this.profileTab = 1
				if(params == null){
					params = {
						tab:this.handleGetTab(),
						userPhone:this.userPhone,
						pageSize:this.limit,
						pageNo:this.profileQuestionPage
					}
				}
								
				if(params.tab == '个人中心'){					
					var posts = await getUserQuestion(params.userPhone,params.pageSize,params.pageNo)
					
					if (posts.data.questions.length > 0) {
						this.topicList = posts.data.questions;
						for(var i = 0; i < this.topicList.length; i++) {
							this.topicList[i].lastEditTime = moment(this.topicList[i].lastEditTime*1000).format('YYYY-MM-DD HH:mm:ss')
						}
						return true;
					}
					else {
						return false;
					}
				}
			},
			
			async handleGetUserAnswer(params){
				this.profileTab = 2
				
				if(params == null){
					params = {
						tab:this.handleGetTab(),
						userPhone:this.userPhone,
						pageSize:this.limit,
						pageNo:this.profileAnswerPage
					}
				}
								
				if(params.tab == '个人中心'){					
					var info = await getUserAnswer(params.userPhone,params.pageSize,params.pageNo)
					var answerList = []
					if (info.data.qas.length > 0) { 
						console.log(info.data.qas.length)
						for(var i = 0; i < info.data.qas.length; i++) {
							console.log(info.data.qas[i].answerId)
							var data = await getAnswerContent(info.data.qas[i].answerId)
							answerList[i]=data
						}
						
						this.topicList = answerList;
						return true;
					}
					else{
						return false;
					}
					
				}
			},
			
			async handleGetUserFavorite(params){
				this.profileTab = 3
				if(params == null){
					params = {
						tab:this.handleGetTab(),
						userPhone:this.userPhone,
						pageSize:this.limit,
						pageNo:this.profileFavoritePage
					}
				}
								
				if(params.tab == '个人中心'){
					console.log("None page")
					if(params.pageNo){
						console.log(params.pageNo)
					}else{
						console.log("None page")
					}
					
					var posts = await getUserFavorite(params.userPhone,params.pageSize,params.pageNo)
					console.log("查询用户收藏")
					if (posts.data.favorites.length > 0) {
						this.topicList = posts.data.favorites;
						for(var i = 0; i < this.topicList.length; i++) {
							this.topicList[i].lastEditTime = moment(this.topicList[i].lastEditTime*1000).format('YYYY-MM-DD HH:mm:ss')
						}
						return true;
					}
					else {
						return false;
					}
				}
			},
			
			async handleGetProfile(){
				
				const params = {
					tab:this.handleGetTab(),
					userPhone:this.userPhone,
					pageSize:2147483647,
					pageNo:1
				}
				
				
				if (params.tab == '个人中心'){
					console.log('个人中心')
										
					var posts = await getUserPost(params.userPhone,params.pageSize,params.pageNo)
					var questions = await getUserQuestion(params.userPhone,params.pageSize,params.pageNo);
					var answers = await getUserAnswer(params.userPhone,params.pageSize,params.pageNo);
					var favorites = await getUserFavorite(params.userPhone,params.pageSize,params.pageNo);
					
					console.log("查询成功")
					if(posts.data.total){
						this.postCnt = posts.data.total
						console.log(posts.data.total)
					}
					
					if(questions.data.total){
						this.questionCnt = questions.data.total
						console.log(questions.data.total)
					}
					
					if(answers.data.total){
						this.answerCnt = answers.data.total
						console.log(answers.data.total)
					}
					if(favorites.data.total){
						this.favoriteCnt = favorites.data.total
						console.log(favorites.data.total)
					}
					
										
				}
			},
			// 话题分类切换
			handleClassIfyChange(classIfyId) {
				if (this.currentClassIfy === classIfyId) {
					return
				}else if( classIfyId == 2){
					console.log("切换到个人中心")
					this.currentClassIfy = classIfyId
					
					this.topicList=[]
					this.handleGetProfile()
				} else {
					// Reset topicList
					this.topicList = []
					// Change currentClassIfy
					this.currentClassIfy = classIfyId

					const params = {
						tab: this.handleGetTab(),
						limit: this.limit,
						page: 1,
					}
					// Reset page
					this.page = 1
					// Request
					this.handleGetTopicList(params)
				}

			},
			// 上下一页
			async handlePageChange(action) {
				if(this.currentClassIfy == 2){
					if(action === 'prev'){
						
						if(this.profileTab == 0){
							if (this.profilePostPage === 1) {
								this.$util.toast('这是第一页鸭')
							}else{
								console.log("发帖换页")
								const params = {
									tab:this.handleGetTab(),
									userPhone:this.userPhone,
									pageSize:this.limit,
									pageNo:--this.profilePostPage
								}
								this.handleGetUserPost(params)
							}
							
						}else if(this.profileTab == 1){
							if (this.profileQuestionPage === 1) {
								this.$util.toast('这是第一页鸭')
							}
								
							else{
								const params = {
									tab:this.handleGetTab(),
									userPhone:this.userPhone,
									pageSize:this.limit,
									pageNo:--this.profileQuestionPage
								}
								console.log("提问换页")
								this.handleGetUserQuestion(params)
							}
						}else if(this.profileTab == 2){
							if (this.profileAnswerPage === 1) {
								this.$util.toast('这是第一页鸭')
							}else{
								const params = {
									tab:this.handleGetTab(),
									userPhone:this.userPhone,
									pageSize:this.limit,
									pageNo:--this.profileAnswerPage
								}
								console.log("回答换页")
								this.handleGetUserAnswer(params)
							}
						}else if(this.profileTab == 3){
							if (this.profileFavoritePage === 1) {
								this.$util.toast('这是第一页鸭')
							}else{
								const params = {
									tab:this.handleGetTab(),
									userPhone:this.userPhone,
									pageSize:this.limit,
									pageNo:--this.profileFavoritePage
								}
								console.log("回答换页")
								this.handleGetUserFavorite(params)
							}
						}
						
						
							

					}else if(action === 'next'){
						
						// Request
						var result 
						if(this.profileTab == 0) {
							const params = {
								tab:this.handleGetTab(),
								userPhone:this.userPhone,
								pageSize:this.limit,
								pageNo:this.profilePostPage+1
							}
							console.log("发帖换页")
							result = await this.handleGetUserPost(params)
						}else if(this.profileTab == 1){
							const params = {
								tab:this.handleGetTab(),
								userPhone:this.userPhone,
								pageSize:this.limit,
								pageNo:this.profileQuestionPage+1
							}
							console.log("提问换页")
							result = await this.handleGetUserQuestion(params)
						}else if(this.profileTab == 2){
							const params = {
								tab:this.handleGetTab(),
								userPhone:this.userPhone,
								pageSize:this.limit,
								pageNo:this.profileAnswerPage+1
							}
							console.log("回答换页")
							result = await this.handleGetUserAnswer(params)
						}else if(this.profileTab == 3){
							const params = {
								tab:this.handleGetTab(),
								userPhone:this.userPhone,
								pageSize:this.limit,
								pageNo:this.profileFavoritePage+1
							}
							console.log("回答换页")
							result = await this.handleGetUserFavorite(params)
						}
						 
						if(result) {
							if(this.profileTab == 0){
								this.profilePostPage++
							}else if(this.profileTab == 1){
								this.profileQuestionPage++
							}else if(this.profileTab == 2){
								this.profileAnswerPage++
							}else if(this.profileTab == 3){
								this.profileFavoritePage++
							}
						}
						else {
							this.$util.toast('没有更多贴子啦')
						}
					}
				} else if(this.currentClassIfy == 0) {
					if (action === 'prev') {
						if (this.page === 1) {
							this.$util.toast('这是第一页鸭')
						} else {
							this.page--;
						}
					} else if (action === 'next') {
						if(this.postList.length / this.limit > this.page) {
							this.page++;
						}
						else {
							this.$util.toast('没有更多贴子啦')
						}
					}
				}
				else{
					if (action === 'prev') {
						if (this.page === 1) {
							this.$util.toast('这是第一页鸭')
						} else {
							const params = {
								page: --this.page,
								limit: this.limit,
								tab: this.handleGetTab(),
							}
							// Request
							this.handleGetTopicList(params)
						}
					} else if (action === 'next') {
						const params = {
							tab: this.handleGetTab(),
							page: this.page + 1,
							limit: this.limit,
						}
						// Request
						var result = await this.handleGetTopicList(params)
						if(result) {
							this.page++;
						}
						else {
							this.$util.toast('没有更多贴子啦')
						}
					}
				}
				
			},
			// 获取当前分类id对应的tab
			handleGetTab() {
				switch (this.currentClassIfy) {
					case 0:
						return '讨论贴'
					case 1:
						return '问答'
					case 2:
						return '个人中心'
				}
			},
			navigator(url) {
				uni.navigateTo({
					url
				});
			},
			load() {
				this.handleGetTopicList({
					tab: this.handleGetTab(),
					limit: this.limit,
					page: this.page
				})
			},
			refresh() {
				this.page = 1;
				this.load()
			},
			async getCurrentUser() {
				var userInfo = await getCurrentUserPhone()
				console.log("user INFO: ")
				console.log(userInfo)
				this.userPhone = userInfo.user_phone
				console.log(this.userPhone)
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.load()
		},
		// 页面加载
		onLoad() {
			this.getCurrentUser()
			this.load()
		}
	}
</script>

<style lang="scss" scoped>
	// 话题
	.topic-wrap {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		margin: 0 0rpx 25rpx;
		background-color: #fff;
		border-radius: 6rpx;

		// 分类
		.topic-classify {
			width: 710rpx;
			padding: 20rpx;
			background-color: #F6F6F6;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			align-items: center;
			border-radius: 6rpx;

			.classift-item {
				width: 132rpx;
				text-align: center;
				color: #007AFF;
				font-size: 14px;
				border-radius: 6rpx;
				transition: .15s;
			}

			.selected {
				color: #fff;
				background-color: #007AFF;
			}
		}

		// 列表
		.topic-list {
			width: 750rpx;
			background-color: #fff;
			border-radius: 6rpx;

			// 话题项
			.topic {
				width: 750rpx;
				height: 100rpx;
				padding: 5rpx 0;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				border-bottom: #f0f0f0 solid 2rpx;

				.topic-author-avatar {
					width: 100rpx;
					height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.author-avatar-url {
						width: 60rpx;
						height: 60rpx;
					}
				}

				.topic-type {
					width: 64rpx;
					padding: 0 4rpx;
					margin-right: 15rpx;
					margin-left: 15rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #999;
					font-size: 12px;
					background-color: #e5e5e5;
					border-radius: 6rpx;
				}

				.type-good {
					color: #fff;
					background-color: #007AFF;
				}

				.topic-info {
					width: 648rpx;

					.topic-title {
						width: 520rpx;
						color: #333;
						line-height: 40rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.topic-other {
						width: 628rpx;
						display: flex;
						flex-flow: row nowrap;
						justify-content: space-between;
						align-items: center;
						line-height: 40rpx;

						.topic-view {
							font-size: 10px;
							color: #b4b4b4;

							.count-of-replies {
								color: #9e78c0;
							}
						}

						.topic-time {
							font-size: 12px;
							color: #778087;
						}
					}
				}
			}

			// 无数据
			.no-data {}

			// 分页器
			.pagination {
				width: 750rpx;
				display: flex;

				.pagination-action {
					height: 60rpx;
					width: 215rpx;
					padding: 15rpx;
					display: flex;
					justify-content: space-between;

					.prev,
					.next {
						width: 100rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #007AFF;
						background-color: #F6F6F6;
						font-size: 12px;
						border-radius: 12rpx;
					}

					.prev {}

					.next {}
				}

				.current-page {
					width: 515rpx;
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					align-items: center;
					font-size: 14px;
					color: #999;
				}
			}
		}
	}
	.profile{
		width: 750rpx;
		margin: 0 0rpx 25rpx;
		background-color: #fff;
		border-radius: 6rpx;
		
		.block{
			width: 200 rpx;
			color: #333;
			line-height: 80rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
