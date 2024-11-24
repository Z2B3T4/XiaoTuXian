import { createApp } from "vue";
import { createPinia } from "pinia";
// pinia持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "@/styles/common.scss";
import { getCategory } from "@/apis/testAPI";
import { lazyPlugin } from "@/directives";
import { componentPlugin } from "@/components";

getCategory().then((res: any) => {
  console.log(res);
});
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
