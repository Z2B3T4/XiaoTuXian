<script setup>
import LayoutNav from "@/views/Logout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Logout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Logout/components/LayoutFooter.vue";
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

<style scoped></style>
