<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="container w-full p-6 flex-1 ml-64">
      <h1 class="text-2xl font-semibold mb-3">Create Frame</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Loop over form items -->
        <div v-for="(item, index) in formData" :key="index" class="space-y-4">
          <!-- File Upload -->
          <div>
            <label for="file" class="block text-sm font-medium text-gray-800">File (Image) #{{ index + 1 }}</label>
            <input type="file" :id="'file' + index" @change="handleFileUpload($event, index)" class="mt-1 p-2 w-auto border border-gray-400 rounded-xl" />
            <p v-if="formErrors[index]?.file" class="text-red-500 text-xs mt-1">{{ formErrors[index]?.file }}</p>
          </div>

          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-800">Name</label>
            <input type="text" :id="'name' + index" v-model="item.name" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter name" />
            <p v-if="formErrors[index]?.name" class="text-red-500 text-xs mt-1">{{ formErrors[index]?.name }}</p>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-800">Location</label>
            <input type="text" :id="'location' + index" v-model="item.location" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter location" />
            <p v-if="formErrors[index]?.location" class="text-red-500 text-xs mt-1">{{ formErrors[index]?.location }}</p>
          </div>

          <!-- Category -->
          <div>
            <label for="category_id" class="block text-sm font-medium text-gray-800">Category</label>
            <select :id="'category_id' + index" v-model="item.category_id" class="mt-1 p-2 w-auto border border-gray-400 rounded-xl" :disabled="!categories.data || !categories.data.categories">
              <option value="" disabled>Select category</option>
              <option v-for="category in categories.data?.categories || []" :key="category.ID" :value="category.ID">{{ category.Name }}</option>
            </select>
            <p v-if="formErrors[index]?.category_id" class="text-red-500 text-xs mt-1">{{ formErrors[index]?.category_id }}</p>
          </div>

          <!-- Counter -->
          <div>
            <label for="counter" class="block text-sm font-medium text-gray-800">Counter</label>
            <input type="number" :id="'counter' + index" v-model="item.counter" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter counter value" />
            <p v-if="formErrors[index]?.counter" class="text-red-500 text-xs mt-1">{{ formErrors[index]?.counter }}</p>
          </div>

          <!-- Remove Button -->
          <div v-if="formData.length > 1">
            <button type="button" @click="removeForm(index)" class="text-red-500 text-sm mt-2">Remove Form</button>
          </div>
        </div>

        <!-- Add Form Button -->
        <div>
          <button type="button" @click="addForm" class="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 focus:outline-none">Add Form</button>
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

const formData = ref([
  {
    file: null,
    name: "",
    location: "",
    category_id: "",
    counter: "",
  },
]);

const formErrors = ref([{}]); // Track errors for each form entry

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

const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    formData.value[index].file = file;
  }
};

const addForm = () => {
  formData.value.push({
    file: null,
    name: "",
    location: "",
    category_id: "",
    counter: "",
  });

  formErrors.value.push({});
};

const removeForm = (index) => {
  formData.value.splice(index, 1);
  formErrors.value.splice(index, 1);
};

const submitForm = async () => {
  // Reset previous error messages
  formErrors.value = formData.value.map(() => ({
    file: "",
    name: "",
    location: "",
    category_id: "",
    counter: "",
  }));

  // Check for empty required fields
  let isValid = true;
  formData.value.forEach((item, index) => {
    if (!item.file) {
      formErrors.value[index].file = "Image file is required.";
      isValid = false;
    }
    if (!item.name) {
      formErrors.value[index].name = "Name is required.";
      isValid = false;
    }
    if (!item.location) {
      formErrors.value[index].location = "Location is required.";
      isValid = false;
    }
    if (!item.category_id) {
      formErrors.value[index].category_id = "Category is required.";
      isValid = false;
    }
    if (!item.counter) {
      formErrors.value[index].counter = "Counter is required.";
      isValid = false;
    }
  });

  if (!isValid) {
    return; // Do not submit the form if there are errors
  }

  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No authentication token found.");
    return;
  }

  const url = "https://services.snaplab.id/api/v1/frame/";

  // Loop through each form entry and submit one by one
  for (let i = 0; i < formData.value.length; i++) {
    const item = formData.value[i];
    const formDataToSend = new FormData(); // FormData instance for each request

    // Append each field to FormData
    formDataToSend.append("file", item.file);
    formDataToSend.append("name", item.name);
    formDataToSend.append("location", item.location);
    formDataToSend.append("category_id", item.category_id);
    formDataToSend.append("counter", item.counter);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend, // Send form data as a multipart form
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Frame #${i + 1} created successfully.`);
        if (i === formData.value.length - 1) {
          // Show success popup after the last post
          showSuccessPopup.value = true;

          // Reset form after all requests are complete
          formData.value = [
            {
              file: null,
              name: "",
              location: "",
              category_id: "",
              counter: "",
            },
          ];

          setTimeout(() => {
            showSuccessPopup.value = false;
            router.back();
          }, 2000);
        }
      } else {
        alert(`Error: ${data.message || "An error occurred while creating the frame."}`);
        break; // Stop further submissions if any post fails
      }
    } catch (error) {
      console.error("Error creating frame:", error);
      alert("An error occurred while creating the frame.");
      break; // Stop further submissions if any post fails
    }
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
