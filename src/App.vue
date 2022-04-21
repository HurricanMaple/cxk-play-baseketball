<template>
  <PlaneGame />
  <Info />
</template>

<script lang="ts" setup>
import PlaneGame from "./page/PlaneGame.vue";
import Info from "./components/Info.vue";
import { onMounted } from "vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
}
body {
  height: 100vh;
  width: 100vw;
  background-color: burlywood;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
