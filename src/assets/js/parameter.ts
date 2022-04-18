/*存储参数 */

const panelWidth = document.body.clientWidth; //游戏面板宽度
const panelHeight = document.body.clientHeight; //游戏面板高度
const trackNum = 20; //轨道条数

const trackArr = new Array(trackNum); //存放轨道位置
//把屏幕宽度分为n份  每份宽度
const trackWidth = Math.floor(panelWidth / trackNum);
//初始化轨道数组
for (let i = 0; i < trackNum; i++) {
  trackArr[i] = trackWidth * (i + 1) + 25;
}

const roleWidth = 100; //角色宽度
const roleHeight = 150; //角色高度
//子弹参数
const bulletParams = {
  createSpeed: 0.2, //创建子弹的速度 n秒
  speed: 10, //子弹速度
  width: 12,
  height: 12,
};
//中分的参数
const hairParams = {
  name: "hair", //名称
  createSpeed: 0.7, //创建速度
  hp: 2, //血量
  width: 50, //宽度
  height: 35, //高度
  score: 2, //击败后得分
};
//鸡的参数
const chickenParams = {
  name: "chicken",
  createSpeed: 3,
  hp: 5,
  width: 100,
  height: 100,
  score: 5,
};
//绿尸寒的参数
const lshParams = {
  name: "lsh",
  createSpeed: 1,
  width: 50,
  height: 50,
  hp: 2,
  score: 2,
};
//荔枝的参数
const litchiParams = {
  name: "litchi",
  createSpeed: 6, //创建荔枝的速度
  width: 50,
  height: 50,
};

//存放需要遍历的敌人
const enemyArr = [
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
    type: "lsh",
    isHit: false,
    voice: "boom",
  },
];

//存放奖励
const rewardArr = [
  {
    type: "litchi",
    isHit: false,
    voice: "reward",
  },
];

export {
  panelWidth,
  panelHeight,
  trackNum,
  trackArr,
  roleWidth,
  roleHeight,
  bulletParams,
  hairParams,
  chickenParams,
  lshParams,
  litchiParams,
  enemyArr,
  rewardArr,
};
