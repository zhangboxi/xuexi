<template>
  <div>
    <!--引入网上的IconFont中的图标，在main,js中注册了-->
    <IconFont type="icon-icon-test" style="font-size:100px" />
    <img :src="logo" alt="" />
    <img :src="logo404" alt="" />
    <img :src="logo" alt="" />
  </div>
</template>

<script>
//引入图标
import logo from "../assets/logo.svg";
import logo404 from "@/assets/404.svg";
export default {
  data() {
    return {
      logo,
      logo404
    };
  }
};
</script>

<style></style>
