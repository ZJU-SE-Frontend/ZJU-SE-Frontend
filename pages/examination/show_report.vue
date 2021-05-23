<template>
	<web-view src="https://www.4399.com">
	</web-view>
</template>

<script>
	import {fetchGet} from "@/fetch/api.js";
	export default {
		data() {
			return {
				appointId: 0
			}
		},
		methods: {
			onLoad: function(para){
				this.appointId = para.appointId
			}
		}
	}
</script>

<style>

</style>
