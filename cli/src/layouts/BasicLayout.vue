<template>
  <div>
    <Header />
    <SilderMenu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SilderMenu from "./SilderMenu";

export default {
  components: {
    Header,
    Footer,
    SilderMenu
  }
};
</script>

<style></style>
