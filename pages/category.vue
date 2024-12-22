<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="container w-full p-6 flex-1">
      <h1 class="text-2xl font-semibold mb-1">Categories Table</h1>

      <div class="flex justify-between items-center">
        <!-- Total Items Count -->
        <div class="mb-0">
          <span class="text-sm"
            >Total Items: <span class="text-[blue]">{{ data.total_items }}</span></span
          >
        </div>
        <!-- Add Item Form -->
        <NuxtLink to="/form-category" class="mb-2 py-2 px-6 rounded-full transition ease-in-out delay-100 bg-green-400 text-sm hover:scale-[1.05] hover:bg-green-500 hover:text-white duration-300">+ Add Item</NuxtLink>
      </div>

      <!-- Data Table -->
      <div class="table-container max-h-[500px] overflow-y-auto rounded-lg border border-gray-200">
        <table class="min-w-full bg-white border border-gray-100 rounded-lg shadow-md">
          <thead class="bg-gray-300">
            <tr>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">ID</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">NAME</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">INTER ROW PADDING</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">TOP FRAME PADDING</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">INTER COL PADDING</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">CUSTOM PADDING</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">IMAGE ID</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">WIDTH</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">HEIGHT</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">COLUMN MIRRORED</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">NO CUT</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">SEASONAL</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">CREATED AT</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">UPDATED AT</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.categories" :key="index" class="border-b hover:bg-gray-50 text-sm">
              <td class="py-3 px-4">{{ item.ID }}</td>
              <td class="py-3 px-4">{{ item.Name }}</td>
              <td class="py-3 px-4">{{ item.InterRowPadding }}</td>
              <td class="py-3 px-4">{{ item.TopFramePadding }}</td>
              <td class="py-3 px-4">{{ item.InterColPadding }}</td>
              <td class="py-3 px-4">{{ item.CustomPadding }}</td>
              <td class="py-3 px-4">{{ item.ImageID }}</td>
              <td class="py-3 px-4">{{ item.Width }}</td>
              <td class="py-3 px-4">{{ item.Height }}</td>
              <td class="py-3 px-4">{{ item.IsColumnMirrored ? "Iya" : "Tidak" }}</td>
              <td class="py-3 px-4">{{ item.IsNoCut ? "Iya" : "Tidak" }}</td>
              <td class="py-3 px-4">{{ item.IsSeasonal ? "Iya" : "Tidak" }}</td>
              <td class="py-3 px-4">{{ formatDate(item.CreatedAt) }}</td>
              <td class="py-3 px-4">{{ formatDate(item.UpdatedAt) }}</td>
              <td class="py-3 px-4 flex flex-col items-start">
                <button @click="editItem(item)" class="text-yellow-500 hover:text-yellow-600">Edit</button>
                <button @click="deleteItem(item.ID)" class="text-red-500 hover:text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between items-center">
        <button @click="previousPage" :disabled="currentPage === 1" class="text-sm transition ease-in-out delay-100 bg-blue-300 text-gray-700 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:scale-[1.05] cursor-pointer">
          Previous
        </button>
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="text-sm transition ease-in-out delay-100 bg-blue-300 text-gray-700 px-4 py-2 mr-2 rounded-md hover:bg-blue-500 hover:text-white hover:scale-[1.05] cursor-pointer"
        >
          Next
        </button>
      </div>

      <!-- Edit Modal -->
      <div v-if="editing" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-xl shadow-lg w-96">
          <h2 class="text-xl font-semibold text-center mb-4">Edit Item</h2>
          <!-- Promo Code -->
          <div>
            <label for="code" class="block text-xs font-medium text-gray-700">Promo Code</label>
            <input type="text" id="code" v-model="currentItem.Code" class="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter promo code" />
          </div>
          <div class="mt-2">
            <label for="discount" class="block text-xs font-medium text-gray-700">Discount</label>
            <input type="number" id="discount" v-model="currentItem.Discount" class="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter discount value" />
          </div>
          <!-- Is Limited -->
          <div class="flex items-center my-2">
            <input required type="checkbox" id="Limited" v-model="currentItem.Limited" />
            <label for="Limited" class="block text-xs font-medium text-gray-700 ml-[5px]">Is Limited?</label>
          </div>
          <!-- Promo Code Counter -->
          <div>
            <label for="counter" class="block text-xs font-medium text-gray-700">Counter</label>
            <input type="number" id="counter" v-model="currentItem.Counter" class="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter counter value" />
          </div>
          <!-- Expiry Date -->
          <div class="mt-2">
            <label for="date_expire" class="block text-xs font-medium text-gray-700">Expiry Date</label>
            <input type="date" id="date_expire" v-model="currentItem.ExpiryDate" class="mt-1 p-2 w-full border border-gray-300 rounded-md" />
          </div>
          <!-- Available -->
          <div class="flex items-center my-2">
            <input required type="checkbox" id="available" v-model="currentItem.Available" />
            <label for="available" class="block text-xs font-medium text-gray-700 ml-[5px]">Available?</label>
          </div>
          <!-- Duration -->
          <div>
            <label for="duration" class="block text-xs font-medium text-gray-700">Duration (in days)</label>
            <input type="number" id="duration" v-model="currentItem.Duration" class="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Enter duration in days" />
          </div>
          <div class="flex justify-center mt-2">
            <button @click="saveItem" class="mt-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 hover:scale-[1.05] transition ease-in-out delay-100">Save</button>
            <button @click="cancelEdit" class="ml-4 mt-2 bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-600 hover:scale-[1.05] transition ease-in-out delay-100">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Success Edit Popup -->
      <transition name="fade">
        <div v-if="showSuccessPopup" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div class="bg-white text-green-900 p-8 rounded-lg shadow-lg">
            <img :src="'/images/success.png'" class="w-[100px] text-center mb-3 mx-auto" alt="" />
            <h1 class="text-2xl font-semibold text-center">Success!</h1>
            <p class="text-center">Promo updated successfully!</p>
          </div>
        </div>
      </transition>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-xl shadow-lg w-96">
          <h2 class="text-lg text-gray-600">Are you sure you want to delete this promo?</h2>
          <div class="flex justify-end mt-4">
            <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 hover:scale-[1.05] transition ease-in-out delay-100">Delete</button>
            <button @click="cancelDelete" class="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 hover:scale-[1.05] transition ease-in-out delay-100">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Success Popup -->
      <transition name="fade">
        <div v-if="showSuccessDeletePopup" class="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div class="bg-white text-green-900 p-8 rounded-lg shadow-lg">
            <img :src="'/images/success.png'" class="w-[100px] text-center mb-3 mx-auto" alt="" />
            <h1 class="text-2xl font-semibold text-center">Success!</h1>
            <p class="text-center">Promo deleted successfully!</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  middleware: "auth", // Apply the auth middleware
});

const currentPage = ref(1);
const totalPages = ref(1);
const data = ref({
  total_items: 0,
  promos: [],
});
const editing = ref(false);
const currentItem = ref({});
const showSuccessPopup = ref(false); // New reactive variable for success popup
const showDeleteConfirmation = ref(false);
const showSuccessDeletePopup = ref(false);

const fetchData = async () => {
  const token = localStorage.getItem("authToken");
  const url = `https://services.snaplab.id/api/v1/categories/?page=${currentPage.value}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const fetchedData = await response.json();
  data.value = fetchedData.data;
  totalPages.value = fetchedData.data.total_pages;
};

onMounted(() => {
  fetchData();
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchData();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchData();
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day}  ${month} ${year}`;
};

const editItem = (item) => {
  currentItem.value = { ...item };
  editing.value = true;
};

const saveItem = async () => {
  const token = localStorage.getItem("authToken");
  const url = `https://services.snaplab.id/api/v1/categories/${currentItem.value.ID}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentItem.value),
  });

  if (response.ok) {
    showSuccessPopup.value = true;
    setTimeout(() => {
      showSuccessPopup.value = false;
      editing.value = false;
      fetchData();
    }, 2000);
  }
};

const cancelEdit = () => {
  editing.value = false;
};

const deleteItem = (id) => {
  showDeleteConfirmation.value = true;
  currentItem.value.ID = id;
};

const confirmDelete = async () => {
  const token = localStorage.getItem("authToken");
  const url = `https://services.snaplab.id/api/v1/categories/${currentItem.value.ID}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    showDeleteConfirmation.value = false;
    showSuccessDeletePopup.value = true;
    setTimeout(() => {
      showSuccessDeletePopup.value = false;
      fetchData();
    }, 2000);
  }
};

const cancelDelete = () => {
  showDeleteConfirmation.value = false;
};
</script>

<style scoped>
/* Scrollbar Styling */
.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
  border: 2px solid #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

table {
  border-radius: 12px;
  overflow: hidden;
}

.container {
  max-width: 100%;
  overflow-x: auto;
}

/* Table Container */
.table-container {
  max-height: 500px; /* Set a fixed height */
  overflow-y: auto; /* Enable vertical scroll */
}

/* Table Styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
}

td {
  border-bottom: 1px solid #e2e8f0;
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
