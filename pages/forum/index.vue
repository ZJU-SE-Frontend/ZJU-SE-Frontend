<template>
	<view>
		<!-- 头部 -->
		<!-- <ssx-header></ssx-header> -->

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
			<view v-if="topicList.length" class="topic-list">
				<!-- 话题项 -->
				<block v-for="topic of topicList">
					<view @tap="navigator('./content?id=' + topic.topicId)" class="topic">
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
					<view class="current-page">当前是第{{ page }}页</view>
				</view>
			</view>
			<!-- No data -->
			<!-- <ssx-no-data v-if="!topicList.length"></ssx-no-data> -->

			<view  v-if="currentClassIfy==2" class="profile">
				<view @tap="handleGetUserPost()" class="block" >					
						<text>主题帖：{{this.postCnt}}</text>
				</view>
				<view class="block">
					<text>提问:{{this.questionCnt}}</text>
				</view>
				<view class="block">
					<text>回答:{{this.answerCnt}}</text>
				</view>				
			</view>
		</view>
		
	</view>
</template>

<script>
	const moment = require('moment')
	import SsxNoData from './ssx-no-data'
	import SsxHeader from './ssx-header'
	import {getPostList,getUserPost,getUserAnswer,getUserQuestion} from '../../fetch/api.js'
	export default {
		components: {
			SsxNoData,
			SsxHeader,
		},
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
				topicList: [
				
				],
				// 页码
				page: 1,
				// 条数
				limit: 10,
				userPhone:18888888888,
				postCnt: 0,
				questionCnt:0,
				answerCnt:0
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
					console.log('新建问答')
				}
			},
			// 获取数据
			async handleGetTopicList(params) {
				if (params.tab == '讨论贴') {
					var posts = await getPostList(params.limit, params.page);
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
				else if (params.tab == '问答') {
					console.log('问答页')
				}
			},
			
			async handleGetUserPost(params){
				
				if(params == null){
					params = {
						tab:this.handleGetTab(),
						userPhone:this.userPhone,
						pageSize:this.limit,
						pageNo:this.page
					}
				}
								
				if(params.tab == '个人中心'){					
					var posts = await getUserPost(params.userPhone,params.pageSize,params.pageNo)
					
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
					// var questions = await getUserQuestion(params.userPhone,params.pageSize,params.pageNo);
					// var answers = await getUserAnswer(params.userPhone,params.pageSize,params.pageNo);
					
					console.log("查询成功")
					if(posts.data.total){
						this.postCnt = posts.data.total
						
						console.log(posts.data.total)
					}
					
					// if(questions.data.total){
						// this.questionCnt = questions.data.total
					// 	console.log(questions.data.total)
					// }
					
					// if(answers.data.total){
						// this.answerCnt = answers.data.total
					// 	console.log(answers.data.total)
					// }
					
										
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
						if (this.page === 1) {
							this.$util.toast('这是第一页鸭')
						} else {
							const params = {
								tab:this.handleGetTab(),
								userPhone:this.userPhone,
								pageSize:this.limit,
								pageNo:--this.page
							}
							// Request
							this.handleGetUserPost(params)
						}
					}else if(action === 'next'){
						const params = {
							tab:this.handleGetTab(),
							userPhone:this.userPhone,
							pageSize:this.limit,
							pageNo:this.page+1
						}
						// Request
						var result = await this.handleGetUserPost(params)
						if(result) {
							this.page++;
						}
						else {
							this.$util.toast('没有更多贴子啦')
						}
					}
				}else{
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
			}
			
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.load()
		},
		// 页面加载
		onLoad() {
			this.load()
		}
	}
</script>

<style lang="scss" scoped>
	// 话题
	.topic-wrap {
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
