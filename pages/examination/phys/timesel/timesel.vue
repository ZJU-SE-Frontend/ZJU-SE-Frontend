<template>
	<view>
	<uni-list>
			<uni-list-item show-badge="true" badge-text="99" showArrow  title="8:00" link=""  @click="onClick"/>
			<uni-list-item disabled="true" show-badge="true" badge-text="0"  showArrow title="8:30" />
		</uni-list>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		
		data() {
			return {
				
			}
		},
		methods: {
			onClick(e) {
				uni.navigateTo({
					url: "../confirm/confirm"
				})
			},
			
		}
	}
</script>

<style>

</style>
