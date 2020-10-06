<template>
  <div class="editpassword">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldpass">
            <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import {URL,SUCCESS} from '@/libs/base.js';

export default {
  name: 'Editpassword',
  data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldpass:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let url = URL + '/admin/info/editpassword';
            let token = sessionStorage.getItem('token');

            axios({
                url,
                method:'POST',
                data:this.ruleForm,
                headers:{
                    token:token
                }
            }).then(res=>{
                // console.log(res);
                if(res.status === 200 && res.data.code === SUCCESS){
                    this.$message.success(res.data.msg);
                    sessionStorage.clear();
                    this.$router.push('/logoin');
                }
            }).catch(()=>{
                this.$message.error("修改失败");
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  
}
</script>

<style scoped>
    .editpassword{
        width: 100%;
        height: 100%;
        background: #fff;
        box-shadow: 0 10px 10px #ccc;
        padding: 20px;
        box-sizing:border-box;
    }
</style>