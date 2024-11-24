<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Goodsitem from "@/views/Home/components/GoodsItem.vue";

const router = useRoute();

const filterData = ref({});
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(router.params.id);
  filterData.value = res.result;
};
getFilterData();

// =========================
const goodsList = ref([]);
const reqDate = ref({
  categoryId: router.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime",
});
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqDate.value);
  goodsList.value = res.result.items;
};

onMounted(() => getGoodList());

const tabChange = () => {
  // 这里不需要我们手动去设置排序字段，因为在element-plus中一定为我们动态改变了
  console.log("tab栏切换了", reqDate.value.sortField);
  reqDate.value.page = 1;
  getGoodList();
};
// 这个是实现无线加载数据
const disabled = ref(false);
const load = async () => {
  reqDate.value.page = reqDate.value.page + 1;
  const res = await getSubCategoryAPI(reqDate.value);
  goodsList.value = [...goodsList.value, ...res.result.items];
  if (res.result.items.length === 0) {
    disabled.value = true;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }"
          >{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 这里就是你一旦写了 v-model="reqDate.sortField" 这个之后
       你一旦点击这个下面的tab栏，就会修改顺序的字段-->
      <el-tabs v-model="reqDate.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <Goodsitem
          v-for="good in goodsList"
          :key="good.id"
          :good="good"
        ></Goodsitem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
