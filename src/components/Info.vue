<template>
  <div class="set-box">
    <!-- <audio :src="music" autoplay id="audio" loop></audio> -->
    <input type="checkbox" v-model="state.playMusic" id="music" />
    <label class="music-img-wrap" for="music">
      <img
        :class="{ rotate: state.playMusic }"
        src="@/assets/img/main/music-icon.png"
      />
    </label>
  </div>
  <div
    class="info-box"
    :style="{ left: state.isOpen ? '10px' : -state.elWidth + 'px' }"
    ref="boxRef"
    @click="state.isOpen = false"
  >
    <div class="desc">
      <h3>游戏说明</h3>
      <p>操作方向键(⬅⬆➡⬇)或移动鼠标(🖱)控制坤坤移动</p>
      <p>作者：<s>小黑子</s> ikun</p>
      <p>
        github:<a href="https://github.com/czj0923/plane-game" target="_blank"
          >czj的github</a
        >
      </p>
      <p>点击该面板收起</p>
    </div>
    <ul class="goods-list">
      <li class="item">
        <img src="@/assets/img/litchi.png" />
        <div class="text">
          <span class="name">荔枝</span>:HP+20,射速x2持续2秒
        </div>
      </li>
      <li class="item">
        <img src="@/assets/img/hair.png" />
        <div class="text"><span class="name">中分</span>:buff加成</div>
      </li>
      <li class="item">
        <img src="@/assets/img/chicken.png" />
        <div class="text"><span class="name">鸡</span>:已练习两年半</div>
      </li>
      <li class="item">
        <img src="@/assets/img/lsh.png" />
        <div class="text"><span class="name">绿尸寒</span>:触发被动跳</div>
      </li>
      <li class="item">
        <img src="@/assets/img/branch.png" />
        <div class="text">树枝:暂定</div>
      </li>
      <li class="item">
        <img src="@/assets/img/kun.png" />
        <div class="text">鲲:暂定</div>
      </li>
    </ul>
    <div
      class="operate"
      v-show="!state.isOpen"
      @click.stop="state.isOpen = true"
    >
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import music from "@/assets/music/jntm.mp3";
import { reactive, watch, ref, onMounted } from "vue";

const state = reactive({
  playMusic: false,
  isOpen: true,
  elWidth: 0,
});

watch(
  () => state.playMusic,
  (n, o) => {
    let audioDom: HTMLAudioElement | null = document.getElementById(
      "audio"
    ) as HTMLAudioElement;
    if (n) {
      if (audioDom) {
        audioDom.volume = 0.3;
        audioDom.play();
      }
    } else {
      if (audioDom) {
        audioDom.pause();
      }
    }
  }
);

const boxRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (boxRef.value) {
    state.elWidth = boxRef.value.offsetWidth;
  }
});
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
  bottom: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  transition: all 0.4s;
  cursor: pointer;
  max-width: 200px;
  a {
    color: rgb(230, 140, 80);
  }

  .goods-list {
    margin-top: 20px;
    font-size: 14px;
    .name {
      color: rgb(248, 54, 115);
    }
    .item {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        max-width: 30px;
        max-height: 30px;
        margin-right: 5px;
        object-fit: contain;
      }
      .text {
        text-align: left;
      }
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
  .operate {
    position: absolute;
    top: 50%;
    right: -15px;
    width: 15px;
    height: 35px;
    background-color: rgb(165, 162, 162);
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.desc {
  h3 {
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 5px;
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
