import { LoginAPI } from "@/apis/user";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { mergeCartAPI } from "@/apis/cart";
export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    // 定义管理用户数据的对象
    const userInfo = ref({});
    // 定义获取接口的函数api
    const getUserInfo = async ({ account, password }) => {
      const res = await LoginAPI({ account, password });
      userInfo.value = res.result;
      // 这里用户在登录的时候要把它没有登录时候的购物车合并过来
      // 这里使用了一个map方法，将原数组映射部分字段组成一个新的数组
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      // 这里就不用写await了，因为updateCartList抽离的时候本身已经写了异步的
      cartStore.updateCartList();
    };
    // 这里是用户退出登录，顺便也要清空购物车信息
    const clearUserInfo = () => {
      userInfo.value = {};
      cartStore.clearCart();
    };
    // 返回信息
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
