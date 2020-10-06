<template>
  <el-container class="main-box">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
  <el-header>
    <div class="logo">
      <img src="../../resources/image/logo.jpg" alt="">
      <span class="animate__animated animate__zoomInDown">XXX后台管理</span>
    </div>
    <div class="header-nav">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">数据可视化</el-menu-item>
        <el-submenu index="2">
          <template slot="title">个人设置</template>
          <router-link to="/editpassword">
            <el-menu-item index="2-1">修改密码</el-menu-item>
          </router-link>
          <el-menu-item index="2-2">信息管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-row class="tac">
        <el-col >
          <el-menu default-active="2" class="el-menu-vertical-demo" >
            <el-menu-item index="3">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>分类管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/categoryadd">
                  <el-menu-item index="4-1">
                    分类添加
                  </el-menu-item>
                </router-link>
                <router-link to="/categoryshow">
                  <el-menu-item index="4-2">分类管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>民宿管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/homestayadd">
                  <el-menu-item index="5-1">
                    民宿添加
                  </el-menu-item>
                </router-link>
                <router-link to="/homestayindex">
                  <el-menu-item index="5-2">民宿查看</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Main',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>


<style scoped>
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
    display: flex;
    justify-content: space-between;
    height: 100px !important;
  }
  .el-footer{
    height: 40px !important;
  }
  
  .main-box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* height: 100%; */
  }
  .el-aside {
    background-color: #fdfdfd;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    position: relative;
    /* text-align: center;
    line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .logo{
    width: auto;
    height: 100px;
    z-index: 1;
  }
  .logo span{
    /* text-align: center; */
    display: inline-block;
    height: 100px;
    line-height: 100px;
    position: absolute;
    top: 0;
    padding-left: 40px;
    color: #409EFF;
    font-size: 32px;
    letter-spacing: 10px;
    -webkit-user-select:none;user-select:none;
  }
  .logo img{
    width: 100px;
    height: 100px;
  }
  .header-nav{
    width: auto;
    height: 100%;
    /* background: #000; */
  }
  .el-menu-demo{
    margin-top: 40px;
    box-sizing: border-box;
  }
</style>