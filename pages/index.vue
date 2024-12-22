<template>
  <div class="flex items-center justify-center min-h-screen bg-[#4f4f4f]">
    <div class="bg-white px-10 py-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">Snaplab</h2>

      <!-- Display error message if login fails -->
      <div v-if="loginError" class="text-sm mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
        <p>{{ loginError }}</p>
      </div>

      <!-- Success Popup with Transition -->
      <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="loginSuccess" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-60 z-50">
          <div class="bg-white text-green-600 p-6 rounded-lg shadow-lg">
            <p class="text-center font-semibold">Login Successful!</p>
            <!-- <iframe src="https://giphy.com/embed/MelhioWPAo6k4Q6BTp" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> -->
          </div>
        </div>
      </transition>

      <form @submit.prevent="login" class="flex flex-col items-center min-w-full">
        <div class="mb-4 w-full">
          <label for="email" class="block text-sm font-medium text-gray-600 ml-5">Email</label>
          <input type="email" id="email" v-model="email" required class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2f2f2f]" placeholder="Enter your email" />
        </div>

        <div class="mb-6 w-full">
          <label for="password" class="block text-sm font-medium text-gray-600 ml-5">Password</label>
          <input type="password" id="password" v-model="password" required class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2f2f2f]" placeholder="Enter your password" />
        </div>

        <button type="submit" class="w-36 py-2 bg-[#4f4f4f] text-white font-semibold rounded-full hover:bg-gray-500 hover:scale-[1.05] transition duration-300 focus:outline-none focus:ring-2">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "#app"; // Import useFetch from Nuxt 3

const email = ref("");
const password = ref("");
const loginError = ref(""); // Store error message
const loginSuccess = ref(false); // Store success message visibility
const router = useRouter();

const login = async () => {
  // Clear any previous error messages
  loginError.value = "";
  loginSuccess.value = false; // Hide success message before login attempt

  // Prepare the request data
  const credentials = {
    email: email.value,
    password: password.value,
  };

  try {
    // Make the API call to the login endpoint
    const { data, error } = await useFetch("https://services.snaplab.id/api/v1/auth/signin", {
      method: "POST",
      body: credentials,
    });

    // Handle successful login
    if (data.value && !error.value) {
      //console.log("Login successful!", data.value);
      // Save the token or necessary data, e.g., in localStorage
      localStorage.setItem("authToken", data.value.token);

      // Show the success popup
      loginSuccess.value = true;

      // Redirect to promo page after 2 seconds to allow the success popup to be seen
      setTimeout(() => {
        router.push("/promo");
      }, 2000);
    } else {
      // Handle API error (e.g., invalid credentials)
      loginError.value = "Invalid email or password. Please try again.";
    }
  } catch (err) {
    // Handle any other errors
    console.error("Login request failed", err);
    loginError.value = "Something went wrong. Please try again later.";
  }
};

// Close the success popup manually
const closeSuccessPopup = () => {
  loginSuccess.value = false;
};

// Transition hooks
const beforeEnter = (el) => {
  el.style.opacity = 0;
};

const enter = (el, done) => {
  el.offsetHeight; // Trigger reflow
  el.style.transition = "opacity 0.5s ease";
  el.style.opacity = 1;
  done();
};

const leave = (el, done) => {
  el.style.transition = "opacity 0.5s ease";
  el.style.opacity = 0;
  done();
};
</script>

<style scoped>
/* Optional styles for the success popup transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
