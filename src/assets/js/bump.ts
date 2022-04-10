//碰撞检测函数
export function hitTestRectangle(r1: any, r2: any) {
  //定义需要计算的变量
  let hit;

  //标记是否发生碰撞
  hit = false;

  //找到每个精灵的中心点
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //找出每个精灵的一半宽度和一半高度
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //计算精灵之间的距离向量
  const vx = r1.centerX - r2.centerX;
  const vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  const combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  const combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //检查x轴上是否有碰撞
  if (Math.abs(vx) < combinedHalfWidths) {
    //检查y轴上是否有碰撞
    if (Math.abs(vy) < combinedHalfHeights) {
      //碰撞
      hit = true;
    } else {
      //没有碰撞
      hit = false;
    }
  } else {
    //x轴无碰撞
    hit = false;
  }

  return hit;
}
