<template>
  <div class="grid grid-cols-3">
    <template v-for="n in props.elements">
        <div>test</div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  elements: {
    type: Array,
    default: [1,2,3]
  }
});
</script>