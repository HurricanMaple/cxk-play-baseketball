<template>
  <div class="panel" id="panel" ref="panel"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import baseketball from "@/assets/img/baseketball.png";
import chicken from "@/assets/img/chicken.png";
import litchi from "@/assets/img/litchi.png";
import kun from "@/assets/img/kun.png";
import keyboard from "@/assets/js/keyboard";

const Application = PIXI.Application,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite;

let app = new Application({
  width: document.body.clientWidth, // default: 800 宽度
  height: document.body.clientHeight, // default: 600 高度
  antialias: true, // default: false 反锯齿
  transparent: false, // default: false 透明度
  resolution: 1, // default: 1 分辨率
  backgroundAlpha: 0, // 设置背景颜色透明度   0是透明
});
app.renderer.backgroundColor = 0x265653; // 设置canvas背景颜色

loader.add("img1", litchi).load(setup);

let plane: any;
function setup() {
  plane = new Sprite(loader.resources.img1.texture);
  plane.x = 0;
  plane.y = 0;
  plane.vx = 0;
  plane.vy = 0;

  app.stage.addChild(plane);

  //捕捉键盘上的箭头键
  let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

  //左键按下
  left.press = () => {
    plane.vx = -1;
    plane.vy = 0;
  };
  //左键释放
  left.release = () => {
    //如果左箭头已松开，右箭头未按下，且猫未垂直移动：停止猫
    if (!right.isDown && plane.vy === 0) {
      plane.vx = 0;
    }
  };

  //上箭头键按下
  up.press = () => {
    plane.vy = -1;
    plane.vx = 0;
  };
  //上箭头键抬起
  up.release = () => {
    if (!down.isDown && plane.vx === 0) {
      plane.vy = 0;
    }
  };

  //右箭头按下
  right.press = () => {
    plane.vx = 1;
    plane.vy = 0;
  };
  //右箭头抬起
  right.release = () => {
    if (!left.isDown && plane.vy === 0) {
      plane.vx = 0;
    }
  };

  //下箭头按下
  down.press = () => {
    plane.vy = 1;
    plane.vx = 0;
  };
  //下箭头抬起
  down.release = () => {
    if (!up.isDown && plane.vx === 0) {
      plane.vy = 0;
    }
  };

  app.ticker.add(() => gameLoop());
}

function gameLoop() {
  plane.x += plane.vx;
  plane.y += plane.vy;
}

//游戏面板的dom
const panel = ref<HTMLElement | null>(null);
onMounted(() => {
  //将创建好的canvas添加到元素当中去;
  if (panel.value) {
    panel.value.appendChild(app.view);
  }
});
</script>

<style scoped lang="scss"></style>
