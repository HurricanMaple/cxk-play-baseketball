<template>
  <div class="set-box">
    <audio :src="music" autoplay id="audio"></audio>
    <input type="checkbox" v-model="state.playMusic" id="music" />
    <label class="music-img-wrap" for="music">
      <img
        :class="{ rotate: state.playMusic }"
        src="@/assets/img/main/music-icon.png"
      />
    </label>
  </div>
  <div class="info-box">
    <ul>
      <li class="item">
        <img src="@/assets/img/litchi.png" />
        <div class="text">荔枝：HP+20</div>
      </li>
      <li class="item">
        <img src="@/assets/img/hair.png" />
        <div class="text">中分：buff加成</div>
      </li>
      <li class="item">
        <img src="@/assets/img/chicken.png" />
        <div class="text">已练习两年半</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import music from "@/assets/music/jntm.mp3";
import { reactive, watch } from "vue";

const state = reactive({
  playMusic: false,
});

watch(
  () => state.playMusic,
  (n, o) => {
    let audioDom: HTMLAudioElement | null = document.getElementById(
      "audio"
    ) as HTMLAudioElement;
    if (n) {
      if (audioDom) {
        audioDom.play();
      }
    } else {
      if (audioDom) {
        audioDom.pause();
      }
    }
  }
);
</script>

<style lang="scss" scoped>
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: rotate 3s linear infinite;
}
.info-box {
  position: fixed;
  left: 10px;
  bottom: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  ul .item {
    display: flex;
    img {
      width: 20px;
      max-width: 20px;
      max-height: 20px;
      margin-right: 5px;
      object-fit: contain;
    }
    .text {
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
.set-box {
  position: fixed;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  input {
    display: none;
  }
  .music-img-wrap {
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: block;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
