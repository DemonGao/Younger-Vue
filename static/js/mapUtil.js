var MapUtil = (function(){
	var map;
	/*
	*method:地图初始化
	*args:
	*	id:   容器id 		 String类型
	*	point:坐标点(经纬度) object类型	
	*/
	function init(id,point){
		map = new BMap.Map(id);
		var point =new BMap.Point(point.lon,point.lat);
		var marker =new BMap.Marker(point);
		map.addOverlay(marker);
		map.centerAndZoom(point,18);
	}
	function createMarker(opts){
		map.clearOverlays();    //清除地图上所有覆盖物			
		
	}
	return {
		init:init,
	}
})();