<template>
  <div class="add">
    <div class="addbox">
        <el-form :model="category" :rules="categoryRules" ref="categoryform">
        <el-form-item label="分类名称" prop="cname">
            <el-input v-model="category.cname" placeholder="请输入分类名称（2-6位汉字/字母/数字）"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="cdesc">
            <el-input v-model="category.cdesc" placeholder="请输入分类描述（长度在3到10个字符）"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import {URL,SUCCESS} from '@/libs/base.js'



export default {
  name: 'Categoryadd',
  data(){
      let validateCname =(rule,value,callback)=>{
          if(value === ''){
              callback(new Error("分类名称不能空"));
          }else if(!(/[\u4e00-\u9fa5a-zA-Z0-9]{2,6}/.test(value))){
              callback(new Error("分类名称只能为2-6位汉字/字母/数字"));
          }else{
              callback();
          }
      }
      return {
          category:{
            cname:'',
            cdesc:''
          },
          categoryRules:{
            cname:[{validator:validateCname,trigger:'blur'}],
            cdesc:[
                {require:true,message:"请输入分类的描述",trigger:'blur'},
                {min:3,max:20,message:"长度在3到10个字符",trigger:'blur'}
            ]
          }
      }
    },
    methods:{
        handleSubmit(){
            this.$refs.categoryform.validate(valid=>{
                if(valid){
                    let url = URL + '/admin/category/add';
                    let token = sessionStorage.getItem('token');
                    axios({
                        url,
                        method:'POST',
                        data:this.category,
                        headers:{
                            token:token
                        }
                    }).then(res=>{
                        // console.log(res);
                        if(res.status === 200 && res.data.code === SUCCESS){
                            this.$message.success(res.data.msg);
                            this.category.cname='';
                            this.category.cdesc='';
                        }
                    }).catch(()=>{
                        this.$message.error("分类添加失败");
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    .add{
        width: 100%;
        height: 100%;
        background: #fff;
        box-shadow: 0 10px 10px #ccc;
        padding: 20px;
        box-sizing:border-box; 
    }
</style>