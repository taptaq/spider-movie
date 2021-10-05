<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <!--v-model进行数据双向绑定-->
        <input type="text" v-model="message" />
      </div>
    </div>

    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="item in movielist" :key="item.id">
          <div class="img">
            <img :src="$filters.setWH(item.img, '128.180')" alt="" />
          </div>

          <div class="info">
            <p>
              <h2 class="title">{{ item.nm }}</h2>
              <span class="score">{{ item.sc }}分</span>
            </p>
            <p class="entitle">{{ item.enm }}</p>
            <p>{{ item.cat }}</p>
            <p>{{ item.rt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      message: "",
      movielist: [],
    };
  },
  watch: {
    //监听message字段(输入框的值)
    message(newval) {
      this.cancelRequest();  //一开始先判断终止请求的函数是否已经存在了，若存在就终止
      this.$axios.get("/api/search_" + newval + ".json",{
        cancelToken:new this.$axios.CancelToken((c)=>{   // 创建这个实例是为了让请求有取消的功能（这里的C是一个函数，用于终止请求的作用）
          this.source=c;  
        })
      }).then((res) => {
        var msg = res.data.msg;
        var movies = res.data.movies;
        if (msg === "ok" && movies) {
          this.movielist = movies;
        }
      }).catch((err)=>{  //处理错误
        if(this.$axios.isCancel(err)){
          console.log('request cancel',err.message);  //若请求被取消了，这里返回取消的message
        }else{
          console.log(err);
        }
      });
    },
  },
  methods: {
    cancelRequest(){
      if(typeof this.scource==='function'){
        this.source('终止请求');
      }
    }
  }
};
</script>

<style scoped>
.search_body {
  flex: 1;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin-top: 95px;
  height: 77vh;
}

.search_body::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.search_body .search_input {
  padding: 8px, 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}

.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background: #fff;
  display: flex;
}

.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}

.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 10px;
  width: 100%;
}

.search_body .search_result {
  overflow: auto;
}

.search_body .search_result .img {
  width: 64px;
  height: 90px;
  /* border: 1px solid #000; */
  margin-right: 15px;
}

.search_body .search_result .img img {
  width: 100%;
  height: 100%;
}

.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
  font-weight: normal;
}

.search_body .search_result li {
  border-bottom: 1px dashed #c9c9c9;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  position: relative;
}

.search_body .search_result li .info p {
  margin-bottom: 5px;
}

.search_body .search_result li .info h2.title {
  font-weight: 700;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 200px;
}

.search_body .search_result li .info .entitle {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 180px;
}

.search_body .search_result li .info .score {
  color: rgb(231, 174, 17);
  font-size: 17px;
  position: absolute;
  right: 16px;
  top: 10px;
}
</style>
