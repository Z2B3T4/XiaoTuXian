// createRouter 创建路由对象
// createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Logout from "@/views/Logout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Categoty/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";

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
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
