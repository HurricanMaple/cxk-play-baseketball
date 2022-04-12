<template>
  <div class="panel" id="panel" ref="panel"></div>
  <div class="info-box">
    <ul>
      <li>得分:{{ state.score }}</li>
      <li>
        HP:{{ state.hp }}
        <div class="hp-box">
          <div
            class="cur-hp"
            :class="hpClass"
            :style="{ width: state.hp + 'px' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
  <!-- <div class="start-box" v-if="!state.status">
    <div class="box-content">
      <div class="content">{{ state.content }}</div>
      <div class="start-btn" @click="startGame">开始游戏</div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch, computed } from "vue";
import * as PIXI from "pixi.js";
import { Resources } from "@/assets/js/resources";
import planeMove from "@/assets/js/move";
import { hitTestRectangle } from "@/assets/js/bump";
//import Dust from "@/assets/js/lib/dust.js";

let Application = PIXI.Application,
  loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  resources = PIXI.loader.resources;

let panelWidth = document.body.clientWidth, //游戏面板宽度
  panelHeight = document.body.clientHeight, //游戏面板高度
  roleWidth = 100, //角色宽度
  roleHeight = 150, //角色高度
  bulletSpeed = 10, //子弹速度
  createBulletSpeed = 0.2, //创建子弹的速度 n秒
  createHairSpeed = 0.7, //创建头发的速度
  createChickenSpeed = 1, //创建鸡的速度
  createLitchiSpeed = 5; //创建荔枝的速度

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
];

//存放奖励
let rewardArr = [
  {
    type: "litchi",
    isHit: false,
    voice: "reward",
  },
];
const state = reactive({
  status: false, //游戏是否开始
  score: 0, //得分
  hp: 100, //血量
});

//血量的动态类名
const hpClass = computed(() => {
  return {
    more: state.hp >= 70,
    middle: state.hp > 30 && state.hp < 70,
    less: state.hp <= 30,
  };
});

//把屏幕宽度分为10份  每份宽度
let trackWidth = Math.floor(panelWidth / 10);
let trackArr = new Array(10);

//初始化轨道数组
for (let i = 0; i < 10; i++) {
  trackArr[i] = trackWidth * (i + 1) + 25;
}

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

  plane = new Sprite(resources.cxk.texture);
  plane.x = panelWidth / 2 - roleWidth / 2;
  plane.y = panelHeight - 20 - roleHeight;
  plane.width = roleWidth;
  plane.height = roleHeight;
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
  if (plane.x > panelWidth - roleWidth) {
    plane.x = panelWidth - roleWidth;
  }
  if (plane.y > panelHeight - roleHeight) {
    plane.y = panelHeight - roleHeight;
  }

  //创建子弹
  if (delay % Math.round(createBulletSpeed * 60) === 0) {
    //创建子弹
    let bullet = new Sprite(resources.basketball.texture);
    app.stage.addChild(bullet);
    bullet.x = plane.x + 50;
    bullet.y = plane.y - 20;
    bullet.width = 12;
    bullet.height = 12;
    bullet.anchor.set(0.5);
    bulletArr.push(bullet);

    let audio = new Audio();
    audio.src = resources.biu.url;
    audio.play();
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
    litchi.vx = Math.random() * 2 - 1; //x轴分速度
    litchi.vy = Math.random() + 1; //y轴分速度
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

          //播放音频
          let audio = new Audio();
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

  //判断飞机和奖励项的碰撞
  let rewardArray: any[] = JSON.parse(JSON.stringify(rewardArr));
  for (let n = 0; n < rewardArray.length; n++) {
    let reward = rewardArray[n];
    //当前的奖励数组
    let curRewardArr = eval(reward.type + "Arr");
    for (let i = 0; i < curRewardArr.length; i++) {
      if (hitTestRectangle(plane, curRewardArr[i])) {
        //得到奖励
        let _reward = curRewardArr.splice(i, 1)[0];

        //播放获得奖励的音频
        let audio = new Audio();
        audio.src = resources[reward.voice].url;
        audio.play();

        state.hp += 20;

        _reward.visible = false;
      }
    }
  }

  //判断飞机和障碍物的碰撞
  let enemyArray: any[] = JSON.parse(JSON.stringify(enemyArr));

  for (let m = 0; m < enemyArray.length; m++) {
    let enemy = enemyArray[m];

    //当前的敌人数组
    let curEnemyArr = eval(enemy.type + "Arr");
    for (let j = 0; j < curEnemyArr.length; j++) {
      //判断是否碰撞
      if (hitTestRectangle(plane, curEnemyArr[j])) {
        //如果发生碰撞
        let _enemy = curEnemyArr.splice(j, 1)[0];

        //播放音频
        let audio = new Audio();
        audio.src = resources.ngm.url;
        audio.play();

        //扣血
        state.hp -= 10;

        _enemy.visible = false;
      }
    }

    if (enemy.isHit) {
      //只要子弹和一个敌人发生了碰撞，就终止循环
      break;
    }
  }

  //判断敌人是否超出边界
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

  //判断奖励项是否超出边界
  rewardArr.forEach((item) => {
    //当前的奖励数组
    let curRewardArr = eval(item.type + "Arr");
    for (let i = 0; i < curRewardArr.length; i++) {
      let reward = curRewardArr[i];
      reward.x += reward.vx;
      reward.y += reward.vy;
      if (reward.y > panelHeight) {
        let _reward = curRewardArr.splice(i, 1)[0];
        _reward.visible = false;
      }
    }
  });
}

//监听血量，若小于等于0则游戏结束
watch(
  () => state.hp,
  (newHp) => {
    if (newHp <= 0) {
      state.status = false;
      //重新开始
      console.log(loader);
    }
  }
);

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
  .hp-box {
    width: 100px;
    height: 12px;
    position: relative;
    border: 1px solid #eee;
    .cur-hp {
      position: absolute;

      height: 10px;
      left: 0;
      top: 0;
      &.more {
        background-color: rgb(4, 255, 0);
      }
      &.middle {
        background-color: rgb(221, 255, 0);
      }
      &.less {
        background-color: #f00;
      }
    }
  }
}
.start-box {
  position: fixed;
  background-image: url("@/assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  .box-content {
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px 40px;
    .start-btn {
      background-color: rgb(223, 219, 120);
      color: #fff;
      border-radius: 5px;
      padding: 5px 8px;
      cursor: pointer;
    }
  }
}
</style>
