import { LoginAPI } from "@/apis/user";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    // 定义管理用户数据的对象
    const userInfo = ref({});
    // 定义获取接口的函数api
    const getUserInfo = async ({ account, password }) => {
      const res = await LoginAPI({ account, password });
      userInfo.value = res.result;
    };
    // 返回信息
    return {
      userInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  }
);
