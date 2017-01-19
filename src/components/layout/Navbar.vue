<template>
	<header id="header" class="navbar">
		<nav>
			<ul class="clearfix">
				<li>首页</li>
				<li class="right">
					<map-search :mapStyle="mapStyle"></map-search>
				</li>
			</ul>
		</nav>
	</header>
	<!-- <mt-header title="Younger Home" :fixed="true">
		<router-link to="/" slot="left">
			<mt-button icon="back">返回</mt-button>
		</router-link>
		<mt-button icon="more" slot="right"></mt-button>
	</mt-header> -->
</template>

<script>
	import MapSearch from './../map/MapSearch.vue'
	export default{
		components:{
			'mapSearch': MapSearch
		},
		data(){
			return {
				mapStyle:{
					'width':'180px',
					'padding':'5px .5em'
				}
			}
		}
	}
</script>

<style scoped>
	#header{
		position: fixed;
		top: 0;
		box-shadow: 0 0	5px 3px #ccc;
		border-radius: 2px;
		width:100%;
		height: 70px;
		z-index: 9999;
		background-color: #eee;
		opacity: .8
	}
	#header nav{
		position: relative;
	    width: 80%;
	    margin: 0 auto;
	}
	#header nav ul li{
		box-sizing: border-box;
		float: left;
		height: 70px;
		line-height: 70px;
		margin: 0 20px;
	}
	#header nav ul li.right{
		float: right;
	}
	@media (max-width:768px){
		#header nav{
			width: 95%;
		}
		#header nav ul li{
			margin:0 5px;
		}
	}
</style>