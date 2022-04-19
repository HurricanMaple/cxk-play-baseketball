/*存储参数 */
interface enemyObj {
  [propName: string]: {
    name: string;
    hp: number;
    width: number;
    height: number;
    score: number;
    voice: string;
  };
}
interface rewardObj {
  [propName: string]: {
    name: string;
    width: number;
    height: number;
    voice: string;
  };
}

//const panelWidth = document.body.clientWidth; //游戏面板宽度
//const panelHeight = document.body.clientHeight; //游戏面板高度
const panelWidth = 700;
const panelHeight = 700;
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

//敌人的参数
const enemyParams: enemyObj = {
  hairParams: {
    name: "hair", //名称
    hp: 2, //血量
    width: 50, //宽度
    height: 35, //高度
    score: 2, //击败后得分
    voice: "boom", //爆炸音效
  },
  chickenParams: {
    name: "chicken",
    hp: 5,
    width: 100,
    height: 100,
    score: 5,
    voice: "crow",
  },
  lshParams: {
    name: "lsh",
    width: 50,
    height: 50,
    hp: 2,
    score: 2,
    voice: "boom",
  },
};

//存放需要遍历的敌人
const enemyArrLoop = [
  {
    type: "hair", //敌人类型
    createSpeed: 0.7, //创建速度
  },
  {
    type: "chicken",
    createSpeed: 3,
  },
  {
    type: "lsh",
    createSpeed: 1,
  },
];

//奖励的参数
const rewardParams: rewardObj = {
  litchiParams: {
    name: "litchi",
    width: 50,
    height: 50,
    voice: "reward",
  },
};

//存放需要遍历的奖励
const rewardArrLoop = [
  {
    type: "litchi",
    createSpeed: 6, //创建荔枝的速度
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
  rewardParams,
  enemyParams,
  enemyArrLoop,
  rewardArrLoop,
};
