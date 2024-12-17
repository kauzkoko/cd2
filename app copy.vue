<template>
  <div class="container" :class="{ 'overflow-y-hidden': isLandscape }">
    <div v-if="error" class="error">{{ error.message }}</div>
    <div v-else :class="['grid', { 'grid-horizontal': isLandscape }]">
      <div class="grid-wrapper">
        <div v-for="block in channel?.contents" :key="block.id" class="card">
          <img 
            v-if="block.image"
            :src="block.image.display.url" 
            :alt="block.title"
            class="card-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { orientation, angle } = useScreenOrientation()
const isLandscape = computed(() => orientation.value === 'landscape-primary')

watch([orientation, angle], newVal => {
  console.log(newVal)
})

const { data: channel, error } = await useFetch(
  'https://api.are.na/v2/channels/artworks-i-took-a-picture-of', 
  {
    headers: {
      'Authorization': `Bearer ${process.env.NUXT_ARENA_API_TOKEN}`
    }
  }
)
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid {
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  justify-items: center;
}

.grid-horizontal {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem;
}

.grid-horizontal .card {
  flex: 0 0 90vw;
  scroll-snap-align: center;
}

.card-image {
  width: 100%;
  height: 90vh;
  object-fit: cover;
}

@media (min-width: 1024px) {
  .grid:not(.grid-horizontal) {
    grid-template-columns: repeat(4, 1fr);
    justify-items: stretch;
  }
}
</style>
