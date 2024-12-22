<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
const lgScreenWidth = ref(1024);
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);

  updateScreenWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

const showTheApp = computed(() => {
  return screenWidth.value < lgScreenWidth.value;
});

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | ${appConfig.site.title}`
      : `${appConfig.site.title}`;
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico",
    },
  ],
});
</script>
