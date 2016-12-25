<template>
	<div class="mapsearch">
		
		<div id="r-result">
			{{map}} <input type="text" :id="inputid" size="20" placeholder="请输入地址" style="width:150px;" />
		</div>
		<div :id="resultPanelid" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				inputid:"suggestId",
				resultPanelid:"searchResultPanel"
			}
		},
		props:{
			name:{
				type:String,
				default:"搜索栏"
			},
			map:{
				//父组件map
				type:Object,
				// default:new BMap.Map("allmap")
			}
		},
		mounted:function(){
			var _self = this;
			//建立一个自动完成的对象
			var ac = new BMap.Autocomplete(    
				{
					"input" : _self.inputid,
					"location" : "Map"
				}
			);
			//鼠标放在下拉列表上的事件
			ac.addEventListener("onhighlight", function(e) {  
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
				document.getElementById(_self.resultPanelid).innerHTML = str;
			});
			var myValue;
			ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
			var _value = e.item.value;
				myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
				document.getElementById(_self.resultPanelid).innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
				setPlace();

			});

			function setPlace(){
				function myFun(){
					var pp = local.getResults().getPoi(0).point;
					var point = {
						lat:pp.lat,
						lng:pp.lng
					}
					_self.$store.dispatch('updatePoint',point)
				}
				var local = new BMap.LocalSearch("map", { //智能搜索
				  onSearchComplete: myFun
				});
				local.search(myValue);
			}
		}
	}
</script>
<style type="text/css" scoped>
	.mapsearch{
		position: absolute;
		top: 40px;
		left: 40px;
	}
</style>