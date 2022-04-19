<template>
  <div class="panel" id="panel" ref="panel"></div>
  <div class="info-box">
    <ul>
      <li>得分:{{ state.score }}</li>
      <li>FPS:{{ state.fps }}</li>
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
  <div class="start-box" v-if="!state.status">
    <div class="title">坤坤打篮球</div>
    <div class="box-content">
      <div class="content">{{ state.content }}</div>
      <div class="score">得分：{{ state.score }}</div>
      <div class="btn" @click="startGame">开始游戏</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch, computed } from "vue";
import * as PIXI from "pixi.js";
import { Resources } from "@/assets/js/resources";
import planeMove from "@/assets/js/move";
import { hitTestRectangle } from "@/assets/js/bump";
import { initEnemy, initReward, initBullet } from "@/assets/js/initSprite";
import {
  panelWidth,
  panelHeight,
  roleWidth,
  roleHeight,
  bulletParams,
  rewardParams,
  enemyArrLoop,
  rewardArrLoop,
  enemyParams,
} from "@/assets/js/parameter";

let Application = PIXI.Application,
  //loader = PIXI.loader,
  Sprite = PIXI.Sprite,
  //resources = PIXI.loader.resources,
  Texture = PIXI.Texture;

//被动：唱 增加射速持续两秒
function sing() {
  bulletParams.createSpeed = 0.1;
  setTimeout(() => {
    bulletParams.createSpeed = 0.2;
  }, 2000);
}

//被动：跳 kun镜像翻转持续1s
function jump() {
  role.anchor.x = 1;
  role.scale.x *= -1;
}

//角色变大
function big() {
  role.width = roleWidth * 1.2;
  role.height = roleHeight * 1.2;
  setTimeout(() => {
    role.width = roleWidth;
    role.height = roleHeight;
  }, 1000);
}

const state = reactive({
  status: false, //游戏是否开始
  content: "", //内容
  score: 0, //得分
  hp: 100, //血量
  fps: 0,
});

//血量的动态类名
const hpClass = computed(() => {
  return {
    more: state.hp >= 70,
    middle: state.hp > 30 && state.hp < 70,
    less: state.hp <= 30,
  };
});

let app = new Application({
  width: panelWidth, // default: 800 宽度
  height: panelHeight, // default: 600 高度
  antialias: true, // default: false 反锯齿
  resolution: 1, // default: 1 分辨率
  backgroundColor: 0xfff,
});

for (let key in Resources) {
  app.loader.add(key, Resources[key]);
}

app.loader.load(setup);

let role: any,
  bulletArr: any[] = [],
  rewardArr: any[] = [], //存放奖励
  enemyArr: any[] = []; //存放敌人

function setup() {
  // 创建背景
  let bg = new Sprite(app.loader.resources.bg.texture);
  bg.width = panelWidth;
  bg.height = panelHeight;
  bg.x = 0;
  bg.y = 0;
  app.stage.addChild(bg);

  role = new Sprite(app.loader.resources.cxk.texture);
  role.x = panelWidth / 2 - roleWidth / 2;
  role.y = panelHeight - 20 - roleHeight;
  role.width = roleWidth;
  role.height = roleHeight;
  role.vx = 0;
  role.vy = 0;

  role.interactive = true;

  app.stage.addChild(role);

  //键盘控制飞机移动
  planeMove(role);

  app.ticker.add(() => gameLoop());
  //先暂停
  app.stop();
}

//用于标记当前第几帧
let delay = 0;
let g_Time = 0;
function gameLoop() {
  //计算帧率
  if (!(delay % 30)) {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - g_Time;
    g_Time = timeNow;
    state.fps = Number(((30 * 1000) / timeDiff).toFixed(0));
  }

  delay += 1;
  role.x += role.vx;
  role.y += role.vy;

  //防止飞机超出边界
  if (role.x < 0) {
    role.x = 0;
  }
  if (role.y < 0) {
    role.y = 0;
  }
  if (role.x > panelWidth - roleWidth) {
    role.x = panelWidth - roleWidth;
  }
  if (role.y > panelHeight - roleHeight) {
    role.y = panelHeight - roleHeight;
  }

  //创建子弹
  if (delay % Math.round(bulletParams.createSpeed * 60) === 0) {
    //创建子弹
    let bullet = initBullet(app, bulletParams, role);
    bulletArr.push(bullet);
  }

  //创建敌人
  enemyArrLoop.forEach((item) => {
    if (delay % Math.round(item.createSpeed * 60) === 0) {
      let enemy = initEnemy(app, enemyParams[item.type + "Params"]);
      enemyArr.push(enemy);
    }
  });

  //创建奖励
  rewardArrLoop.forEach((item) => {
    if (delay % Math.round(item.createSpeed * 60) === 0) {
      let reward = initReward(app, rewardParams[item.type + "Params"]);
      rewardArr.push(reward);
    }
  });

  //子弹
  for (let i = 0; i < bulletArr.length; i++) {
    //旋转子弹
    bulletArr[i].rotation = (delay % 10) / 10;
    //没有发生碰撞也没有超出屏幕
    bulletArr[i].y -= bulletParams.speed;
    //标记当前子弹是否发生碰撞
    let flag = false;

    for (let j = 0; j < enemyArr.length; j++) {
      let curEnemy = enemyArr[j];
      if (hitTestRectangle(bulletArr[i], curEnemy)) {
        flag = true;
        curEnemy.hp -= 1;

        let audio = new Audio();
        audio.src = app.loader.resources.biu.url;
        audio.play();

        if (curEnemy.hp <= 0) {
          //播放音频
          let audio = new Audio();
          audio.src = app.loader.resources[curEnemy.voice].url;
          audio.play();

          state.score += curEnemy.score;

          //敌人被击败,子弹和敌人同时消失
          let _bullet = bulletArr.splice(i, 1)[0];
          let _enemy = enemyArr.splice(j, 1)[0];

          _bullet.visible = false;
          _enemy.visible = false;

          //因为敌人被销毁，所以索引要减一
          j--;
        } else {
          //击中敌人但没击败，只销毁子弹
          let _bullet = bulletArr.splice(i, 1)[0];
          _bullet.visible = false;
        }

        //如果发生碰撞终止循环
        break;
      }
    }

    //子弹没有碰撞并且超出屏幕
    if (!flag && bulletArr[i].y < 0) {
      let _bullet = bulletArr.splice(i, 1)[0];
      _bullet.visible = false;
    }
  }

  //判断飞机和奖励项的碰撞
  for (let i = 0; i < rewardArr.length; i++) {
    if (hitTestRectangle(role, rewardArr[i])) {
      //播放获得奖励的音频
      let audio = new Audio();
      audio.src = app.loader.resources[rewardArr[i].voice].url;
      audio.play();

      //得到奖励
      let _reward = rewardArr.splice(i, 1)[0];

      sing();

      state.hp += 20;

      _reward.visible = false;
    }
  }

  //判断飞机和敌人的碰撞
  for (let j = 0; j < enemyArr.length; j++) {
    //判断是否碰撞
    if (hitTestRectangle(role, enemyArr[j])) {
      //如果发生碰撞
      let _enemy = enemyArr.splice(j, 1)[0];

      //播放音频
      let audio = new Audio();
      audio.src = app.loader.resources.ngm.url;
      audio.play();

      big();
      //扣血
      state.hp -= 10;

      _enemy.visible = false;
    }
  }

  //判断敌人是否超出边界
  for (let i = 0; i < enemyArr.length; i++) {
    let enemy = enemyArr[i];
    enemy.y += 2;
    if (enemy.y > panelHeight) {
      let _enemy = enemyArr.splice(i, 1)[0];
      _enemy.visible = false;
    }
  }

  //判断奖励项是否超出边界
  for (let i = 0; i < rewardArr.length; i++) {
    let reward = rewardArr[i];
    reward.x += reward.vx;
    reward.y += reward.vy;
    if (reward.y > panelHeight) {
      let _reward = rewardArr.splice(i, 1)[0];
      _reward.visible = false;
    }
  }
}

//开始游戏
const startGame = () => {
  state.status = true;
  state.score = 0;
  app.start();
};
//监听血量，若小于等于0则游戏结束
watch(
  () => state.hp,
  (newHp) => {
    if (newHp <= 0) {
      state.status = false;
      //重新开始
      app.stop();

      enemyArr = [];
      rewardArr = [];

      state.hp = 100;
      state.content = "您失败了！";
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
      transition: all 0.3s;
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
  .title {
    top: 20%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
    color: #f64b4b;
  }
  .box-content {
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 250px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn {
      margin-top: 20px;
    }
  }
}
</style>
