<template>
    <div>
        <loading :isshow="isshow"></loading>
        <el-form inline :model="search">
            <el-form-item label="所属分类">

            </el-form-item>
            <el-form-item label="民宿名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item label="民宿所在城市">
                <el-input v-model="search.scity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
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
                    <el-button  type="info">删除</el-button>
                    <router-link :to="{name:'homestayedit',params:{id:scope.row.sid}}">
                        <el-button  type="primary">
                            编辑
                        </el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {IMGURL} from '@/libs/base.js';
import instance from '@/http/http.js';
import loading from '@/components/loading/Loading.vue';
import categoryIndex from '@/http/category.js'
export default {
    name:"Homestayedit",
    data(){
        return{
            categorys:[],
            IMGURL,
            isshow:false,
            search:{sname:'',scity:'',cid:''},
            paginate:{limit:10,page:1},
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
            categoryIndex().then(res=>{
                // console.log(res);
                this.categorys=res.data;
            }).catch();
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
    }  
}
</script>

<style scoped>
.type_img{
    width: auto;
    height: 60px;
}
</style>