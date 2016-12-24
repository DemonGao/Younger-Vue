<template>
  <div id="app">
    <navbar></navbar>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar'
export default{
  //注册组件
  components:{
    //对于自定义标签名，Vue.js 不强制要求遵循 W3C规则 （小写，并且包含一个短杠），尽管遵循这个规则比较好。
      'navbar':Navbar,
  }

}

</script>

<style scoped>
  .wrap{
    margin-top: 70px;
  }
</style>
