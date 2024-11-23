import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/logout.js";

export const useCategoryStore = defineStore("category", () => {
  // 接受头部导航区列表
  const categoryList = ref([]);
  // 注意这里异步发出请求
  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;
  };
  // 这里要注意返回的是流标还有这个方法，这个方法实在Category初始化的时候
  // 进行发一次请求，然后里面的数据就是发完请求之后的数据供其他组件使用
  return {
    categoryList,
    getCategory,
  };
});
