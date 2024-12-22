<template>
  <button @click="logout" class="self-end bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none">Log out</button>
</template>

<script setup>
import { useRouter } from "vue-router";

// Logout function
const router = useRouter();

const logout = () => {
  // Clear authentication data (e.g., token)
  localStorage.removeItem("authToken");

  // Redirect to the login page
  router.push("/");
};
</script>
