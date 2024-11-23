import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/styles/common.scss";
import { getCategory } from "@/apis/testAPI";
import { lazyPlugin } from "@/directives";
getCategory().then((res: any) => {
  console.log(res);
});
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(lazyPlugin);
app.mount("#app");
