<template>
  <div>
    登陆页
    <a-button @click="login">登陆</a-button>
  </div>
</template>

<script>
import { currentAuth, SetAuth } from "../../utils/auth.js";
export default {
  methods: {
    login() {
      const { $router } = this;
      SetAuth();
      console.log(currentAuth);
      // $router.push("/form/step-form/info");
      $router.push("/first/firstview1");
    }
  }
};
</script>

<style></style>
