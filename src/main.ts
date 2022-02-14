import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import "@/common/css/tailwind.css";
// import "@/common/css/element.scss";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "./router";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
/** 组件使用中文 */
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
