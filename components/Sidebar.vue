<template>
  <div class="fixed top-0 left-0 w-64 h-full bg-[#4f4f4f] text-white p-4 flex flex-col">
    <div>
      <NuxtLink to="/promo">
        <h2 class="text-2xl font-bold">Snaplab</h2>
      </NuxtLink>
      <ul class="mt-6 space-y-4 flex-grow">
        <!-- Add flex-grow to make the list items take available space -->
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
    <!-- This div will push the logout button to the bottom -->
    <div class="flex mt-auto">
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
