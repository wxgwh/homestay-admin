import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

import logoin from '@/views/logoin.vue'
import Main from '@/views/admin/Main.vue'
import List from '@/views/admin/List.vue'
import Homestayadd from '@/views/admin/homestay/Homestayadd.vue'
import Categoryadd from '@/views/admin/category/Add.vue'
import Categoryshow from '@/views/admin/category/Show.vue'
import Categoryedit from '@/views/admin/category/Edit.vue'
import Editpassword from '@/views/admin/userinfo/Editpassword'
import Homestayindex from '@/views/admin/homestay/Homestayindex'
import Homestayedit from '@/views/admin/homestay/Homestayedit'
import EchartsCom from '@/views/admin/echarts/Echarts.vue'
import Userment from '@/views/admin/userinfo/Userment.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {
      path:'/',
      component: Main,
      redirect:'/echarts',
      name:'index',
      meta:{auth:true,title:'首页'},
      children:[
        {
          path:'categoryadd',
          component: Categoryadd,
          name:'categoryadd',
          meta:{auth:true,title:'分类添加'}
        },
        {
          path:'categoryshow',
          component: Categoryshow,
          name:'categoryshow',
          meta:{auth:true,title:'分类查看'}
        },
        {
          path:'categoryedit',
          component: Categoryedit,
          name:'categoryedit',
          meta:{auth:true,title:'分类编辑'}
        },
        {
          path:'editpassword',
          component: Editpassword,
          name:'editpassword',
          meta:{auth:true,title:'修改密码'}
        },
        {
          path:'/homestayadd',
          component: Homestayadd,
          name:'homestayadd',
          meta:{auth:true,title:'民宿添加'},
        },
        {
          path:'/homestayindex',
          component: Homestayindex,
          name:'homestayindex',
          meta:{auth:true,title:'民宿查看'},
        },
        {
          path:'/homestayedit/:id',
          component: Homestayedit,
          name:'homestayedit',
          meta:{auth:true,title:'民宿编辑'},
        },
        {
          path:'/userment',
          component: Userment,
          name:'userment',
          meta:{auth:true,title:'用户管理'},
        },
        {
          path:'/echarts',
          component: EchartsCom,
          name:'echarts',
          meta:{auth:true,title:'数据可视化'},
        },
      ]
    },
    {
      path:'/logoin',
      component: logoin,
      name:'logoin',
      meta:{auth:false,title:'登录'},
    },
    {
      path:'/list',
      component: List,
      name:'list',
      meta:{auth:true,title:'列表'},
    }
  ]
})


//全局导航守卫（前置）
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  document.title=title;
  if(to.meta.auth){
    let token = sessionStorage.getItem('token');
    token=token&&token.trim();
    if(token){
      next();
    }else{
      next({name:'logoin',query:{redirect:to.name}})
    }
  }else{
    next();
  }
  
})

export default router
