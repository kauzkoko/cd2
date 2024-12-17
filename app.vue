<template>
  <div class="outer-landscape" v-if="landscapeMobile">
    <div class="container">
      <template v-for="block in data?.contents">
        <img v-if="block.image" :src="block.image.display.url" />
      </template>
    </div>
  </div>
  <div class="outer" v-else>
    <div class="container">
      <template v-for="block in data?.contents">
        <img v-if="block.image" :src="block.image.display.url" />
      </template>
    </div>
  </div>
</template>

<script setup>
const { width, height } = useWindowSize();
const landscapeMobile = computed(() => width.value / height.value > 1.7 && width.value < 1024);

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

.outer {
  width: 100vw;
  display: flex;
  justify-content: center;

  .container {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    @media (min-width: 1660px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    img {
      width: 100%;
      height: 500px;
      background-color: blue;

      @media (max-width: 1024px) {
        margin: 10px;
      }
    }
  }
}

.outer-landscape {
  display: flex;
  flex-direction: row;
  height: 100vh;
  align-items: center;

  .container {
    display: flex;
    flex-direction: row;
    padding: 20px;

    img {
      margin-right: 20px;
      width: 90vw;
      height: 90vh;
    }
  }
}
</style>
