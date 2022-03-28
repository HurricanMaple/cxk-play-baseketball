<template>
  <div class="plane-game">{{ state.name }}</div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
onMounted(() => {
  addEventListener("mousemove", PlaneMove);
});

//自身飞机移动
const PlaneMove = (e: any) => {
  //console.log(e.clientX, e.clientY);
  console.log(document.body.clientWidth, document.body.clientHeight);
};
const state = reactive({
  name: "czj",
});
</script>

<style scoped lang="scss">
.plane-game {
  width: 100%;
  height: 100%;
}
</style>
