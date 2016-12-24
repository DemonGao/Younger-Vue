var MapUtil = (function(){
	var map;
	/*
	*method:地图初始化
	*args:
	*	id:   容器id 		 String类型
	*	point:坐标点(经纬度) object类型	
	*/
	function init(id,point,opts){
		map = new BMap.Map(id);
		var point =new BMap.Point(point.lon,point.lat);
		var marker =new BMap.Marker(point);
		map.addOverlay(marker);	//设置当前点的标注
		map.centerAndZoom(point,18);//设置地图缩放级别

		var	hasAutocomplete = typeof(opts.Autocomplete)==='undefined'?false : opts.Autocomplete; 
		if(hasAutocomplete!=false){
			Autocomplete(opts.Autocomplete);
			
		}else{
			console.log("no Autocomplete");
		}
	}
	function Autocomplete(opts){

		var el = document.getElementById(opts.el);//获取搜索下拉框容器
		//建立一个自动完成的对象
		var ac = new BMap.Autocomplete(opts.data);
		ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
			var str = "";
			var _value = e.fromitem.value;
			var value = "";
			if (e.fromitem.index > -1) {
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
			
			value = "";
			if (e.toitem.index > -1) {
				_value = e.toitem.value;
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
				}    
			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			el.innerHTML = str;
		});
		var myValue;
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			el.innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			setPlace();
			// console.log(_self.longitude,_self.latitude);
		});
		function setPlace(){
			map.clearOverlays();    //清除地图上所有覆盖物
			function myFun(){
				var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				// console.log(pp)
				// _self.longitude = pp.lng;
				// _self.latitude = pp.lat;
				map.centerAndZoom(pp, 18);
				map.addOverlay(new BMap.Marker(pp));    //添加标注
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
			  onSearchComplete: myFun
			});
			local.search(myValue);
		}	
	}
	function createMarker(opts){
		map.clearOverlays();    //清除地图上所有覆盖物

	}
	return {
		init:init,
	}
})();