<template>
	<div>
		<div id="allmap" v-bind:style="mapStyle"></div>
		<!-- <div id="r-result">请输入:<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" /></div>
		<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
		 -->
		<map-search></map-search>
	</div>	
</template>
<script type="text/javascript">
	import MapSearch from './MapSearch.vue'
	import Vue from 'vue'
	import axios from 'axios'
	import VueAxios from 'vue-axios'

	Vue.use(VueAxios, axios)
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
				point:{
					lon:116.404,
					lat:39.915
				}
			}
		},
		props:{
			// 地图在该视图上的高度
			mapHeight:{
				type:Number,
				default:400
			},
		// 经度
			longitude:{
				type:Number,
				default:116.404
			},
		// 纬度
			latitude:{
				type:Number,
				default:39.915
			},
			description:{
				type:String,
				default:'天安门'
			}
		},
		mounted:function(){
			MapUtil.init("allmap",this.point);
			Vue.axios.get(this.$store.state.serverurl+'renthouse/commdata/?lat=37.54150168038905&lng=121.32274115458121&distance=1').then((response) => {
				console.log(response.data)
			})
			// var map =new BMap.Map("allmap");
			// var point =new BMap.Point(this.longitude,this.latitude);
			// var marker =new BMap.Marker(point);
			// map.addOverlay(marker);
			// map.centerAndZoom(point,19);
			// // 信息窗的配置信息
			// var opts ={
			// 	width :250,
			// 	height:75,
			// 	title :"地址：",
			// }
			// var infoWindow =new BMap.InfoWindow(this.description, opts);// 创建信息窗口对象
			// marker.addEventListener("click",function(){
			// 	map.openInfoWindow(infoWindow,point);
			// });
			// map.enableScrollWheelZoom(true);
			// map.openInfoWindow(infoWindow,point);//开启信息窗口
			// var _self =this;
			// // 百度地图API功能
			// function G(id) {
			// 	return document.getElementById(id);
			// }

			// var map = new BMap.Map("allmap");
			// var point =new BMap.Point(this.longitude,this.latitude);
			// map.centerAndZoom(point,18);                   // 初始化地图,设置城市和地图级别。

			// var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			// 	{"input" : "suggestId"
			// 	,"location" : map
			// });

			// ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件

			// var str = "";
			// 	var _value = e.fromitem.value;
			// 	var value = "";
			// 	if (e.fromitem.index > -1) {
			// 		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			// 	}    
			// 	str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
				
			// 	value = "";
			// 	if (e.toitem.index > -1) {
			// 		_value = e.toitem.value;
			// 		value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			// 	}    
			// 	str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			// 	G("searchResultPanel").innerHTML = str;
			// });

			// var myValue;
			// ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
			// var _value = e.item.value;
			// 	myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			// 	G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			// 	setPlace();
			// 	console.log(_self.longitude,_self.latitude);
			// });

			// function setPlace(){
			// 	map.clearOverlays();    //清除地图上所有覆盖物
			// 	function myFun(){
			// 		var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			// 		_self.longitude = pp.lng;
			// 		_self.latitude = pp.lat;
			// 		map.centerAndZoom(pp, 18);
			// 		map.addOverlay(new BMap.Marker(pp));    //添加标注
			// 	}
			// 	var local = new BMap.LocalSearch(map, { //智能搜索
			// 	  onSearchComplete: myFun
			// 	});
			// 	local.search(myValue);
			// }
		}
	}
</script>

<style scoped>

</style>