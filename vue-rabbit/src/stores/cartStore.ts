import { defineStore } from "pinia";
import { computed, ref } from "vue";

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
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.price * c.count, 0)
    );
    // 表示是否所有的都选中
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    // 表示将所有的选中框都改为选中的状态
    const allCheck = (selected: any) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 根据传过来的skuId，将对应的产品的是否选中的状态进行修改
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    return {
      cartList,
      allCount,
      allPrice,
      allCheck,
      isAll,
      singleCheck,
      addCart,
      delCart,
    };
  },
  {
    persist: true,
  }
);
