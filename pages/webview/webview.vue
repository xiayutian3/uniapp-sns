<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weburl:''
			}
		},
		onLoad(options){
			//接受傳遞過來的url  解碼url
			this.weburl = decodeURI(options.url) 
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
