<template v-slot="(title, content)">
  <div class="msgBox">
    <h2><slot name="title" /></h2>
    <p><slot name="content" /></p>
    <div class="menu">
      <div v-if="cancel" @click="handleToCancel">{{ cancel }}</div>
      <div v-if="ok" @click="handleToOk">{{ ok }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "msgBox",
  data() {
    return {
      cancel: "",
      ok: "",
    };
  },
  props: {
    cancel: {
      type: String,
    },
    ok: {
      type: String,
    },
    handleCancel: {
      type: Function,
    },
    handleOk: {
      type: Function,
    },
  },
  mounted() {
    this.cancel = this.$props.cancel;
    this.ok = this.$props.ok;
  },
  methods: {
    handleToCancel() {
      this.$props.handleCancel();
    },
    handleToOk() {
      this.$props.handleOk();
    },
  },
};
</script>

<style scoped>
.msgBox {
  width: 200px;
  height: 140px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(129, 104, 104);
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 70px);
  background: #fff;
}
.msgBox h2 {
  text-align: center;
  line-height: 40px;
  font-size: 22px;
}
.msgBox p {
  text-align: center;
  line-height: 45px;
  font-size: 20px;
}

.msgBox .menu {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
}

.msgBox .menu div {
  flex: 1;
  text-align: center;
  line-height: 30px;
  border-right: 1px solid #ccc;
  font-size: 17px;
}

.msgBox .menu div:last-child {
  border: none;
}
</style>
