import instance from '@/http/http.js'
import {SUCCESS} from '@/libs/base.js';

function categorySave(){
    
}
function categoryIndex(){
    return new Promise((resolve,reject)=>{
        instance('admin/category/indexall').then(res=>{
            this.showLoading=false;
            if(res.code===SUCCESS){
            //   this.categorys = res.data;
                resolve(res);
            }
          }).catch(error=>{
              reject(error);
          })
        })
}
function categoryUplate(){
    
}
function categoryRead(){
    
}
function categoryDelete(){
    
}

export default{
    categorySave,
    categoryIndex,
    categoryUplate,
    categoryRead,
    categoryDelete
}