<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <!--在这里修改了全局主题样式，覆盖了.ant-menu-dark .ant-menu-item-selected，在下方用vue的深度选择才能修改到-->
    <a-layout class="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">this is Logo</div>
        <SilderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 权限验证方案1
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
    -->
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SilderMenu from "./SilderMenu";
import SettingDrawer from "../components/SettingDrawer";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    Footer,
    SilderMenu,
    SettingDrawer
  }
};
</script>

<style scoped>
/* vue引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过>>>，穿透scoped。
用于修改全局主题的样式，覆盖全局主题
 外层 >>> 第三方组件 {
 
      样式
 
  }
   */

.components-layout-demo-side >>> .ant-menu-dark .ant-menu-item-selected {
  color: gold;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 25px;
}
.trigger :hover {
  background-color: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}

.nav-theme-dark >>> .logo {
  color: #eeeeee;
}
</style>
