interface key {
  value: string;
  isDown: boolean;
  isUp: boolean;
  press: (() => void) | undefined;
  release: (() => void) | undefined;
  downHandler: ((event: KeyboardEvent) => void) | undefined;
  upHandler: ((event: KeyboardEvent) => void) | undefined;
  unsubscribe: ((event: KeyboardEvent) => void) | undefined;
}

const moveSpeed = 5; //飞机移动速度

//键盘事件
function keyboard(value: string) {
  const key: key = {
    value: value,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    downHandler: undefined,
    upHandler: undefined,
    unsubscribe: undefined,
  };

  //按键按下时触发
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //按键抬起时触发
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //添加事件监听器
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  //卸载事件监听
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}

export default function planeMove(plane: { vx: number; vy: number }) {
  //捕捉键盘上的箭头键
  const left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

  //左键按下
  left.press = () => {
    plane.vx = -moveSpeed;
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
    plane.vy = -moveSpeed;
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
    plane.vx = moveSpeed;
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
    plane.vy = moveSpeed;
    plane.vx = 0;
  };
  //下箭头抬起
  down.release = () => {
    if (!up.isDown && plane.vx === 0) {
      plane.vy = 0;
    }
  };
}
