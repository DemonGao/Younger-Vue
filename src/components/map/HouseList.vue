<template>
	<div class="houselist">
		<!-- <h1>小区详情</h1> -->
		<ul class="house-list">
			<li class="house-item clearfix" v-for="item in items">
				<a href="javascript:;" @click="gotourl(item.url)">
					<div class="house-conten-left">
						<img :src="item.pic_url"/>
					</div>
					<div class="house-conten-right">
						<h2>{{item.title}}</h2>
						<!-- <div class="house-item-tag tag">
							<span>空调</span>
							<span>洗衣机</span>
						</div> -->
						<div class="house-item-detalis clearfix">
							<p class="house-item-rentway fl">{{item.rentway}}</p>
							<p class="house-item-price fr">
								{{item.price}}
								<span v-if="item.price!='面议'">元</span>
							</p>
						</div>
						
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				items:[]
			}
		},
		computed: {
		    id () {
		      return this.$route.params.id
		    },
		    serverurl(){
		    	return this.$store.state.serverurl
		    }
		},
		methods: {
			gotourl(url){
				
				window.location.href = url;
			}
		},
		mounted:function(){
			var _self = this;
			// http://123.206.64.165:8000/renthouse/data?commid=818&format=json
			this.axios.get(this.serverurl+'renthouse/data',{
  				params:{
  					commid:this.id,
  					format:"json",
  					page:1
  				}
  			}).then((response) => {
  				console.log(response.data)
  				// MapUtils.createMarker(map,response.data,_self);
  				this.items = response.data.results;//将查询出来的数据赋值给items
			})
		}
	}
</script>
<style scoped>
	.houselist{
		position: absolute;
		width: 100%;
		/*top: 75px;*/
	}
	.house-list{
		list-style:none;
	}
	.house-list .house-item{
		
		box-sizing: border-box;
		height: 100px;
		padding: 10px; 
		border:1px solid #ccc;
	}
	.house-list .house-item>a{
		text-decoration: none;
	}
	.house-list .house-item .house-conten-left{
		float: left;
		width: 100px;
		height: 100%;
	}
	.house-list .house-item .house-conten-left img{
		width: 100%;
		height: 100%;
	}
	.house-list .house-item .house-conten-right{
		position: relative;
		height: 100%;
		margin-left: 110px;
	}
	
	.house-list .house-item .house-conten-right h2{
		color: #000;
		font-size: 14px;
		font-weight: bold;
	}
	.house-list .house-item-tag{
		margin-top: 5px;
	}
	.tag span{
		font-size: 12px;
		background-color: #FFFCCA;
		color: #000;
		padding: 2px 10px;
		border-radius: 5px;
	}
	.house-list .house-item-detalis{
		position: absolute;
		width: 100%;
		bottom: 0;
	}
	.house-list .house-item-detalis .house-item-rentway{
		font-size: 12px;
		color: #999;
	}
	.house-list .house-item-detalis .house-item-price{
		font-size: 12px;
		color: orange;
	}
	.house-list .house-item-detalis .house-item-price span{
		font-size: 12px;
	}
</style>