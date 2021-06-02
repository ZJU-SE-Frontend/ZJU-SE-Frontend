import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uerInfo: {},
		hasLogin: false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.uerInfo.token = provider.token
			state.uerInfo.userName = provider.userName
			state.uerInfo.userEmail = provider.userEmail
			state.uerInfo.userIDNumber = provider.userIDNumber
			state.uerInfo.userPhone = provider.userPhone
			state.uerInfo.userHeight = provider.userHeight
			state.uerInfo.userWeight = provider.userWeight
			state.uerInfo.userGender = provider.userGender
			uni.setStorage({
				key: 'uerInfo',
				data: provider
			})
			console.log(provider)
			console.log(state.uerInfo)
		},
		logout(state) {
			state.hasLogin = false
			state.uerInfo = {}
			uni.removeStorage({
				key: 'uerInfo'
			});
		}
	}
})

export default store
