<template>
	<div class="baidumap">
		<div id="allmap" v-bind:style="mapStyle"></div>
		<map-search></map-search>
		lng:{{this.$store.state.point.lng}},lat:{{this.$store.state.point.lat}}<br/>
		lng:{{point.lng}},lat:{{point.lat}}
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
			var point = new BMap.Point(_self.point.lng,_self.point.lat);
			var marker =new BMap.Marker(point);
			map.addOverlay(marker);
			map.centerAndZoom(point,18);
			_self.$store.dispatch('updateMap',map);
			_self.$watch('point', function (newVal, oldVal) {
  				//重新设置地图中心
  				map.clearOverlays();    //清除地图上所有覆盖物
  				point = new BMap.Point(_self.point.lng,_self.point.lat);
  				marker =new BMap.Marker(point);
  				map.centerAndZoom(point,16);
  				map.addOverlay(marker);
  				_self.axios.get(_self.serverurl+'renthouse/commdata',{
  					params:{
  						lat:_self.point.lat,
  						lng:_self.point.lng,
  						distance:1
  					}
  				}).then((response) => {
  					// console.log(response.data)
  					MapUtils.createMarker(map,response.data);
				})
			})
		},
	}
	var MapUtils =(function(){
		
		function createMarker(map,data){
			
			// console.log(map);
			// console.log(typeof(data))

			data.forEach(function(value){
				console.log(value);
				var sContent =
				"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+value.city+'市' + value.zone+'区' +value.street+'街道' + value.comm+"小区</h4>"+
				"<button >进入小区"+value.id+"</button>";

				var point = new BMap.Point(value.lng,value.lat);
  				var marker = new BMap.Marker(point);

  				var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
  				map.addOverlay(marker);
  				marker.addEventListener("click", function(){          
				   this.openInfoWindow(infoWindow);
				   //图片加载完毕重绘infowindow
				   document.getElementById('imgDemo').onload = function (){
					   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
				   }
				});
			})
			// return value
		}
		return {
			createMarker:createMarker
		}
	})()
	
</script>

<style scoped>
	.baidumap{
		position: relative;
	}
</style>