<script setup>
import LayoutNav from "@/views/Logout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Logout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Logout/components/LayoutFooter.vue";
import LayoutFixed from "@/views/Logout/components/LayoutFixed.vue";
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
  <LayoutFixed />
</template>

<style scoped></style>
