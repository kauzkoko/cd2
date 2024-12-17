<template>
  <div
    class="flex w-screen h-screen"
    :class="[isMobileLandscape ? 'items-center' : 'justify-center']"
  >
    <div class="container" :class="{ landscape: isMobileLandscape }">
      <div class="img" v-for="n in 20"></div>
    </div>
  </div>
</template>

<script setup>
const { width, height } = useWindowSize();
const aspectRatio = computed(() => width.value / height.value);
const isMobileLandscape = computed(
  () => aspectRatio.value > 1.7 && height.value < 500
);
const test = computed(() => {
  return "landscape";
});

const selectedImage = ref(null);
const selectImage = (index) => {
  selectedImage.value = index;
};

const { data } = await useFetch(
  "https://api.are.na/v2/channels/artworks-i-took-a-picture-of",
  {
    headers: {
      Authorization: `Bearer ${process.env.NUXT_ARENA_API_TOKEN}`,
    },
  }
);
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

container {
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }

  @media (min-width: 1660px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}

.landscape {
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
}

.img {
  width: 300px;
  height: 500px;
  background-color: blue;
  margin: 10px;
}
</style>
