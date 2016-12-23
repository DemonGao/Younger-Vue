<template>
	<div>
		{{name}}
		<div id="r-result">
			<input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
		</div>
		<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			name:{
				type:Number
			}
		},
		mounted:function(){
			console.log("mounted");
			
		}
	}
	// console.log(this.$store.state.map);
</script>