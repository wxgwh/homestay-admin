<template>
  <div class="homestay">
    <loading :isshow="showLoading"></loading>
    <el-form :model="homestayform" ref="homestayform">
      <el-form-item label="所属分类">
        <el-select v-model="homestayform.cid" placeholder="请选择分类">
          <el-option v-for="item in categorys" :key="item.cid" :label="item.cname" :value="item.cid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民宿名称">
        <el-input v-model="homestayform.sname"></el-input>
      </el-form-item>
      <el-form-item label="民俗描述">
        <el-input type="textarea" v-model="homestayform.sdesc"></el-input>
      </el-form-item>
      <el-form-item label="民宿标签">
        <el-input v-model="homestayform.stag"></el-input>
      </el-form-item>
      <el-form-item label="民宿评分">
        <el-input v-model="homestayform.score"></el-input>
      </el-form-item>
      <el-form-item label="民宿价格">
        <el-input v-model="homestayform.sprice"></el-input>
      </el-form-item>
      <el-form-item label="民宿所在省份">
        <el-select v-model="homestayform.sprovince" placeholder="请选择省份">
          <el-option v-for="(item,index) in province" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民宿所在城市">
        <el-select v-model="homestayform.scity" placeholder="请选择城市">
          <el-option v-for="(item,index) in cityList" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民宿所在区域">
        <el-select v-model="homestayform.sarea" placeholder="请选择城市">
          <el-option v-for="(item,index) in areaList" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民宿详细地址">
        <el-input v-model="homestayform.saddress"></el-input>
      </el-form-item>
      <el-form-item label="民宿缩略图"></el-form-item>
      <el-form-item>
        <el-upload class="avatar-uploader" :action="uploadurl" :show-file-list="false" :on-success="handleThumbSuccess" :before-upload="handlebeforeUpload">
          <img v-if="homestayform.sthumb" :src="IMGURL+homestayform.sthumb" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过1MB，最佳尺寸比例 1:1</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="民宿轮播图"></el-form-item>
      <el-form-item>
        <el-upload class="avatar-uploader" :action="uploadurl" :on-success="handleBannerSuccess" list-type="picture-card"  multiple :limit="5" :on-remove="handleBannerRemove" :on-preview="handleBannerPreview"   :on-exceed="handleExceed">
           <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过1MB，最佳尺寸比例 1:1，最多五张</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="民宿详情"></el-form-item>
      <el-form-item>
        <!-- <div id="sdetail" ref="sdetail"></div> -->
        <rich-text formfield="sdetail" @rich-change="setSontice"></rich-text>
      </el-form-item>
      <el-form-item label="入住须知">
        <!-- <el-input v-model="homestayform.snotice"></el-input> -->
      </el-form-item>
      <el-form-item>
        <rich-text :menus="['head', 'bold','fontSize','fontName', 'underline', 'strikeThrough']" formfield="snotice" @rich-change="setSontice"></rich-text>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
// import axios from 'axios';
import {SUCCESS,URL,IMGURL} from '@/libs/base.js';
import loading from '@/components/loading/Loading.vue'
import instance from '@/http/http.js'
import RichText from '@/components/richtext/RichText.vue'
import {homestaySave} from '@/http/homestay.js'
// import E from 'wangeditor'

import city from '@/libs/city.json'

export default {
  name: 'Homestayadd',
  components:{
    loading,
    RichText
  },
  data(){
    return{
      IMGURL,
      uploadurl: URL+'/admin/upload/index',
      showLoading:false,
      categorys:[],
      homestayform:{
        sname:'',
        sdesc:'',
        sthumb:'',
        sprice:'',
        stag:'',
        sprovince:'',
        scity:'',
        sarea:'',
        saddress:'',
        sbanner:'',
        snotice:'',
        sdetail:'',
        cid:'',
        score:''
      },
      bannerArr:[],
      dialogImageUrl: '',
      dialogVisible: false,
      city,
      province:[],
      // cityList:[]
    }
  },
  computed:{
    //获取省份的城市
    cityList(){
      //  return 1;
      let cityList = [];
      let current = this.city.find(ele=>ele.name == this.homestayform.sprovince);
      if(current){
        cityList = current.city.map(ele=>ele.name);
      }
      return cityList;
    },
    //获取城市的地区
    areaList(){
      let areaList = [];
      let current = this.city.find(ele=>ele.name == this.homestayform.sprovince);
      if(current){
        let result = current.city.find(ele=>ele.name == this.homestayform.scity);
        if(result){
          areaList = result.area;
        }
      }
      return areaList;
    }
  },
  methods:{
    initCategory(){
      this.showLoading=true;
      instance('admin/category/indexall').then(res=>{
        this.showLoading=false;
        if(res.code===SUCCESS){
          this.categorys = res.data;
        }
      }).catch(()=>{})
    },

    handleThumbSuccess(res){
      if(res.code === SUCCESS){
        this.homestayform.sthumb=res.imgpath;
      }
    },

    handlebeforeUpload(file){
      let {type,size} = file;
      let uploadMaxSize=1000*1024;
      let uploadType=['image/jpeg','image/jpg','image/png','imagr/webp'];
      let sizeflag=true,typeflag=true;
      sizeflag=size<uploadMaxSize;
      typeflag=uploadType.some(ele=>ele==type);
      if (!typeflag) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/PNG/WEBP 格式!');
        }
        if (!sizeflag) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
      // console.log(file);
      return sizeflag && typeflag;
    },
    //轮播图上传
    handleBannerSuccess(res){
      // console.log(res);
      this.bannerArr.push(res.imgpath);
      this.homestayform.sbanner=this.bannerArr.join(',');
    },
    //轮播图的删除
    handleBannerRemove(file){
      let url = file.response.imgpath;
      this.bannerArr = this.bannerArr.filter(ele=>ele!=url);
      this.homestayform.sbanner=this.bannerArr.join(',');
    },
    //轮播图的预览
    handleBannerPreview(file){
      // console.log(file);
      let url = this.IMGURL + file.response.imgpath;
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    // initRichText(){
    //   // console.log(this.uploadurl);
    //   let that = this;
    //   let edit = new E(this.$refs.sdetail);
    //   edit.customConfig.menus = [
    //     'head',  // 标题
    //     'bold',  // 粗体
    //     'fontSize',  // 字号
    //     'fontName',  // 字体
    //     'italic',  // 斜体
    //     'underline',  // 下划线
    //     'strikeThrough',  // 删除线
    //     'foreColor',  // 文字颜色
    //     'backColor',  // 背景颜色
    //     'link',  // 插入链接
    //     'list',  // 列表
    //     'justify',  // 对齐方式
    //     'quote',  // 引用
    //     'emoticon',  // 表情
    //     'image',  // 插入图片
    //     // 'video',  // 插入视频
    //     'table',  // 表格
    //     'code',  // 插入代码
    //     'undo',  // 撤销
    //     'redo'  // 重复
    // ]
    //   // edit.create();
    //   // 隐藏“网络图片”tab
    //   edit.customConfig.showLinkImg = false;
    //   // edit.customConfig.uploadImgShowBase64 = true;
    //   // 配置服务器端地址
    //   edit.customConfig.uploadImgServer = this.uploadurl;
    //   //设置图片的名字
    //   edit.customConfig.uploadFileName = "file";
    //   edit.customConfig.onchange = (html) =>{
    //     this.homestayform.sdetail = html;
    //   }
    //   //监听图片上传的函数
    //   edit.customConfig.uploadImgHooks = {
    //     //result必须是json格式
    //     customInsert:function(insertImg,result){
    //       insertImg(that.IMGURL + result.imgpath);
    //     }
    //   }
    //   edit.create();
    // },
    handleSubmit(){
      homestaySave(this.homestayform).then(res=>{
        // this.categorys=res.data;
        // alert(res.data.msg);
        // this.$message.success(res.data.msg);
        if(res.code == 300){
          this.$message.error(res.msg);
        }
        if(res.code == 200){
          this.$message.success(res.msg);
          setTimeout(()=>{
            this.$router.go(0);
          },1000)
        }
        // location.reload();
      }).catch();
    },
    
    setSontice(filed,html){
    //父子组件通信
      this.homestayform[filed] = html;
    },

    //获取city数组中的省份
    setProvince(){
      this.province = this.city.map(ele=>ele.name);
    },
   
    // testAxios(){
    //   instance.get('admin/category/indexall').then(res=>{
    //     console.log(res);
    //   })
    // }
  },
  mounted(){
    this.initCategory();
    // this.testAxios();
    // this.initRichText();

    this.setProvince();
  }
}
</script>

<style scoped>
   .homestay{
      position:absolute;
      top:0;
      left:0;
      width: 100%;
      height:100%;
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;
      /* background: #fff;
      box-shadow: 0 10px 10px #ccc; */
   }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>