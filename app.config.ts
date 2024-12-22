export default defineAppConfig({
  ui: {
    primary: "pink",
    gray: "cool",
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    url: import.meta.env.VITE_API_URL,
  },
  site: {
    title: "Snaplab",
  },
});
