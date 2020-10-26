<template>
    <div>
        <loading :isshow="isshow"></loading>
        <el-form inline :model="search">
            <el-form-item label="所属分类">
                <el-select v-model="search.cid" placeholder="请选择分类">
                    <el-option label="全部分类"></el-option>
                    <el-option v-for="item in categorys" :key="item.cid" :label="item.cname" :value="item.cid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿所在城市">
                <el-input v-model="search.scity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table :data=homestay>
            <el-table-column label="ID" prop="sid"></el-table-column>
            <el-table-column label="民宿名称" prop="sname"></el-table-column>
            <el-table-column label="民宿描述" prop="sdesc"></el-table-column>
            <el-table-column label="民宿价格" prop="sprice"></el-table-column>
            <el-table-column label="民宿特色">
                <template slot-scope="scope">
                    <el-button size="small" v-for="item in scope.row.stag.split(/,|，|、/)" :key="item">{{item}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="民宿地址">
                <template slot-scope="scope">
                    <span>{{scope.row.sprovince}}-{{scope.row.scity}}-{{scope.row.sarea}}</span>
                </template>
            </el-table-column>
            <el-table-column label="缩略图">
                <template slot-scope="scope">
                    <img v-for="item in scope" :key="item.sid" :src="item.sthumb" alt="" class="type_img">
                </template>
            </el-table-column>
            <el-table-column label="民宿创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.ctime|formateTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  type="info" size="small" class="operating" @click="handledelete(scope.row.sid)">删除</el-button>
                    <router-link :to="{name:'homestayedit',params:{id:scope.row.sid}}">
                        <el-button  type="primary" size="small" class="operating">
                            编辑
                        </el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>

         <div class="block">
                <el-pagination background layout="total,prev, pager, next,jumper" :total="total" :page-size.sync="paginate.limit" :current-page.sync="paginate.page" @current-change="currentPage" :pager-count="7"></el-pagination>
            </div>
    </div>
</template>

<script>
import {IMGURL , SUCCESS} from '@/libs/base.js';
import instance from '@/http/http.js';
import loading from '@/components/loading/Loading.vue';
import {homestayDelete} from '@/http/homestay.js';
// import categoryIndex from '@/http/category.js'
export default {
    name:"Homestayedit",
    data(){
        return{
            categorys:[],
            IMGURL,
            isshow:false,
            search:{sname:'',scity:'',cid:''},
            paginate:{limit:6,page:1},
            homestay:[],
            total:0
        }
    },
    components:{
        loading
    },
    methods:{
        initHomestay(){
            this.isshow=true;
            let params = Object.assign({},this.search,this.paginate);
            instance.get('/api/homestay',{
                params
            }).then(res=>{
                this.isshow=false;
                if(res.data){
                    let data= res.data;
                    data.map(ele=>{
                        ele.sthumb=IMGURL+ele.sthumb;
                        return ele;
                    })
                    this.homestay=res.data;
                    this.total=res.total;
                }else{
                    this.$message.success('暂无数据')
                }
                console.log(res);
            }).catch(()=>{

            })
        },
        initCategory(){
            this.isshow=false;
            this.showLoading=true;
            instance('admin/category/indexall').then(res=>{
                this.showLoading=false;
                if(res.code===SUCCESS){
                    this.categorys = res.data;
                }
            }).catch(()=>{})
        },
        handleSearch(){
            this.initHomestay();
        },
        currentPage(val){
            // alert(val);
            this.paginate.page=val;
            this.initHomestay();
        },
        handledelete(sid){
            homestayDelete(sid).then(res=>{
                if(res.code == 200){
                    this.$message.success('删除成功');
                    setTimeout(()=>{
                        this.$router.go(0);
                    },1000)
                }else{
                    this.$message.success(res.msg);
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    filters:{
        formateTime(value){
            let date=new Date(value*1000);
            let time = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
            return time;
        }
    },
    mounted(){
        this.initHomestay();
        this.initCategory();
    }  
}
</script>

<style scoped>
.type_img{
    width: auto;
    height: 60px;
}
.block{
    margin-top: 20px;
    float: right;
}
.operating{
    margin-right: 10px;
}
</style>