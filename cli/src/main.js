import Vue from "vue";

import App from "./App.vue";
import router from "./router";
// import store from "./store";
import store from "./store/index.js";
//精细权限管理1
import Authorized from "./components/Authorized";
//精细权限管理2
import Auth from "./directives/auth";

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select
} from "ant-design-vue";
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Select);

Vue.use(Input);
//权限管理的方法二：在用的地方， v-auth="['admin']" 例子：<div v-auth="['admin']"/>,只对第一次有用，当更换时，不能改变
Vue.use(Auth);

//权限管理的方法一：组建管理法，在用的地方，用<Authorized>嵌套例子： <Authorized :authority="['admin']"></Authorized>
Vue.component("Authorized", Authorized);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
