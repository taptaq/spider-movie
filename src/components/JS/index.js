import { createApp,h } from 'vue'
import msgBox from './msgBox'


export var messageBox=(function(){
    //Vue2.0的方法
    // return function(opts){  //opts为配置参数
    // var myComponents=app.extend(msgBox);

    //     for(var attr in opts){
    //         defaults[attr]=opts[attr];  //传过来的参数覆盖默认参数
    //     }

    //     var div=document.createElement('div');
        
    //     var vm=new myComponents({
    //         el:div,  //包裹的容器(在这里创建的div会被template模板覆盖掉)
    //         data:{
    //             title:defaults.title,
    //             content:defaults.content,
    //             cancel:defaults.cancel,
    //             ok:defaults.ok
    //         },
    //         methods: {
    //             handleCancel(){
    //                 defaults.handleCancel && defaults.handleCancel.bind(this);  //若defaults没有handleCancel,则用到this指向的那个调用者定义的handleCancel方法
    //                 document.body.removeChild(vm.$el);
    //             },
    //             handleOk(){
    //                 defaults.handleCancel && defaults.handleCancel.bind(this);  //若defaults没有handleOk,则用到this指向的那个调用者定义的handleOK方法
    //             }
    //         }
    //     })
    //     document.body.appendChild(vm.$el);
    // }

    //Vue3.0的方法
    return function(opts){  //opts为配置参数
        //放在return中保证每个组件独立的参数
        var defaults={
            title:'',
            content:'',
            cancel:'',
            ok:'',
            handleCancel:null,
            handleOk:null
        };


        for(var attr in opts){
            defaults[attr]=opts[attr];  //传过来的参数覆盖默认参数
        }

        var div = document.createElement('div');  //包裹的容器(在这里创建的div会被template模板覆盖掉)

        const app=createApp({
            render(){
                return h(msgBox,{
                        handleCancel:()=>{
                            defaults.handleCancel && defaults.handleCancel.call(this);  //若defaults没有handleCancel,则用到this指向的那个调用者定义的handleCancel方法
                            // 解除绑定并移除
                            app.unmount(div);
                            document.body.removeChild(div);
                        },
                        handleOk:()=>{
                            defaults.handleOk && defaults.handleOk.call(this);  //若defaults没有handleOk,则用到this指向的那个调用者定义的handleOK方法
                            // 解除绑定并移除
                            app.unmount(div);
                            document.body.removeChild(div);
                        },
                        cancel:defaults.cancel,
                        ok:defaults.ok, 
                    },
                {
                    title:defaults.title,
                    content:defaults.content,
                    cancel:defaults.cancel,
                    ok:defaults.ok, 
                })
            },  
        });
        
        //将此组件添加到body，并挂载
        document.body.appendChild(div);
        app.mount(div);
    }
})()