<template>
  <div class="panel" id="panel" ref="panel"></div>
  <div class="rule-box">123</div>
  <div class="info-box">
    <ul>
      <li>得分:{{ state.score }}</li>
      <li>HP:{{ state.hp }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import * as PIXI from "pixi.js";
import { Resources } from "@/assets/js/resources";
import planeMove from "@/assets/js/move";
import { hitTestRectangle } from "@/assets/js/bump";
//import Dust from "@/assets/js/lib/dust.js";

const Application = PIXI.Application,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  resources = PIXI.loader.resources;

let panelWidth = document.body.clientWidth, //游戏面板宽度
  panelHeight = document.body.clientHeight, //游戏面板高度
  bulletSpeed = 10, //子弹速度
  createBulletSpeed = 0.2, //创建子弹的速度 n秒
  createHairSpeed = 0.7, //创建头发的速度
  createChickenSpeed = 1, //创建鸡的速度
  createLitchiSpeed = 1; //创建鸡的速度

//存放需要遍历的敌人
let enemyArr = [
  {
    type: "hair", //敌人类型
    isHit: false, //是否碰撞
    voice: "boom", //爆炸音效
  },
  {
    type: "chicken",
    isHit: false,
    voice: "crow",
  },
  {
    type: "litchi",
    isHit: false,
    voice: "ngm",
  },
];
const state = reactive({
  score: 0, //得分
  hp: 100, //血量
});

//把屏幕宽度分为10份  每份宽度
let trackWidth = Math.floor(panelWidth / 10);
let trackArr = new Array(10);

//初始化轨道数组
for (let i = 0; i < 10; i++) {
  trackArr[i] = trackWidth * (i + 1) + 25;
}

//播放音频
let audio = new Audio();

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
  hairArr: any[] = [],
  litchiArr: any[] = [];

function setup() {
  // 创建背景
  let bg = new Sprite(resources.bg.texture);
  bg.width = panelWidth;
  bg.height = panelHeight;
  bg.x = 0;
  bg.y = 0;
  app.stage.addChild(bg);

  // 创建分数
  let scorePanel = new PIXI.Text("得分：" + state.score, {
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

  plane.interactive = true;

  app.stage.addChild(plane);

  //键盘控制飞机移动
  planeMove(plane);

  app.ticker.add(() => gameLoop());
}

let delay = 0;

function gameLoop() {
  delay += 1;
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

  //创建子弹
  if (delay % Math.round(createBulletSpeed * 60) === 0) {
    //创建子弹
    let bullet = new Sprite(resources.basketball.texture);
    app.stage.addChild(bullet);
    bullet.x = plane.x + 50;
    bullet.y = plane.y - 20;
    bullet.width = 20;
    bullet.height = 20;
    bullet.anchor.set(0.5);
    bulletArr.push(bullet);
  }

  //创建中分头发
  if (delay % Math.round(createHairSpeed * 60) === 0) {
    let hair = new Sprite(resources.hair.texture);
    let hairTrack = Math.floor(Math.random() * 10);
    app.stage.addChild(hair);
    hair.x = trackArr[hairTrack];
    hair.y = 0;
    hair.width = 50;
    hair.height = 35;
    hairArr.push(hair);
  }

  //创建鸡
  if (delay % Math.round(createChickenSpeed * 60) === 0) {
    let chicken = new Sprite(resources.chicken.texture);
    let chickenTrack = Math.floor(Math.random() * 10);
    app.stage.addChild(chicken);
    chicken.x = trackArr[chickenTrack];
    chicken.y = 0;
    chicken.width = 50;
    chicken.height = 50;
    chickenArr.push(chicken);
  }

  //创建荔枝
  if (delay % Math.round(createLitchiSpeed * 60) === 0) {
    let litchi = new Sprite(resources.litchi.texture);
    let litchiTrack = Math.floor(Math.random() * 10);
    app.stage.addChild(litchi);
    litchi.x = trackArr[litchiTrack];
    litchi.y = 0;
    litchi.width = 50;
    litchi.height = 50;
    litchiArr.push(litchi);
  }

  //子弹
  for (let i = 0; i < bulletArr.length; i++) {
    //旋转子弹
    bulletArr[i].rotation = (delay % 10) / 10;
    //没有发生碰撞也没有超出屏幕
    bulletArr[i].y -= bulletSpeed;

    let _enemyArr: any[] = JSON.parse(JSON.stringify(enemyArr));

    for (let m = 0; m < _enemyArr.length; m++) {
      let enemy = _enemyArr[m];

      //当前的敌人数组
      let curEnemyArr = eval(enemy.type + "Arr");
      for (let j = 0; j < curEnemyArr.length; j++) {
        //判断是否碰撞
        if (hitTestRectangle(bulletArr[i], curEnemyArr[j])) {
          //如果发生碰撞
          let _bullet = bulletArr.splice(i, 1)[0];
          let _enemy = curEnemyArr.splice(j, 1)[0];

          audio.src = resources[enemy.voice].url;
          audio.play();

          _bullet.visible = false;
          _enemy.visible = false;

          enemy.isHit = true;
          break;
        }
      }

      if (enemy.isHit) {
        //只要子弹和一个敌人发生了碰撞，就终止循环
        break;
      }
    }

    //只要一个障碍物发生了碰撞
    if (_enemyArr.some((item) => item.isHit)) {
      i--;
      state.score++;
    } else {
      //没有发生碰撞就判断是否超出屏幕，超出就删除
      if (bulletArr[i].y < 0) {
        let _bullet = bulletArr.splice(i, 1)[0];
        _bullet.visible = false;
        i--;
      }
    }
  }

  //判断是否超出边界
  enemyArr.forEach((item) => {
    //当前的敌人数组
    let curEnemyArr = eval(item.type + "Arr");
    for (let i = 0; i < curEnemyArr.length; i++) {
      let enemy = curEnemyArr[i];
      enemy.y += 2;
      if (enemy.y > panelHeight) {
        let _enemy = curEnemyArr.splice(i, 1)[0];
        _enemy.visible = false;
      }
    }
  });
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

.rule-box {
  position: fixed;
  bottom: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}
.info-box {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    li:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
