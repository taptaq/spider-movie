export default {
    path:'/movie',
    component:()=>import('@/views/movie'), //按需加载movie组件
    children:[
        {
            path:'city',
            component:()=>import('@/components/city')
        },
        {
            path:'showing',
            component:()=>import('@/components/showing'),
            meta:{keepAlive:true}
        },
        {
            path:'coming',
            component:()=>import('@/components/coming'),
            meta:{keepAlive:true}
        },
        {
            path:'search',
            component:()=>import('@/components/search')
        },
        {
            path:'detail/1/:movieId',  //正在上映切换到详情页面的路径(利用1来区分)
            components:{
                default:()=>import('@/components/showing'),   //在正在上映页面切换到详情页时默认显示的是正在上映的组件
                detail:()=>import('@/views/movie/detail.vue')
            },
            props:{   //若存在多个vue组件，则要对应的组件名:true。否则直接props:true就好了
                detail:true
            }
        },
        {
            path:'detail/2/:movieId',  //即将上映切换到详情页面的路径(利用2来区分)
            components:{
                default:()=>import('@/components/coming'),   //在即将上映页面切换到详情页时默认显示的是即将上映的组件
                detail:()=>import('@/views/movie/detail.vue')
            },
            props:{   //若存在多个vue组件，则要对应的组件名:true。否则直接props:true就好了
                detail:true
            }
        },
        // 当路由为movie时，重定向到正在热映的路由
        {
            path:'/movie',
            redirect: '/movie/showing'
        }
    ]
}