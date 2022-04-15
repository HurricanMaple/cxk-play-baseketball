import { createApp } from "vue";
import "@/assets/css/common.css";
import App from "./App.vue";
import { move } from "./utils/directive";

const app = createApp(App);

app.directive("move", move);
app.mount("#app");
