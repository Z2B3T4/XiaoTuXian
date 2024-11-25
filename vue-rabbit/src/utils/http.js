import axios from "axios";
// 这个悬浮弹窗的组件导入
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user";
import router from "@/router";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 从pinia中获取token数据
    const userStore = useUserStore();

    // 按照后端的要求拼接token数据
    const token = userStore.userInfo.token;
    if (token) {
      // 注意这里的Bearer后面有一个空格，这个是后端要求这么写的
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    console.log("token检验");
    ElMessage({ type: "warning", message: e.response.data.message });
    // 这里进行返回的状态码是401的处理
    // 1.清空用户信息
    if (e.response.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }

    // 2.跳转到首页
    return Promise.reject(e);
  }
);
export default httpInstance;
