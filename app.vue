<template>
  <div
    class="flex w-100dvw h-100dvh"
    :class="[
      isLandscape ? 'overflow-y-hidden' : 'overflow-x-hidden justify-center',
    ]"
  >
    <div
      class="mt-2"
      :class="{
        'ml-5 flex flex-row gap-3': isLandscape,
        'grid grid-cols-3 gap-x-5': !isLandscape && width >= 1024,
        'grid grid-cols-5 gap-x-5': !isLandscape && width >= 1660,
      }"
    >
      <div
        class="mt-3"
        v-for="(block, index) in data?.contents"
        :key="block.id"
      >
        <img
          @click="selectImage(index)"
          v-if="block.image"
          :class="[
            isLandscape
              ? 'h-90vh'
              : width >= 1024
              ? 'w-[300px] h-full'
              : 'w-90vw',
          ]"
          :src="block.image.display.url"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { orientation } = useScreenOrientation();
const { width } = useWindowSize();
const isLandscape = computed(() => orientation.value === "landscape-primary" && width.value < 1024);

const selectedImage = ref(null);
const selectImage = (index) => {
  selectedImage.value = index;
};

const { x, y } = useMouse({ type: "client" });
const { element } = useElementByPoint({ x, y });
watch(element, (el) => {
  const { top, right, bottom, left, width, height } = useElementBounding(el);
  console.log(selectedImage.value);
});

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
</style>
