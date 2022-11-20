<template>
  <div id="app" class="container-xl">
    <NavBar/>
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  }
};


</script>

<style lang="scss" scoped>


</style>
