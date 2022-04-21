import { Application } from "pixi.js";
import { panelWidth, panelHeight } from "./parameter";

export function appFactory() {
  const app = new Application({
    width: panelWidth, // default: 800 宽度
    height: panelHeight, // default: 600 高度
    antialias: true, // default: false 反锯齿
    resolution: 1, // default: 1 分辨率
    backgroundColor: 0xfff,
  });

  document.body.appendChild(app.view);
  app.view.oncontextmenu = (e) => {
    e.preventDefault();
  };
  return app;
}
