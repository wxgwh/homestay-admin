<template>
    <div id="edit" ref="edit"></div>    
</template>

<script>
import E from 'wangeditor';
import {URL,IMGURL} from '@/libs/base.js';

export default {
    name:"RichText",
    props:{
        menus:{
            type:Array,
            default:function(){
                return [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    // 'video',  // 插入视频
                    'table',  // 表格
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复]
                ]
            }
        },
        value:{
            type:String,
            default:""
        },
        formfield:{
            required:true,
            type:String
        }
    },
    data(){
        return{
            IMGURL,
            uploadurl:URL+'/admin/upload/index'
        }
    },
    methods:{
        initRichText(){
            let that = this;
            // console.log(this.uploadurl);
            let edit = new E(this.$refs.edit);

            //配置菜单
            edit.customConfig.menus = this.menus;
            // 隐藏“网络图片”tab
            edit.customConfig.showLinkImg = false;
            // edit.customConfig.uploadImgShowBase64 = true;
            // 配置服务器端地址
            edit.customConfig.uploadImgServer = this.uploadurl;
            //设置图片的名字
            edit.customConfig.uploadFileName = "file";
            //默认限制图片大小 3M
            edit.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
            //获取内容
            edit.customConfig.onchange = (html) =>{
                // this.homestayform.sdetail = html;
                this.$emit('rich-change', this.formfield,html);
            }
            //监听图片上传的函数
            edit.customConfig.uploadImgHooks = {
             //result必须是json格式
                customInsert:function(insertImg,result){
                    insertImg(that.IMGURL + result.imgpath);
                }
            }
            edit.create();
            this.value && edit.txt.html(this.value);
        }
    },
    mounted(){
        this.initRichText();
    }
}
</script>

<style scoped>

</style>

