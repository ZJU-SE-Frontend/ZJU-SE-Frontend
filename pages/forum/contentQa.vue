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
					<view class="topic-title">{{ topic.title }}</view>
					<view class="topic-header-info">•修改于{{ topic.lastEditTime }}•作者 {{ topic.userName }}</view>
				</view>
				<!-- 话题内容 -->
				<view class="detail-content">
					<text>{{ topic.content }}</text>
				</view>
				<!-- 点赞/踩 -->
				<view class="detail-like">
					<!-- <image v-if="hasLiked" class="info-icon" @tap="tapLike" src="../../static/forum/赞 面性.svg"></image>
					<image v-else class="info-icon" @tap="tapLike" src="../../static/forum/赞.svg"></image>
					<text class="info-cnt">{{ topic.likeCnt }}</text>
					<image v-if='hasDisLiked' class="info-icon" @tap="tapDislike" src="../../static/forum/踩 面性.svg"></image>
					<image v-else class="info-icon" @tap="tapDislike" src="../../static/forum/踩.svg"></image>
					<text class="info-cnt">{{ topic.dislikeCnt }}</text> -->
					<image class="info-icon" src="../../static/forum/阅读 可见.svg"></image>
					<text class="info-cnt">{{ topic.viewCnt }}</text>
					<image class="info-icon" src="../../static/forum/评论.svg"></image>
					<text class="info-cnt">{{ topic.answerCnt }}</text>
					<image v-if="favoriteState" class="info-icon" @tap="changeFavoriteState" src="../../static/forum/星星 面性.svg"></image>
					<image v-else class="info-icon" @tap="changeFavoriteState" src="../../static/forum/星星.svg"></image>
				</view>
				
				<sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter>
				
				<!-- 话题回复 -->
				<view v-if="currentListType=='default'">
					<view class="detail-reply">
						<!-- 回复标题 -->
						<view class="reply-title">{{answers.length}}回答</view>
						<!-- 回复列表 -->
						<view class="reply-list">
							<block v-for="(reply, replyIndex) of answers">
								<view class="reply">
									<view class="reply-header">
										<!-- <view class="reply-author-avatar">
											<image :src="reply.author.avatar_url"></image>
										</view> -->
										<view class="reply-info">
											<text class="reply-author">{{ reply.userName }}</text>
											<text class="reply-time">{{ replyIndex+1 }}楼•{{ reply.lastEditTime }}</text>
										</view>
										<view class="reply-delete">
											<text class="recommend-text" v-if="role=='manager'" @tap="recommandReply(reply.answerId)">推荐</text>
											<text class="delete-text" v-if="userPhone==reply.userPhone || role=='manager'" @tap="removeReply(reply.answerId)">删除</text>
											<text class="report-text" v-if="userPhone!=reply.userPhone && role!='manager'" @tap="reportReply(reply.answerId)">举报</text>
										</view>
									</view>
									<view @tap="navigator('./contentQaReply?id=' + reply.answerId + '&qid=' + topicId)" class="reply-content">
										<u-parse :content="reply.content" @preview="preview" @navigate="navigate" />
									</view>
									<view class="reply-finfo">
										{{reply.viewCnt}}浏览• {{ reply.replyCnt }}回复
									</view>
									<view class="detail-like">
										<image v-if="replyLikeInfo.likes.indexOf(reply.answerId) > -1" class="info-icon" @tap="tapReplyLike(reply.answerId)" src="../../static/forum/赞 面性.svg"></image>
										<image v-else class="info-icon" @tap="tapReplyLike(reply.answerId)" src="../../static/forum/赞.svg"></image>
										<text class="info-cnt">{{ reply.likeCnt }}</text>
										<image v-if='replyLikeInfo.disLikes.indexOf(reply.answerId) > -1' class="info-icon" @tap="tapReplyDislike(reply.answerId)" src="../../static/forum/踩 面性.svg"></image>
										<image v-else class="info-icon" @tap="tapReplyDislike(reply.answerId)" src="../../static/forum/踩.svg"></image>
										<text class="info-cnt">{{ reply.dislikeCnt }}</text>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>

			
				<view v-if="currentListType=='hot'">
					<view class="detail-reply">
						<!-- 回复标题 -->
						<view class="reply-title">{{sortedAnswers.length}}回答</view>
						<!-- 回复列表 -->
						<view class="reply-list">
							<block v-for="(reply, replyIndex) of sortedAnswers">
								<view @tap="navigator('./contentQaReply?id=' + reply.answerId + '&qid=' + topicId)" class="reply">
									<view class="reply-header">
										<!-- <view class="reply-author-avatar">
											<image :src="reply.author.avatar_url"></image>
										</view> -->
										<view class="reply-info">
											<text class="reply-author">{{ reply.userName }}</text>
											<text class="reply-time">{{ replyIndex+1 }}楼•{{ reply.lastEditTime }}</text>
										</view>
										<view class="reply-delete">
											<text class="delete-text" v-if="userPhone==reply.userPhone" @tap="removeReply(reply.answerId)">删除</text>
											<text class="report-text" v-if="userPhone!=reply.userPhone" @tap="reportReply(reply.answerId)">举报</text>
										</view>
									</view>
									<view class="reply-content">
										<u-parse :content="reply.content" @preview="preview" @navigate="navigate" />
									</view>
									<view class="reply-finfo">
										{{reply.viewCnt}}浏览• {{ reply.replyCnt }}回复
									</view>
									<view class="detail-like">
										<image v-if="replyLikeInfo.likes.indexOf(reply.answerId) > -1" class="info-icon" @tap="tapReplyLike(reply.answerId)" src="../../static/forum/赞 面性.svg"></image>
										<image v-else class="info-icon" @tap="tapReplyLike(reply.answerId)" src="../../static/forum/赞.svg"></image>
										<text class="info-cnt">{{ reply.likeCnt }}</text>
										<image v-if='replyLikeInfo.disLikes.indexOf(reply.answerId) > -1' class="info-icon" @tap="tapReplyDislike(reply.answerId)" src="../../static/forum/踩 面性.svg"></image>
										<image v-else class="info-icon" @tap="tapReplyDislike(reply.answerId)" src="../../static/forum/踩.svg"></image>
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
		</view>
		
		<view @tap="onFloatButton()" class="plus">回答</view>
	</view>
</template>

<script>
const moment = require('moment')
import uParse from '../../common/gaoyia-parse/parse'
import SsxHeader from './ssx-header'
import SsxNoData from './ssx-no-data'
import SsxFixButton from './ssx-fix-button'
import slFilter from './sl-filter.vue'
import {getQuestion, addQaViewCnt, getQaLikeInfo, postQaLike, deleteQaLike, getQaFavoriteInfo, addToQaFavorite, removeFromQaFavorite} from '../../fetch/api.js'
import {getAnswer, getAnswerContent, deleteAnswer,getCurrentUserPhone,  reportQaAnswer, getAuthInfo, recommendAnswer} from '../../fetch/api.js'
export default {
	components: {
		uParse,
		SsxHeader,
		SsxNoData,
		SsxFixButton,
		slFilter
	},
	data() {
		return {
			// 加载层
			loading: false,
			// 话题ID
			topicId: null,
			topic: {
				"title": "",
				"userPhone": "",
				"userName": "",
				"answerCnt": 0,
				"viewCnt": 0,
				"lastEditTime": 0,
				"content": "",
				"session": 0
			},
			likeState: null,
			favoriteState: null,
			hasLiked: null,
			hasDisLiked: null,
			userPhone: null,
			// 回复
			page: 1,
			limit: 10,
			answers: [],
			themeColor: '#000000',
			titleColor: '#666666',
			menuList: [
				{
					'title': '默认排序',
					'key': 'sort',
					'isSort': true,
					'reflexTitle': true,
					'detailList': [{
							'title': '默认排序',
							'value': 'default'
						},
						{
							'title': '热门发帖',
							'value': 'hot'
						}
					]
				}
			],
			currentListType: 'default',
			sortedAnswers: [],
			replyLikeInfo: null,
			role : ""
		}
	},
	methods: {
		onFloatButton() {
			uni.navigateTo({
				'url': './createAnswer?id=' + this.topicId
			})
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				'url': './createAnswer?id=' + this.topicId
			})
		},
		navigator(url) {
			uni.navigateTo({
				url
			});
		},
		result(value) {
			console.log(value.sort)
			this.currentListType = value.sort
			if(this.changeListType = 'hot') {
				this.sortedAnswers = JSON.parse(JSON.stringify(this.answers))
				this.sortedAnswers.sort((a,b)=>{
					var x = a.viewCnt
					var y = b.viewCnt
					if(x>y) return -1;
					else if(x<y) return 1;
					else return 0;
				})
				console.log(this.sortedAnswers)
			}
		},
		// 获取话题详情
		async handleGetQaDetail(id) {
			console.log(id)
			var topic = await getQuestion(id);
			this.topic = topic.data;
			console.log(this.topic)
			this.topic.lastEditTime = moment(this.topic.lastEditTime * 1000).format('YYYY-MM-DD HH:mm:ss')
		},
		async handleGetAnswer() {
			const params = {
				'pageSize' : this.limit,
				'pageNo' : this.page
			}
			//console.log(id,params)
			var answers = await getAnswer(this.topicId, params)
			this.answers = answers.data.qas
			for(var r in this.answers) {
				this.answers[r].lastEditTime = moment(this.answers[r].lastEditTime * 1000).format('YYYY-MM-DD HH:mm:ss')
			}
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
		async getCurrentUser() {
			var userInfo = await getCurrentUserPhone()
			console.log("user INFO: ")
			console.log(userInfo)
			this.userPhone = userInfo.user_phone
			console.log(this.userPhone)
		},
		async LoadFavoriteInfo() {
			const params = {
				"userPhone" : this.userPhone.toString(),
			};
			var favoriteState = await getQaFavoriteInfo(this.topicId, params)
			this.favoriteState = favoriteState.data
			console.log(this.favoriteState)
		},
		async signalLike(replyId) {
			const params = {
				"userPhone" : this.userPhone.toString(),
				"like" : 1
			};
			await postQaLike(replyId, params)
		},
		async signalDislike(replyId) {
			const params = {
				"userPhone" : this.userPhone.toString(),
				"like" : 0
			};
			await postQaLike(replyId, params)
		},		
		async signalClear(replyId) {
			const params = {
				"userPhone" : this.userPhone.toString(),
			};
			await deleteQaLike(replyId, params)
		},
		async tapReplyLike(replyId) {
			await this.signalClear(replyId)
			if (this.replyLikeInfo.likes.indexOf(replyId) == -1)
				await this.signalLike(replyId)
			this.loadReplyLikeInfo()
			this.handleGetQaDetail(this.topicId)
			this.handleGetAnswer()
		},
		async tapReplyDislike(replyId) {
			await this.signalClear(replyId)
			if (this.replyLikeInfo.disLikes.indexOf(replyId) == -1)
				await this.signalDislike(replyId)
			this.loadReplyLikeInfo()
			this.handleGetQaDetail(this.topicId)
			this.handleGetAnswer()
		},
		async changeFavoriteState() {
			console.log('change favorite')
			const params = {
				"userPhone" : this.userPhone,
			};
			if (!this.favoriteState) {
				console.log('add favorite')
				await addToQaFavorite(this.topicId, params)
			}
			else {
				console.log('remove favorite')
				await removeFromQaFavorite(this.topicId, params)				
			}
			this.LoadFavoriteInfo()
		},
		async removeReply(answerId) {
			await deleteAnswer(answerId)
			this.handleGetAnswer()
		},
		async reportReply(answerId) {
			console.log(answerId)
			await reportQaAnswer(answerId)
			this.$util.toast('举报成功')
		},
		async loadReplyLikeInfo() {
			const params = {
				"userPhone" : this.userPhone,
				"pageSize" : 2147483647,
				"pageNo" : 1
			}
			var replyLikeInfo = await getQaLikeInfo(this.topicId, params)
			this.replyLikeInfo = replyLikeInfo.data
			console.log(this.replyLikeInfo)
		},
		async loadAuthInfo() {
			var authInfo = await getAuthInfo()
			this.role = authInfo
		},
		async recommandReply(answerId) {
			await recommendAnswer(answerId)
			this.$util.toast('推荐成功')
		}
	},
	async onLoad(params) {
		console.log(params)
		if (params.id) {
			this.topicId = params.id
			console.log('Loading ' + this.topicId)
			await this.getCurrentUser()
			await addQaViewCnt(this.topicId)
			await this.handleGetQaDetail(this.topicId)
			await this.handleGetAnswer()
			this.loadReplyLikeInfo()
			this.loadAuthInfo()
			await this.LoadFavoriteInfo()
		}
	}
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
		width: 440rpx;
		height: 40rpx;
		padding: 20rpx;
		// margin-left: auto;
		margin-right: auto;
		
		.info-cnt {
			height: 40rpx;
			width: 50rpx;
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
			padding: 20rpx;
			.reply {
				padding: 25rpx 0 0;
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
				.reply-finfo {
					font-size: 12px;
					color: #838383;
				}
			}
		}
	}
}
</style>
