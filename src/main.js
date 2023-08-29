import Vue from "vue";
import App from "./App.vue";
import antd from "./components/antd";
import "ant-design-vue/dist/antd.less";
import less from "less";

window.less = less;
Vue.config.productionTip = false;

antd.forEach((comp) => {
  Vue.use(comp);
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
