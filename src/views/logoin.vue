<template>
  <div class="logoin">
    <div class="logoin-content">
      <el-form :model="logoinForm" :rules="rules" ref="logoinForm">
        <el-form-item label="用户名："  prop="username">
          <el-input v-model="logoinForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码："  prop="password">
          <el-input type="password" v-model="logoinForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogoin('logoinForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {URL} from '@/libs/base.js'
//exprot default暴露的 可以使用对象接受  import base from '@/libs/base.js'
//console.log(base);
// console.log(URL);

import axios from 'axios'
export default {
  name: 'logoin',
  data(){
    return{
      logoinForm:{
        username:'',
        password:''
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
      }
    }
  },
  methods:{
    handleLogoin(){
      this.$refs.logoinForm.validate((valid) => {
        if (valid) {
          /*
            跨域
            1.代理
            2.服务器端允许
            3.jsonp
          */
          // let url = 'http://localhost/thinkphp/public/index.php'
          axios.post(URL+'/admin/login/check',this.logoinForm).then((res)=>{
            // console.log(res);
            if(res.status==200&&res.data.code==200){
              sessionStorage.setItem('token',res.data.token);

              let redirect = this.$route.query.redirect || 'index';
              this.$router.push({name:redirect});
              // this.$router.push({name:"index"});
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch((error)=>{
            console.log(error);
          })
          // this.$router.push('/');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components: {
    // HelloWorld
  }
}
</script>

<style scoped>
  .logoin{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(./timg.jpg);
  }
  .logoin > .logoin-content{
    padding: 20px;
    width: 400px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* border: 1px solid #000; */
    background: #fff;
    box-shadow: 5px 5px 10px #f5f5f5;
    border-radius: 10px;
  }
</style>