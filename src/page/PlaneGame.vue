<template>
  <div class="panel" id="panel" ref="panel"></div>
  <div class="info-box"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { Resources } from "@/assets/js/resources";
import planeMove from "@/assets/js/move";
import { hitTestRectangle } from "@/assets/js/bump";

const Application = PIXI.Application,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  resources = PIXI.loader.resources;

let panelWidth = document.body.clientWidth, //游戏面板宽度
  panelHeight = document.body.clientHeight, //游戏面板高度
  bulletSpeed = 5, //子弹速度
  score = 0;

let app = new Application({
  width: panelWidth, // default: 800 宽度
  height: panelHeight, // default: 600 高度
  antialias: true, // default: false 反锯齿
  transparent: false, // default: false 透明度
  resolution: 1, // default: 1 分辨率
  backgroundAlpha: 0, // 设置背景颜色透明度   0是透明
});

for (let key in Resources) {
  loader.add(key, Resources[key]);
}
loader.load(setup);

let plane: any,
  bulletArr: any[] = [],
  chickenArr: any[] = [],
  hairArr: any[] = [];

function setup(loader: object, res: object) {
  console.log(loader, res);

  // 创建背景
  let bg = new Sprite(resources.bg.texture);
  bg.width = panelWidth;
  bg.height = panelHeight;
  bg.x = 0;
  bg.y = 0;
  app.stage.addChild(bg);

  // 创建分数
  let scorePanel = new PIXI.Text("得分：" + score, {
    fontSize: 15,
    fill: "#fff",
  });
  scorePanel.x = 10;
  scorePanel.y = 10;
  scorePanel.name = "scorePanel";
  app.stage.addChild(scorePanel);

  plane = new Sprite(resources.cxk.texture);
  plane.x = panelWidth / 2 - 50;
  plane.y = panelHeight - 170;
  plane.width = 100;
  plane.height = 150;
  plane.vx = 0;
  plane.vy = 0;

  app.stage.addChild(plane);

  //键盘控制飞机移动
  planeMove(plane);

  app.ticker.add(() => gameLoop());
}

let delay = 0;
function gameLoop() {
  plane.x += plane.vx;
  plane.y += plane.vy;

  //防止飞机超出边界
  if (plane.x < 0) {
    plane.x = 0;
  }
  if (plane.y < 0) {
    plane.y = 0;
  }
  if (plane.x > panelWidth - 100) {
    plane.x = panelWidth - 100;
  }
  if (plane.y > panelHeight - 150) {
    plane.y = panelHeight - 150;
  }

  let createSpeed = 30; //创建子弹的速度 n秒*60
  if (delay > createSpeed) {
    //创建子弹
    delay = 0;
    let bullet = new Sprite(resources.basketball.texture);
    app.stage.addChild(bullet);
    bullet.x = plane.x + 50;
    bullet.y = plane.y - 20;
    bullet.width = 20;
    bullet.height = 20;
    bullet.anchor.set(0.5);
    bulletArr.push(bullet);

    let chicken = new Sprite(resources.chicken.texture);
    app.stage.addChild(chicken);
    chicken.x = 100;
    chicken.y = 0;
    chicken.width = 50;
    chicken.height = 50;
    chickenArr.push(chicken);

    let hair = new Sprite(resources.hair.texture);
    app.stage.addChild(hair);
    hair.x = 200;
    hair.y = 0;
    hair.width = 50;
    hair.height = 35;
    hairArr.push(hair);
  } else {
    delay += 1;
  }

  //子弹
  for (let i = 0; i < bulletArr.length; i++) {
    //旋转子弹
    bulletArr[i].rotation = (delay % 10) / 10;
    //没有发生碰撞也没有超出屏幕
    bulletArr[i].y -= bulletSpeed;
    for (let j = 0; j < hairArr.length; j++) {
      //判断是否碰撞
      if (hitTestRectangle(bulletArr[i], hairArr[j])) {
        //如果发生碰撞
        let _bullet = bulletArr.splice(i, 1)[0];
        let _hair = hairArr.splice(j, 1)[0];

        _hair.visible = false;
        _bullet.visible = false;
        i--;
        j--;
        break;
      } else {
        //超出屏幕就删除
        if (bulletArr[i].y < 0) {
          let _bullet = bulletArr.splice(i, 1)[0];
          _bullet.visible = false;
          i--;
          break;
        }
      }
    }
  }

  //鸡
  for (let i = 0; i < chickenArr.length; i++) {
    let chicken = chickenArr[i];
    chicken.y += 2;
    if (chicken.y > panelHeight) {
      let _chicken = chickenArr.splice(i, 1)[0];
      _chicken.visible = false;
    }
  }

  //头发
  for (let i = 0; i < hairArr.length; i++) {
    let hair = hairArr[i];
    hair.y += 2;
    //超出屏幕时删除
    if (hair.y > panelHeight) {
      let _hair = hairArr.splice(i, 1)[0];
      _hair.visible = false;
    }
  }
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

<style scoped lang="scss">
#panel {
  height: 100%;
}
.info-box {
  background-color: rgba(255, 255, 255, 0.5);
  width: 100px;
  height: 100px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
