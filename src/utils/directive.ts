//跟随鼠标移动
const move = {
  mounted: function (el: {
    clientWidth: number;
    clientHeight: number;
    style: { left: string; top: string };
  }) {
    const offsetW = el.clientWidth / 2; //元素宽度的一半
    const offsetH = el.clientHeight / 2; //元素高度的一半
    const clientWidth = document.body.clientWidth; //浏览器窗口宽度
    const clientHeight = document.body.clientHeight; //浏览器窗口高度
    document.onmousemove = function (ev) {
      let l = ev.clientX; //鼠标位置距离窗口左侧偏移
      let t = ev.clientY; //鼠标位置距离窗口顶部偏移
      //元素碰到左侧窗口
      if (l < offsetW) {
        l = offsetW;
      }
      //元素碰到右侧窗口
      if (l > clientWidth - offsetW) {
        l = clientWidth - offsetW;
      }
      //元素碰到上侧窗口
      if (t < offsetH) {
        t = offsetH;
      }
      //元素碰到底部窗口
      if (t > clientHeight - offsetH) {
        t = clientHeight - offsetH;
      }
      el.style.left = l - offsetW + "px";
      el.style.top = t - offsetH + "px";
    };
  },
};

export { move };
