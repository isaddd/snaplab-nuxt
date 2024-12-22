<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="container w-full p-6 flex-1 ml-64">
      <h1 class="text-2xl font-semibold mb-3">Create Category</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-800">Name</label>
          <input type="text" id="name" v-model="formData.Name" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Name" />
          <p v-if="formErrors.Name" class="text-red-500 text-xs mt-1">{{ formErrors.Name }}</p>
        </div>

        <!-- InterRowPadding -->
        <div>
          <label for="inter_row_padding" class="block text-sm font-medium text-gray-800">Inter Row Padding</label>
          <input type="number" id="inter_row_padding" v-model="formData.InterRowPadding" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Inter Row Padding" />
          <p v-if="formErrors.InterRowPadding" class="text-red-500 text-xs mt-1">{{ formErrors.InterRowPadding }}</p>
        </div>

        <!-- TopFramePadding -->
        <div>
          <label for="top_frame_padding" class="block text-sm font-medium text-gray-800">Top Frame Padding</label>
          <input type="number" id="top_frame_padding" v-model="formData.TopFramePadding" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Top Frame Padding" />
          <p v-if="formErrors.TopFramePadding" class="text-red-500 text-xs mt-1">{{ formErrors.TopFramePadding }}</p>
        </div>

        <!-- InterColPadding -->
        <div>
          <label for="inter_col_padding" class="block text-sm font-medium text-gray-800">Inter Column Padding</label>
          <input type="number" id="inter_col_padding" v-model="formData.InterColPadding" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Inter Column Padding" />
          <p v-if="formErrors.InterColPadding" class="text-red-500 text-xs mt-1">{{ formErrors.InterColPadding }}</p>
        </div>

        <!-- CustomPadding -->
        <div>
          <label for="custom_padding" class="block text-sm font-medium text-gray-800">Custom Padding</label>
          <input type="number" id="custom_padding" v-model="formData.CustomPadding" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Custom Padding" />
          <p v-if="formErrors.CustomPadding" class="text-red-500 text-xs mt-1">{{ formErrors.CustomPadding }}</p>
        </div>

        <!-- ImageID -->
        <div>
          <label for="image_id" class="block text-sm font-medium text-gray-800">Image ID</label>
          <input type="number" id="image_id" v-model="formData.ImageID" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Image ID" />
          <p v-if="formErrors.ImageID" class="text-red-500 text-xs mt-1">{{ formErrors.ImageID }}</p>
        </div>

        <!-- Width -->
        <div>
          <label for="width" class="block text-sm font-medium text-gray-800">Width</label>
          <input type="number" id="width" v-model="formData.Width" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Width" />
          <p v-if="formErrors.Width" class="text-red-500 text-xs mt-1">{{ formErrors.Width }}</p>
        </div>

        <!-- Height -->
        <div>
          <label for="height" class="block text-sm font-medium text-gray-800">Height</label>
          <input type="number" id="height" v-model="formData.Height" class="mt-1 p-2 w-full border border-gray-400 rounded-xl" placeholder="Enter Height" />
          <p v-if="formErrors.Height" class="text-red-500 text-xs mt-1">{{ formErrors.Height }}</p>
        </div>

        <!-- Column Mirrored -->
        <div class="flex items-center">
          <input type="checkbox" id="is_column_mirrored" v-model="formData.IsColumnMirrored" />
          <label for="is_column_mirrored" class="block text-sm font-medium text-gray-800 ml-[5px]">Column Mirrored</label>
        </div>

        <!-- No Cut -->
        <div class="flex items-center">
          <input type="checkbox" id="is_no_cut" v-model="formData.IsNoCut" />
          <label for="is_no_cut" class="block text-sm font-medium text-gray-800 ml-[5px]">No Cut?</label>
        </div>

        <!-- Is Seasonal -->
        <div class="flex items-center">
          <input type="checkbox" id="is_seasonal" v-model="formData.IsSeasonal" />
          <label for="is_seasonal" class="block text-sm font-medium text-gray-800 ml-[5px]">Is Seasonal?</label>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit" class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 focus:outline-none">Create Category</button>
        </div>
      </form>
    </div>

    <!-- Success Popup -->
    <transition name="fade">
      <div v-if="showSuccessPopup" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
        <div class="bg-white text-green-900 p-8 rounded-lg shadow-lg">
          <img :src="'/images/success.png'" class="w-[100px] text-center mb-3 mx-auto" alt="" />
          <h1 class="text-2xl font-semibold text-center">Success!</h1>
          <p class="text-center">Category created successfully!</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // To handle redirection

const formData = ref({
  Name: "",
  InterRowPadding: "",
  TopFramePadding: "",
  InterColPadding: "",
  CustomPadding: "",
  ImageID: "",
  Width: "",
  Height: "",
  IsColumnMirrored: false,
  IsNoCut: false,
  IsSeasonal: false,
});

const formErrors = ref({
  Name: "",
  InterRowPadding: "",
  TopFramePadding: "",
  InterColPadding: "",
  CustomPadding: "",
  ImageID: "",
  Width: "",
  Height: "",
  IsColumnMirrored: false,
  IsNoCut: false,
  IsSeasonal: false,
});

const showSuccessPopup = ref(false); // Track the success popup visibility
const router = useRouter(); // Access router for redirection

const submitForm = async () => {
  // Reset previous error messages
  formErrors.value = {
    Name: "",
    InterRowPadding: "",
    TopFramePadding: "",
    InterColPadding: "",
    CustomPadding: "",
    ImageID: "",
    Width: "",
    Height: "",
    IsColumnMirrored: false,
    IsNoCut: false,
    IsSeasonal: false,
  };

  // Check for empty required fields
  let isValid = true;

  if (!formData.value.Name) {
    formErrors.value.Name = "Name is required.";
    isValid = false;
  }

  if (!formData.value.InterRowPadding) {
    formErrors.value.InterRowPadding = "Inter-row padding is required.";
    isValid = false;
  }

  if (!formData.value.TopFramePadding) {
    formErrors.value.TopFramePadding = "Top frame padding is required.";
    isValid = false;
  }

  if (!formData.value.InterColPadding) {
    formErrors.value.InterColPadding = "Inter-column padding is required.";
    isValid = false;
  }

  if (!formData.value.CustomPadding) {
    formErrors.value.CustomPadding = "Custom padding is required.";
    isValid = false;
  }

  if (!formData.value.ImageID) {
    formErrors.value.ImageID = "Image ID is required.";
    isValid = false;
  }

  if (!formData.value.Width) {
    formErrors.value.Width = "Width is required.";
    isValid = false;
  }

  if (!formData.value.Height) {
    formErrors.value.Height = "Height is required.";
    isValid = false;
  }

  if (!isValid) {
    return; // Do not submit the form if there are errors
  }

  // Log the form data to verify structure before sending
  // console.log("Form data being submitted:", JSON.stringify(formData.value));

  const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage or session storage

  const url = "https://services.snaplab.id/api/v1/categories/";

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
        Name: "",
        InterRowPadding: "",
        TopFramePadding: "",
        InterColPadding: "",
        CustomPadding: "",
        ImageID: "",
        Width: "",
        Height: "",
        IsColumnMirrored: false,
        IsNoCut: false,
        IsSeasonal: false,
      };

      // Close the success popup after 2 seconds and redirect
      setTimeout(() => {
        showSuccessPopup.value = false; // Hide the popup
        router.back(); // Redirect to the previous page
      }, 2000);
    } else {
      // Handle error if the response is not successful
      // alert(`Error: ${data.message || "An error occurred while creating the categories."}`);
    }
  } catch (error) {
    // Log any error that occurs during the request
    console.error("Error creating categories:", error);
    // alert("An error occurred while creating the categories.");
  }
};
</script>

<style scoped>
/* Additional custom styles for the form */
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

input[type="checkbox"] {
  /* Custom checkbox styles */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #272727;
  background-color: white;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

input[type="checkbox"]:checked {
  background-color: #272727;
  border-color: #272727;
}

input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
