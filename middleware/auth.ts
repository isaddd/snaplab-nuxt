export default defineNuxtRouteMiddleware((to, from) => {
  // Check if there is a token in localStorage
  const token = localStorage.getItem("authToken");

  // If no token exists, redirect the user to the login page
  if (!token) {
    return navigateTo("/");
  }
});
