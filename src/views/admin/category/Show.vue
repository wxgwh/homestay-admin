<template>
    <div class="show">
        <div class="showbox">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="分类名称">
                    <el-input v-model="search.cname" placeholder="分类名称"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-button @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="categories" stripe style="width: 100%">
                <el-table-column prop="cid" label="ID" width="180"></el-table-column>
                <el-table-column prop="cname" label="分类标题" width="180"></el-table-column>
                <el-table-column prop="cdesc" label="分类描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.cid)">删除</el-button>
                        <el-button size="mini" @click="handleEdit(scope.row.cid)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="block">
                <el-pagination background layout="total,prev, pager, next,jumper" :total="total" :page-size.sync="paginate.limit" :current-page.sync="paginate.page" @current-change="currentPage" :pager-count="7"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {URL,SUCCESS} from '@/libs/base.js'

export default {
    name:"Categoryshow",
    data() {
      return {
        search:{cname:''},
        paginate:{
            page:1,
            limit:5
        },
        categories:[],
        total:0
      }
    },
    methods:{
        initCategories(){
            let url = URL +'/admin/category/index';
            let token = sessionStorage.getItem('token');
            let params = Object.assign({},this.paginate,this.search);
            axios({
                url,params,
                method:'GET',
                headers:{token:token}
            }).then(res=>{
                // console.log(res);
                if(res.status === 200 && res.data.code === SUCCESS){
                    // this.$message.success(res.data.msg);
                    if(res.data.data){
                        this.categories=res.data.data;
                        this.total = res.data.count;
                    }else{
                        this.$message.info("还没有数据");
                    }
                }
            }).catch(()=>{
                this.$message.error("访问失败");
            })
        },
        currentPage(val){
            // alert(val);
            this.paginate.page=val;
            this.initCategories();
        },
        handleSearch(){
            this.paginate.page=1;
            this.initCategories();
        },
        handleDelete(cid){
            let url = URL + '/admin/category/delete';
            let token = sessionStorage.getItem('token');
            axios({
                method:'GET',
                params:{cid},
                url,
                headers:{
                    token
                }
            }).then(res=>{
                if(res.status === 200 && res.data.code === SUCCESS){
                    this.$message.success(res.data.msg);
                    this.initCategories();
                }
            }).catch(()=>{
                this.$message.error("删除失败");
            })
        },
        handleEdit(cid){
            // console.log(cid);
            this.$router.push({path:'/categoryedit',query:{cid}});
        }
    },
    mounted(){
        this.initCategories();
    }
}
</script>

<style scoped>

.show{
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 0 10px 10px #ccc;
    padding: 20px;
    box-sizing:border-box;
}
.showbox table tr{
    line-height: 20px;
}
.block{
    margin-top: 20px;
    float: right;
}
</style>