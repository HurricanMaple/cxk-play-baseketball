import * as PIXI from "pixi.js";
import { trackArr, trackNum, roleWidth } from "./parameter";

//创建敌人
export function initEnemy(app: any, enemyParams: any) {
  const enemy: any = new PIXI.Sprite(
    app.loader.resources[enemyParams.name].texture
  );
  const enemyTrack = Math.floor(Math.random() * trackNum);
  app.stage.addChild(enemy);
  enemy.x = trackArr[enemyTrack];
  enemy.y = 0;
  enemy.hp = enemyParams.hp; //血量
  enemy.width = enemyParams.width;
  enemy.height = enemyParams.height;
  enemy.voice = enemyParams.voice;
  enemy.score = enemyParams.score;

  return enemy;
}

//创建奖励项
export function initReward(app: any, rewardParams: any) {
  const reward: any = new PIXI.Sprite(
    app.loader.resources[rewardParams.name].texture
  );
  const rewardTrack = Math.floor(Math.random() * trackNum);
  app.stage.addChild(reward);
  reward.x = trackArr[rewardTrack];
  reward.y = 0;
  reward.vx = Math.random() * 2 - 1; //x轴分速度
  reward.vy = Math.random() + 1; //y轴分速度
  reward.width = rewardParams.width;
  reward.height = rewardParams.height;
  reward.voice = rewardParams.voice;

  return reward;
}

//创建子弹
export function initBullet(
  app: any,
  bulletParams: any,
  role: { x: number; y: number }
) {
  //创建子弹
  const bullet: any = new PIXI.Sprite(app.loader.resources.basketball.texture);
  app.stage.addChild(bullet);
  bullet.x = role.x + roleWidth / 2;
  bullet.y = role.y - 20;
  bullet.width = bulletParams.width;
  bullet.height = bulletParams.height;
  bullet.anchor.set(0.5);
  return bullet;
}
