<template>
	<view>
		<!-- 头部 -->
		<!-- <ssx-header></ssx-header> -->

		<!-- 话题详情 -->
		<view class="topic-detail">
			<!-- 话题详情 -->
			<view>
				<!-- 话题头部 -->
				<view class="detail-header">
					<!-- <view class="topic-title">{{ topic.title }}</view> -->
					<view class="topic-header-info">•修改于{{ topic.updateTime }}•作者 {{ topic.userName }}</view>
				</view>
				<!-- 话题内容 -->
				<view class="detail-content"><u-parse :content="topic.content" @preview="preview" @navigate="navigate" /></view>
				<!-- 点赞/踩 -->
				<view class="detail-like">
					<image v-if="likeState==true" class="info-icon" @tap="tapLike" src="../../static/forum/赞 面性.svg"></image>
					<image v-else class="info-icon" @tap="tapLike" src="../../static/forum/赞.svg"></image>
					<text class="info-cnt">{{ topic.likeCnt }}</text>
					<image v-if='likeState==false' class="info-icon" @tap="tapDislike" src="../../static/forum/踩 面性.svg"></image>
					<image v-else class="info-icon" @tap="tapDislike" src="../../static/forum/踩.svg"></image>
					<text class="info-cnt">{{ topic.dislikeCnt }}</text>
					<image class="info-icon" src="../../static/forum/阅读 可见.svg"></image>
					<text class="info-cnt">{{ topic.viewCnt }}</text>
					<image class="info-icon" src="../../static/forum/评论.svg"></image>
					<text class="info-cnt">{{ topic.replyCnt }}</text>
					<image v-if="favoriteState" class="info-icon" @tap="changeFavoriteState" src="../../static/forum/星星 面性.svg"></image>
					<image v-else class="info-icon" @tap="changeFavoriteState" src="../../static/forum/星星.svg"></image>
				</view>
				<!-- 话题回复 -->
				<view class="detail-reply">
					<!-- 回复标题 -->
					<!-- <view class="reply-title">{{ topic.replyCnt }}回复</view> -->
					<!-- 回复列表 -->
					<view class="reply-list">
						<block v-for="(reply, replyIndex) of replies">
							<view class="reply">
								<view class="reply-header">
									<!-- <view class="reply-author-avatar"> -->
										<!-- <image :src="reply.author.avatar_url"></image> -->
									<!-- </view> -->
									<view class="reply-info">
										<text class="reply-author">{{ reply.userName}}</text>
										<text class="reply-time">{{ replyIndex+1 }}楼•{{ reply.lastEditTime }}</text>
									</view>
									<view class="reply-delete">
										<text class="delete-text" v-if="userPhone==reply.userPhone || userRole==3" @tap="removeReply(reply.replyId)">删除</text>
										<text class="report-text" v-if="userPhone!=reply.userPhone && userRole!=3" @tap="reportReply(reply.replyId)">举报</text>
									</view>
								</view>
								<view class="reply-content">
									<u-parse :content="reply.content" @preview="preview" @navigate="navigate" />
								</view>
								<view class="detail-like">
									<image v-if="replyLikeInfo.likes.indexOf(reply.replyId) > -1" class="info-icon" @tap="tapReplyLike(reply.replyId)" src="../../static/forum/赞 面性.svg"></image>
									<image v-else class="info-icon" @tap="tapReplyLike(reply.replyId)" src="../../static/forum/赞.svg"></image>
									<text class="info-cnt">{{ reply.likeCnt }}</text>
									<image v-if='replyLikeInfo.disLikes.indexOf(reply.replyId) > -1' class="info-icon" @tap="tapReplyDislike(reply.replyId)" src="../../static/forum/踩 面性.svg"></image>
									<image v-else class="info-icon" @tap="tapReplyDislike(reply.replyId)" src="../../static/forum/踩.svg"></image>
									<text class="info-cnt">{{ reply.dislikeCnt }}</text>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			
			<!-- No data -->
			<!-- <ssx-no-data v-if="!topic.id"></ssx-no-data> -->
		</view>
		
		<view @tap="onFloatButton()" class="plus">回复</view>
	</view>
</template>

<script>
const moment = require('moment')
import uParse from '../../common/gaoyia-parse/parse'
import store from "@/common/store.js"
import SsxHeader from './ssx-header'
import SsxNoData from './ssx-no-data'
import SsxFixButton from './ssx-fix-button'
import {getPost, addViewCnt, getQaLikeInfo, postQaLike, deleteLike, getQaAnswerFavoriteInfo, 
			addToQaAnswerFavorite, removeFromQaAnswerFavorite, getTopicReplies, deleteReply, getUserStatePhone} from '../../fetch/api.js'
import {addAnswerViewCnt, getQaTopicReplies, getAnswerContent, deleteQaReply, deleteQaLike, 
			getQaReplyLikeInfo, postQaReplyLike, deleteQaReplyLike, getAuthInfo, reportQaReply} from '../../fetch/api.js'
export default {
	components: {
		uParse,
		SsxHeader,
		SsxNoData,
		SsxFixButton,
	},
	data() {
		return {
			// 加载层
			loading: false,
			// 话题ID
			topicId: null,
			topic: {
				"userName": " ",
				"viewCnt": 0,
				"updateTime": 0,
				"content": " ",
				"likeCnt": 0,
				"dislikeCnt": 0,
				"viewCnt": 0,
				"replyCnt": 0,
			},
			likeState: null,
			favoriteState: null,
			hasLiked: null,
			hasDisLiked: null,
			userPhone: null,
			pageSize : 20,
			pageNo : 1,
			replies : [],
			qid : null,
			replyLikeInfo: {
				likes: [],
				disLikes: []
			},
			role : "",
			hasLogin : store.state.hasLogin,
			userPhone: store.state.uerInfo.userPhone,
			userRole: store.state.uerInfo.authType,
			
		}
	},
	methods: {
		onFloatButton() {
			if(this.hasLogin) {
				uni.navigateTo({
					'url': './createQaReply?id=' + this.topicId
				})
			}
			else {
				this.$util.toast('请先登录！')
			}
		},
		async loadAuthInfo() {
			var authInfo = await getAuthInfo()
			this.role = authInfo
		},
		// 获取话题详情
		async handleGetTopicDetail(id) {
			var topic = await getAnswerContent(id);
			this.topic = topic.data;
			this.topic.updateTime = moment(this.topic.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
		},
		// 话题详情数据过滤
		handleTopicDetailFilter(topic) {
			// 过滤话题数据
			switch (topic.tab) {
				case 'share':
					topic.tab = '分享'
					break;
				case 'ask':
					topic.tab = '问答'
					break;
				case 'job':
					topic.tab = '招聘'
					break;
				case 'good':
					topic.tab = '精华'
					break;
				default:
					break;
			}
			topic.create_at = moment(topic.create_at).format('YYYY-MM-DD HH:mm:ss')
			return topic
		},
		async loadLikeInfo() {
			const params = {
				"userPhone" : this.userPhone,
				"pageSize" : 2147483647,
				"pageNo" : 1
			};
			var likeData = await getQaLikeInfo(this.qid, params)
			if(likeData.data.likes.indexOf(parseInt(this.topicId)) > -1) this.likeState = true
			else if(likeData.data.disLikes.indexOf(parseInt(this.topicId)) > -1) this.likeState = false
			else this.likeState = null
			console.log(this.likeState)
			// this.hasLiked = (this.likeState == true)
			// this.hasDisLiked = (this.likeState == false)
		},
		async LoadFavoriteInfo() {
			const params = {
				"userPhone" : this.userPhone,
			};
			var favoriteState = await getQaAnswerFavoriteInfo(this.topicId, params)
			this.favoriteState = favoriteState.data
			console.log(this.favoriteState)
		},
		async signalLike() {
			const params = {
				"userPhone" : this.userPhone,
				"like" : 1
			};
			await postQaLike(this.topicId, params)
		},
		async signalDislike() {
			const params = {
				"userPhone" : this.userPhone,
				"like" : 0
			};
			await postQaLike(this.topicId, params)
		},		
		async signalClear() {
			const params = {
				"userPhone" : this.userPhone,
			};
			await deleteQaLike(this.topicId, params)
		},
		async tapLike() {
			this.getUserState()
			if(this.hasLogin){
				await this.signalClear()
				if (this.likeState != true)
					await this.signalLike()
				this.loadLikeInfo()
				this.handleGetTopicDetail(this.topicId)	
			}
		},
		async tapDislike() {
			
			this.getUserState()
			if(this.hasLogin){
				await this.signalClear()
				if (this.likeState != false)
					await this.signalDislike()
				this.loadLikeInfo()
				this.handleGetTopicDetail(this.topicId)
			}
		},
		async changeFavoriteState() {
			this.getUserState()
			if(this.hasLogin){
				const params = {
					"userPhone" : this.userPhone,
				};
				if (!this.favoriteState){
					console.log('add favorite')
					await addToQaAnswerFavorite(this.topicId, params)
				}
				else {
					console.log('remove favorite')
					await removeFromQaAnswerFavorite(this.topicId, params)
				}
				this.LoadFavoriteInfo()
			}
		},
		async getReplies() {
			const params = {
				"pageSize" : this.pageSize,
				"pageNo" : this.pageNo
			}
			var replies = await getQaTopicReplies(this.topicId, params)
			console.log(replies.data.qaReplys)
			this.replies = replies.data.qaReplys
			console.log(this.replies)
			replies = []
			for(var r in this.replies) {
				if(this.replies[r].content != "") {
					this.replies[r].lastEditTime = moment(this.replies[r].lastEditTime * 1000).format('YYYY-MM-DD HH:mm:ss')
					replies.push(this.replies[r])
				}
			}
			this.replies = replies
		},
		async removeReply(replyId) {
			this.getUserState()
			if(this.hasLogin){
				console.log("218 " + replyId)
				await deleteQaReply(replyId)
				this.getReplies()
			}
		},
		editReply(replyId, content) {
			uni.navigateTo({
				'url': './editReply?id=' + replyId
			})
		},
		async reportReply(replyId) {
			this.getUserState()
			if(this.hasLogin){
				console.log(replyId)
				await reportQaReply(replyId)
				this.$util.toast('举报成功')
			}
		},
		async loadReplyLikeInfo() {
			const params = {
				"userPhone" : this.userPhone,
				"pageSize" : 2147483647,
				"pageNo" : 1
			}
			var replyLikeList = await getQaReplyLikeInfo(this.topicId, params)
			console.log(replyLikeList)
			this.replyLikeInfo = replyLikeList.data
		},
		async signalReplyLike(replyId) {
			const params = {
				"userPhone" : this.userPhone,
				"like" : 1
			};
			await postQaReplyLike(replyId, params)
		},
		async signalReplyDislike(replyId) {
			const params = {
				"userPhone" : this.userPhone,
				"like" : 0
			};
			await postQaReplyLike(replyId, params)
		},		
		async signalReplyClear(replyId) {
			const params = {
				"userPhone" : this.userPhone,
			};
			console.log('clear' + replyId)
			await deleteQaReplyLike(replyId, params)
		},
		async tapReplyLike(replyId) {
			this.getUserState()
			if(this.hasLogin){
				await this.signalReplyClear(replyId)
				if (this.replyLikeInfo.likes.indexOf(replyId) == -1)
					await this.signalReplyLike(replyId)
				await this.loadReplyLikeInfo()
				await this.getReplies()
			}
		},
		async tapReplyDislike(replyId) {
			this.getUserState()
			if(this.hasLogin){
				await this.signalReplyClear(replyId)
				if (this.replyLikeInfo.disLikes.indexOf(replyId) == -1)
					await this.signalReplyDislike(replyId)
				await this.loadReplyLikeInfo()
				await this.getReplies()
			}
		},
		async getQid() {
			var qidData = await getAnswerContent(this.topicId)
			this.qid = qidData.data.questionId
		},
		getUserState() {
			this.hasLogin = store.state.hasLogin
			this.userPhone = store.state.uerInfo.userPhone
			this.userRole = store.state.uerInfo.authType
		}
	},
	async onLoad(params) {
		if (params.id) {
			//console.log(params.id)
			this.topicId = params.id
			await this.getQid()
			console.log('Loading ' + this.topicId)
			this.getUserState()
			console.log('11111111')
			await addAnswerViewCnt(this.topicId)
			console.log('22222222')
			await this.getReplies()
			console.log('33333333')
			this.LoadFavoriteInfo()
			this.loadLikeInfo()
			this.loadAuthInfo()
			this.handleGetTopicDetail(this.topicId)
			this.loadReplyLikeInfo()
		}
	},
	
}
</script>

<style lang="scss">
	.plus{
		position: fixed;
		right: 50rpx;
		/* #ifdef H5 */
		bottom: 80px;
		/* #endif */
		/* #ifndef H5 */
		bottom: calc(var(--window-bottom) + 50rpx);
		/* #endif */
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
		color: #333;
		background-color: #fff;
		box-shadow: 0 20rpx 60rpx 20rpx rgba(0, 0, 0, 0.2);
		font-size: 30rpx;
		border-radius: 50%;
		z-index: 999;
	}
// 话题详情
.topic-detail {
	width: 730rpx;
	margin: 0 15rpx 25rpx;
	background-color: #fff;
	border-radius: 6rpx;
	// 话题头部
	.detail-header {
		width: 690rpx;
		padding: 20rpx;
		border-bottom: #e5e5e5 solid 2rpx;
		.topic-title {
			color: #333;
			font-size: 22px;
			font-weight: 700;
		}
		.topic-header-info {
			font-size: 12px;
			color: #838383;
		}
	}
	// 话题内容
	.detail-content {
		width: 690rpx;
		padding: 20rpx;
		border-bottom: #e5e5e5 solid 2rpx;
	}
	// 话题赞踩
	.detail-like {
		display: flex;
		flex-direction: row;
		width: 690rpx;
		height: 40rpx;
		padding: 20rpx;
		// margin-left: auto;
		margin-right: auto;
		border-bottom: #e5e5e5 solid 2rpx;
		
		.info-cnt {
			height: 40rpx;
			width: 80rpx;
			font-size: 30rpx;
			vertical-align: middle;
			line-height: 40rpx;
			margin: 0 0 0 10rpx;
		}
		
		.info-icon {
			height: 40rpx;
			width: 40rpx;
		}
	}
	// 话题回复
	.detail-reply {
		width: 730rpx;
		// 回复标题
		.reply-title {
			width: 690rpx;
			padding: 20rpx;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 14px;
			color: #333;
			background-color: #f6f6f6;
		}
		// 回复列表
		.reply-list {
			width: 690rpx;
			padding: 0 20rpx 0 20rpx;
			.reply {
				padding: 15rpx 0 15rpx 0;
				border-bottom: #f0f0f0 solid 2rpx;
				.reply-header {
					height: 88rpx;
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					align-items: center;
					.reply-author-avatar {
						margin-right: 15rpx;
						image {
							width: 60rpx;
							height: 60rpx;
						}
					}
					.reply-info {
						.reply-author {
							margin-right: 15rpx;
							color: #666;
							font-size: 12px;
							font-weight: 700;
						}
						.reply-time {
							font-size: 11px;
							color: #08c;
						}
					}
					.reply-delete {
						margin-left: 20rpx;
						.delete-text {
							padding: 3rpx 10rpx 3rpx 20rpx;
							font-size: 11px;
							// color: #ffffff;
							// background-color: #ff0000;
							color: #ff0000;
						}
						.report-text {
							padding: 3rpx 10rpx 3rpx 10rpx;
							font-size: 11px;
							color: #b4b4b4;
						}
						.recommend-text {
							padding: 3rpx 10rpx 3rpx 10rpx;
							font-size: 11px;
							color: #0000ff;
						}
					}
				}
				.reply-content {
				}
			}
		}
	}
}
</style>
