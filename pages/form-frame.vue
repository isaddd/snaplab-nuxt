<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="container w-full p-6 flex-1 ml-64">
      <h1 class="text-2xl font-semibold mb-3">Create Frame</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- File Upload -->
        <div>
          <label for="file" class="block text-sm font-medium text-gray-800">File (Image)</label>
          <input type="file" id="file" @change="handleFileUpload" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" />
          <p v-if="formErrors.file" class="text-red-500 text-xs mt-1">{{ formErrors.file }}</p>
        </div>

        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-800">Name</label>
          <input type="text" id="name" v-model="formData.name" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter name" />
          <p v-if="formErrors.name" class="text-red-500 text-xs mt-1">{{ formErrors.name }}</p>
        </div>

        <!-- Location -->
        <div>
          <label for="location" class="block text-sm font-medium text-gray-800">Location</label>
          <input type="text" id="location" v-model="formData.location" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter location" />
          <p v-if="formErrors.location" class="text-red-500 text-xs mt-1">{{ formErrors.location }}</p>
        </div>

        <!-- Category -->
        <div>
          <label for="category_id" class="block text-sm font-medium text-gray-800">Category</label>
          <select id="category_id" v-model="formData.category_id" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" :disabled="!categories.data || !categories.data.categories">
            <option value="" disabled>Select category</option>
            <!-- Ensure categories.data.categories is available before rendering options -->
            <option v-for="category in categories.data?.categories || []" :key="category.ID" :value="category.ID">{{ category.Name }}</option>
          </select>
          <p v-if="formErrors.category_id" class="text-red-500 text-xs mt-1">{{ formErrors.category_id }}</p>
        </div>

        <!-- Counter -->
        <div>
          <label for="counter" class="block text-sm font-medium text-gray-800">Counter</label>
          <input type="number" id="counter" v-model="formData.counter" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter counter value" />
          <p v-if="formErrors.counter" class="text-red-500 text-xs mt-1">{{ formErrors.counter }}</p>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // To handle redirection

const formData = ref({
  file: null,
  name: "",
  location: "",
  category_id: "",
  counter: "",
});

const formErrors = ref({
  file: "",
  name: "",
  location: "",
  category_id: "",
  counter: "",
});

const showSuccessPopup = ref(false); // Track the success popup visibility
const router = useRouter(); // Access router for redirection
const categories = ref([]); // Categories will be fetched and stored here

// Fetch categories from API when the component is mounted
onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    const response = await fetch("https://services.snaplab.id/api/v1/categories/?page=1&pageSize=100", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    const data = await response.json();

    if (response.ok) {
      categories.value = data; // Populate categories array with fetched data
    } else {
      console.error("Failed to fetch categories:", data.message);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.file = file;
  }
};

const submitForm = async () => {
  // Reset previous error messages
  formErrors.value = {
    file: "",
    name: "",
    location: "",
    category_id: "",
    counter: "",
  };

  // Check for empty required fields
  let isValid = true;

  if (!formData.value.file) {
    formErrors.value.file = "Image file is required.";
    isValid = false;
  }

  if (!formData.value.name) {
    formErrors.value.name = "Name is required.";
    isValid = false;
  }

  if (!formData.value.location) {
    formErrors.value.location = "Location is required.";
    isValid = false;
  }

  if (!formData.value.category_id) {
    formErrors.value.category_id = "Category is required.";
    isValid = false;
  }

  if (!formData.value.counter) {
    formErrors.value.counter = "Counter is required.";
    isValid = false;
  }

  if (!isValid) {
    return; // Do not submit the form if there are errors
  }

  // Log the form data to verify structure before sending
  console.log("Form data being submitted:", JSON.stringify(formData.value));

  const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage or session storage

  const url = "https://services.snaplab.id/api/v1/frame/";

  // Use FormData to handle file upload
  const formDataToSend = new FormData();
  formDataToSend.append("file", formData.value.file);
  formDataToSend.append("name", formData.value.name);
  formDataToSend.append("location", formData.value.location);
  formDataToSend.append("category_id", formData.value.category_id);
  formDataToSend.append("counter", formData.value.counter);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
      body: formDataToSend,
    });

    const data = await response.json();

    // Check if the response was successful
    if (response.ok) {
      showSuccessPopup.value = true;

      // Reset form
      formData.value = {
        file: null,
        name: "",
        location: "",
        category_id: "",
        counter: "",
      };

      // Close the success popup after 2 seconds and redirect
      setTimeout(() => {
        showSuccessPopup.value = false; // Hide the popup
        router.back(); // Redirect to the previous page
      }, 2000);
    } else {
      // Handle error if the response is not successful
      alert(`Error: ${data.message || "An error occurred while creating the frame."}`);
    }
  } catch (error) {
    // Log any error that occurs during the request
    console.error("Error creating frame:", error);
    alert("An error occurred while creating the frame.");
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
</style>
