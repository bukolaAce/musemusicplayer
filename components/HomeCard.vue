<template>
  <div class="max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
    <img :src="albumImage" alt="Album Cover" class="object-cover w-full h-48" />
    <div class="p-4">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <p class="text-gray-700">{{ artist }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  albumImage: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
