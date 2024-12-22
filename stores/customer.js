import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    id: 0,
    sales_person_id: 0,
    name: "",
    gender: null,
    age: "",
    phone: "",
    email: "",
    competitor_name: "",
    competitor_id: "",
  }),
  actions: {
    setCustomer(customer) {
      this.id = customer.id;
      this.sales_person_id = customer.sales_person_id;
      this.name = customer.name;
      this.gender = customer.gender;
      this.age = customer.age;
      this.phone = customer.phone;
      this.email = customer.email;
      this.competitor_name = customer.competitor_name;
      this.competitor_id = customer.competitor_id;
    },
    loadCustomerFromLocalStorage() {
      const customer = localStorage.getItem("customer");
      if (!customer) {
        console.log("No customer data found in local storage");
        return;
      }

      try {
        const parsedData = JSON.parse(customer);
        this.setCustomer(parsedData);
      } catch (error) {
        console.error("Error parsing customer from localstorage");
      }
    },
    reset() {
      localStorage.removeItem("customer");

      this.id = 0;
      this.sales_person_id = 0;
      this.name = "";
      this.gender = null;
      this.age = "";
      this.phone = "";
      this.email = "";
      this.competitor_name = "";
      this.competitor_id = "";
    },
  },
});
