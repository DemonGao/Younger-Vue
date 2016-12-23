<template>
  <div class="home">
  	<baidu-map :mapHeight = "500"></baidu-map>
  </div>
</template>

<script>
	import BaiduMap from './map/BaiduMap'
	export default{
		components:{
			'baiduMap':BaiduMap
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
