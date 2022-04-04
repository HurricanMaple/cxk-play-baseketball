<template>
  <!-- <audio :src="music" autoplay id="audio"></audio> -->
  <PlaneGame />
</template>

<script lang="ts" setup>
import PlaneGame from "./page/PlaneGame.vue";
import music from "@/assets/music/jntm.mp3";
import { onMounted } from "vue";

onMounted(() => {
  let audioDom: HTMLAudioElement | null = document.getElementById(
    "audio"
  ) as HTMLAudioElement;
  window.onclick = function () {
    if (audioDom) {
      audioDom.play();
    }
  };
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
