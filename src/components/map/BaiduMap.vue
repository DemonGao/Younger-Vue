<template>
	<div class="baidumap">
		<div id="allmap" v-bind:style="mapStyle" ></div>
		<!-- <map-search></map-search> -->
	<!-- 	lng:{{this.$store.state.point.lng}},lat:{{this.$store.state.point.lat}}<br/>
		lng:{{point.lng}},lat:{{point.lat}} -->
		<mt-popup 
			v-model="popup"
			pop-transition="popup-fade"
		>
			<div class="marker_info">
				<blockquote>
					<div class="info_head clearfix">
						<svg class="icon info_head_icon" style="" aria-hidden="true">
						  <use xlink:href="#icon-icon-test"></use>
						</svg>
						<h1>小区信息</h1>
					</div>
					<div class="info_content clearfix">
						<p>
							<i class="iconfont icon-shouhuodizhi01"></i>
							<span>{{renthouse.zone}} {{renthouse.street}}街道 {{renthouse.comm}}小区</span>
						</p>
						<div class="lookdetails">
							<router-link :to="{name:'houselist',params:{id:renthouse.id}}" tag="div" class="lookdetails">
								点击查看小区详情
								<svg class="icon" aria-hidden="true">
							  		<use xlink:href="#icon-App-chakanxiangqing"></use>
								</svg>
							</router-link>
						</div>					
					</div>
				</blockquote>
			</div>
		</mt-popup>
	</div>	
</template>
<style type="text/css" scope="scope">
	.mint-popup{
		background: transparent;
	}
	.marker_info{
		position: relative;
		width:300px;
		/*height:140px;*/
		/*padding: 0 1.5em;*/
		border-radius: .5em;
		background: linear-gradient(-150deg,transparent 1.5em,rgba(255,252,202,1) 0);
	}
	.marker_info::before{
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		background: linear-gradient(to left bottom,transparent 50%,rgba(255,255,255,.3) 0) 100% 0 no-repeat;
		width: 1.73em;
		height: 3em;
		transform: translateY(-1.3em) rotate(-30deg);
		transform-origin: bottom right;
		border-bottom-left-radius: inherit;
		box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15)
	}
	.info_head{
		/*position: relative;*/
		font-size: 20px;
		padding: 10px;
		color: #537780;
		overflow: hidden;
	}
	.info_head h1{
		float: left;
		height: 35px;
		line-height: 40px;
		margin-left: -35px;
		padding-left: 35px;

	}
	.info_head .info_head_icon{
		float: left;
		height:35px;
		width:35px;
	}
	.info_content{
		padding: 10px 20px;
		font-size: 12px;
		color: #537780;
	}
	.info_content .lookdetails{
		margin-top: 20px;
		float: right;
		line-height: 20px;
	}
	.info_content .lookdetails:hover{
		cursor: pointer;
	}
	.info_content .lookdetails svg{
		height:20px;
		width:20px;
		vertical-align: top;
	}
</style>
<script type="text/javascript">
	// import MapSearch from './MapSearch.vue'
	export default{
		// components:{
		// 	'mapSearch': MapSearch
		// },
		data:function(){
			return{
				mapStyle:{
					width:'100%',
					height:this.mapHeight +'px'
				},
				renthouse:{},
				popup:false
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
  					MapUtils.createMarker(map,response.data,_self);
				})
			})
		},
	}
	var MapUtils =(function(){
		/*
			创建标注,并设置信息窗口
			map:地图
			data:坐标数据
			_self: vue 用来设置信息窗口 id
		*/
		function createMarker(map,data,_self){
			data.forEach(function(value){
				// console.log(value);
				_self.id = value.id;
				var point = new BMap.Point(value.lng,value.lat);
  				var marker = new BMap.Marker(point);
  				map.addOverlay(marker);
  				marker.addEventListener("click", function(){          

				   _self.popup=true;
				   _self.renthouse=value;
				   map.centerAndZoom(new BMap.Point(value.lng,value.lat),17);
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