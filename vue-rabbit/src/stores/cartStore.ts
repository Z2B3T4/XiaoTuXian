import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    // 定义state，购物车列表
    const cartList = ref([]);
    const isLogin = computed(() => userStore.userInfo.token);
    // 将更新购物车列表的逻辑抽离出来
    const updateCartList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    // 定义action，addCart
    const addCart = async (goods: any) => {
      const { skuId, count } = goods;
      // 这里我们要检验用户是否已经登录，用户登录了就要走登录的逻辑
      // 这里使用计算属性是因为，计算属性可以返回是否存在，也就是一个bool
      //   注意这里一定要加上isLogin.value,不然就相当于没加上
      if (isLogin.value) {
        // 登陆之后加入购物车逻辑
        // 这个不是加载到前端，这个是和后端进行通信，让后端去加
        await insertCartAPI({ skuId, count });
        updateCartList();
      } else {
        // 这里要进行的逻辑就是，根据传过来的skuId，看看是否可以在cartList找到
        // 如果能找到就不添加，如果找不到就添加
        const item = cartList.value.find((item) => item.skuId === goods.skuId);
        if (item) {
          item.count++;
        } else {
          cartList.value.push(goods);
        }
      }
    };
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId]);
        updateCartList();
      } else {
        const index = cartList.value.findIndex((item) => skuId == item.skuId);
        cartList.value.splice(index, 1);
      }
    };
    // 这里进行清空购物车列表
    const clearCart = () => {
      cartList.value = [];
    };
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.price * c.count, 0)
    );
    // 表示是否所有的都选中
    const isAll = computed(() => cartList.value.every((item) => item.selected));
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.price * c.count, 0)
    );

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
      selectedCount,
      selectedPrice,
      allCheck,
      isAll,
      singleCheck,
      addCart,
      delCart,
      clearCart,
      updateCartList,
    };
  },
  {
    persist: true,
  }
);
