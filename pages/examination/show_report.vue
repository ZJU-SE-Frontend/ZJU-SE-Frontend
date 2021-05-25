<template>
	<web-view src="url">
	</web-view>
</template>

<script>
	import {fetchGet} from "@/fetch/api.js";
	export default {
		data() {
			return {
				appointId: 0,
				res: '',
				base_url : '/hybrid/html/web/viewer.html',
				file_url : '',
				url: ''
			}
		},
		methods: {
			onLoad(para){
				this.url = `${this.base_url}?file=${encodeURIComponent(this.file_url)}`;
				this.url = `${this.base_url}`;
			}
			
		}
	}
</script>

<style>

</style>
