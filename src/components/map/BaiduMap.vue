<template>
	<div class="baidumap">
		<div id="allmap" v-bind:style="mapStyle"></div>
		<map-search></map-search>
		{{this.$store.state.point.lng}},{{this.$store.state.point.lat}}<br/>
		{{point.lng}},{{point.lat}}
	</div>	
</template>
<script type="text/javascript">
	import MapSearch from './MapSearch.vue'
	export default{
		components:{
			'mapSearch': MapSearch
		},
		data:function(){
			return{
				mapStyle:{
					width:'100%',
					height:this.mapHeight +'px'
				},
			}
		},
		computed: {
		    point () {
		      return this.$store.state.point
		    },
		    serverurl(){
		    	return this.$store.state.serverurl
		    }
		},
		props:{
			// 地图在该视图上的高度
			mapHeight:{
				type:Number,
				default:400
			},
		},
		mounted:function(){
			var _self = this;
			var map =new BMap.Map("allmap");
			console.log(this.point);
			var point = new BMap.Point(123.234,23.4345);
			var marker =new BMap.Marker(point);
			map.addOverlay(marker);
			map.centerAndZoom(point,19);
			_self.$store.dispatch('updateMap',map);
			_self.$watch('point', function (newVal, oldVal) {
  				//重新设置地图中心
  				let marker =new BMap.Marker(point);
  				map.centerAndZoom(newVal,19);
  				map.addOverlay(marker);
  				_self.axios.get(_self.serverurl+'renthouse/commdata',{
  					params:{
  						lat:_self.point.lat,
  						lng:_self.point.lng,
  						distance:1
  					}
  				}).then((response) => {
  					console.log(response.data)
				})
			})
		},
		
	}
</script>

<style scoped>
	.baidumap{
		position: relative;
	}
</style>