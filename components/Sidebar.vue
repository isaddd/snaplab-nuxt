<template>
  <div class="grid grid-cols-1 w-64 h-[100vh] bg-[#4f4f4f] text-white p-4">
    <div class="">
      <h2 class="text-2xl font-bold">Snaplab</h2>
      <ul class="mt-6 space-y-4">
        <li>
          <NuxtLink
            to="/promo"
            :class="{
              'block py-2 px-4 hover:bg-[#2e2e2e] rounded-md transition': true,
              'bg-[#2e2e2e]': isActive('/promo') || isActive('/form-promo'),
            }"
          >
            Promo
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category"
            :class="{
              'block py-2 px-4 hover:bg-[#2e2e2e] rounded-md transition': true,
              'bg-[#2e2e2e]': isActive('/category') || isActive('/form-category'),
            }"
          >
            Category
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/frame"
            :class="{
              'block py-2 px-4 hover:bg-[#2e2e2e] rounded-md transition': true,
              'bg-[#2e2e2e]': isActive('/frame') || isActive('/form-frame'),
            }"
          >
            Frame
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex">
      <Logout />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

// Get the current route
const route = useRoute();

// Function to check if the current route is the same as the target route
const isActive = (target) => {
  return route.path === target;
};
</script>

<style scoped>
/* Optionally, add custom styles if needed */
</style>
