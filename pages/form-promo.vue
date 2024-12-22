<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="container w-full p-6 flex-1">
      <h1 class="text-2xl font-semibold mb-3">Create Promo</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Promo Code -->
        <div>
          <label for="code" class="block text-sm font-medium text-gray-800">Promo Code</label>
          <input type="text" id="code" v-model="formData.code" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter promo code" />
          <p v-if="formErrors.code" class="text-red-500 text-xs mt-1">{{ formErrors.code }}</p>
        </div>
        <!-- Discount -->
        <div>
          <label for="discount" class="block text-sm font-medium text-gray-800">Discount</label>
          <input type="number" id="discount" v-model="formData.discount" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter discount value" />
          <p v-if="formErrors.discount" class="text-red-500 text-xs mt-1">{{ formErrors.discount }}</p>
        </div>

        <!-- Is Limited -->
        <div class="flex items-center">
          <input required type="checkbox" id="limited" v-model="formData.limited" />
          <label for="limited" class="block text-sm font-medium text-gray-800 ml-[5px]">Is Limited?</label>
        </div>

        <!-- Promo Code Counter -->
        <div>
          <label for="counter" class="block text-sm font-medium text-gray-800">Counter</label>
          <input type="number" id="counter" v-model="formData.counter" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter counter value" />
          <p v-if="formErrors.counter" class="text-red-500 text-xs mt-1">{{ formErrors.counter }}</p>
        </div>

        <!-- Expiry Date -->
        <div>
          <label for="date_expire" class="block text-sm font-medium text-gray-800">Expiry Date</label>
          <input type="date" id="date_expire" v-model="formData.date_expire" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" />
          <p v-if="formErrors.date_expire" class="text-red-500 text-xs mt-1">{{ formErrors.date_expire }}</p>
        </div>

        <!-- Available -->
        <div class="flex items-center">
          <input required type="checkbox" id="available" v-model="formData.available" />
          <label for="available" class="block text-sm font-medium text-gray-800 ml-[5px]">Available?</label>
        </div>

        <!-- Duration -->
        <div>
          <label for="duration" class="block text-sm font-medium text-gray-800">Duration (in days)</label>
          <input type="number" id="duration" v-model="formData.duration" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter duration in days" />
          <p v-if="formErrors.duration" class="text-red-500 text-xs mt-1">{{ formErrors.duration }}</p>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit" class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 focus:outline-none">Create Promo</button>
        </div>
      </form>
    </div>

    <!-- Success Popup -->
    <transition name="fade">
      <div v-if="showSuccessPopup" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
        <div class="bg-white text-green-900 p-8 rounded-lg shadow-lg">
          <img :src="'/images/success.png'" class="w-[100px] text-center mb-3 mx-auto" alt="" />
          <h1 class="text-2xl font-semibold text-center">Success!</h1>
          <p class="text-center">Promo created successfully!</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // To handle redirection

const formData = ref({
  discount: "",
  code: "",
  limited: false,
  counter: "",
  date_expire: "",
  available: false,
  duration: "",
});

const formErrors = ref({
  code: "",
  discount: "",
  counter: "",
  date_expire: "",
  duration: "",
});

const showSuccessPopup = ref(false); // Track the success popup visibility
const router = useRouter(); // Access router for redirection

const submitForm = async () => {
  // Reset previous error messages
  formErrors.value = {
    code: "",
    discount: "",
    counter: "",
    date_expire: "",
    duration: "",
  };

  // Check for empty required fields
  let isValid = true;

  if (!formData.value.code) {
    formErrors.value.code = "Promo code is required.";
    isValid = false;
  }

  if (!formData.value.discount) {
    formErrors.value.discount = "Discount is required.";
    isValid = false;
  }

  if (!formData.value.counter) {
    formErrors.value.counter = "Counter is required.";
    isValid = false;
  }

  if (!formData.value.date_expire) {
    formErrors.value.date_expire = "Expiry date is required.";
    isValid = false;
  }

  if (!formData.value.duration) {
    formErrors.value.duration = "Duration is required.";
    isValid = false;
  }

  if (!isValid) {
    return; // Do not submit the form if there are errors
  }

  const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage or session storage

  const url = "https://services.snaplab.id/api/v1/promo/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();

    // Check if the response was successful
    if (response.ok) {
      showSuccessPopup.value = true;

      // Reset form
      formData.value = {
        discount: "",
        code: "",
        limited: false,
        counter: "",
        date_expire: "",
        available: false,
        duration: "",
      };

      // Close the success popup after 2 seconds and redirect
      setTimeout(() => {
        showSuccessPopup.value = false; // Hide the popup
        router.back(); // Redirect to the previous page
      }, 2000);
    } else {
      // Handle error if the response is not successful
      // alert(`Error: ${data.message || "An error occurred while creating the promo."}`);
    }
  } catch (error) {
    // Log any error that occurs during the request
    console.error("Error creating promo:", error);
    // alert("An error occurred while creating the promo.");
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  width: 40%;
}

button {
  width: 20%;
}

/* Optional styles for the success popup transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* Style the checkbox */
input[type="checkbox"] {
  -webkit-appearance: none; /* Remove default styling */
  -moz-appearance: none;
  appearance: none;
  width: 20px; /* Size of the checkbox */
  height: 20px; /* Size of the checkbox */
  border-radius: 50%; /* Makes the checkbox rounded */
  border: 1px solid #272727; /* Border color */
  background-color: white; /* Background color when unchecked */
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Style when checkbox is checked */
input[type="checkbox"]:checked {
  background-color: #272727; /* Background color when checked */
  border-color: #272727; /* Border color when checked */
}

input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px; /* Size of the check mark */
  height: 7px; /* Size of the check mark */
  background-color: white; /* Color of the check mark */
  border-radius: 50%; /* Makes the check mark circular */
  transform: translate(-50%, -50%); /* Centers the check mark */
}
</style>
