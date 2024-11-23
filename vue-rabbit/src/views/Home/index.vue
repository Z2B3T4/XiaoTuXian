<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
  <HomePanel title="新鲜好物" sub-title="新鲜好物 好多商品">
    <div>我是新鲜好物的插槽</div>
  </HomePanel>
  <HomePanel title="人气推荐" sub-title="人气推荐 好多商品"> </HomePanel>
</template>
<script setup>
import HomeBanner from "@/views/Home/components/HomeBanner.vue";
import HomeCategory from "@/views/Home/components/HomeCategory.vue";
import HomeHot from "@/views/Home/components/HomeHot.vue";
import HomeNew from "@/views/Home/components/HomeNew.vue";
import HomeProduct from "@/views/Home/components/HomeProduct.vue";
import HomePanel from "@/views/Home/components/HomePanel.vue";
</script>
<style></style>
