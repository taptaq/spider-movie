export default {
    path:'/mine',
    component:()=>import('@/views/mine'),  //按需加载mine组件
    children:[
        {
            path:"center",
            component:()=>import('@/views/mine/center.vue')
        },
        {
            path:"login",
            component:()=>import('@/components/login')
        },
        {
            path:"register",
            component:()=>import('@/components/register')
        },
        {
            path:"findPassword",
            component:()=>import('@/components/findPassword')
        },
        {
            path:'/mine',
            redirect: '/mine/center'
        }
    ]
}