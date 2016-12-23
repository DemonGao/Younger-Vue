<template>
	<header id="header" class="navbar">
		<nav>
			<ul class="clearfix">
				<li>首页</li>
				<li class="right">
					<input type="search"  placeholder="请输入地址" />
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
	
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
</style>