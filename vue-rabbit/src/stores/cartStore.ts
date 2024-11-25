import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 定义state，购物车列表
    const cartList = ref([]);
    // 定义action，addCart
    const addCart = (goods: any) => {
      // 这里要进行的逻辑就是，根据传过来的skuId，看看是否可以在cartList找到
      // 如果能找到就不添加，如果找不到就添加
      const item = cartList.value.find((item) => item.skuId === goods.skuId);
      if (item) {
        item.count++;
      } else {
        cartList.value.push(goods);
      }
    };
    const delCart = (skuId) => {
      const index = cartList.value.findIndex((item) => skuId == item.skuId);
      cartList.value.splice(index, 1);
    };
    return {
      cartList,
      addCart,
      delCart,
    };
  },
  {
    persist: true,
  }
);
