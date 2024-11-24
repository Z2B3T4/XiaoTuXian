import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getTopCategoryAPI } from "@/apis/category";
import { onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
  // 这里写成大括号的形式，主要是因为后端传过来的就是对象的形式
  const categoryData = ref({});
  const router = useRoute();
  const getCategoryData = async (id: any = router.params.id) => {
    // id = router.params.id 这个就是默认是当前路由id，
    // 传过来了，就以传过来的为主
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.result;
  };
  getCategoryData();

  onBeforeRouteUpdate((to) => {
    // 这个to就是要转过去的路由
    getCategoryData(to.params.id);
  });
  return {
    categoryData,
  };
}
