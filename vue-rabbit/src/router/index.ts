// createRouter 创建路由对象
// createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Logout from "@/views/Logout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Categoty/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "logout",
      component: Logout,
      children: [
        {
          path: "", // 这里进行置空就是表示默认加载/ 的时候就把他加载上
          name: "home",
          component: Home,
        },
        {
          path: "category/:id",
          component: Category,
        },
        {
          path: "category/sub/:id",
          name: "subcategory",
          component: SubCategory,
        },
        {
          path: "detail/:id",
          name: "detail",
          component: Detail,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
  // 这个是对于路由行为的定制，一旦切换路由，就滚动到顶部
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
