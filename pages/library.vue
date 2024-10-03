<template>
  <div>
    <h1 class="mb-6 text-3xl font-bold text-center">Your Shows Library</h1>

    <!-- Shows Section -->
    <div v-if="shows.length">
      <h1 class="mt-8 text-2xl font-semibold text-white">Recommended Shows</h1>
      <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        <!-- Loop through shows and display each with HomeCard -->
        <HomeCard
          v-for="show in limitedShows"
          :key="show.id"
          :title="show.title"
          :artist="show.publisher"
          :albumImage="show.coverImage"
        />
      </div>
    </div>
    <p v-else class="mt-8 text-lg text-gray-400">No shows found or unable to fetch shows.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import HomeCard from "~/components/HomeCard.vue"; // Import HomeCard component

// Shows ref to store fetched data
const shows = ref([]);

// Limit to 4 shows
const limitedShows = computed(() => shows.value.slice(0, 4));

// Function to fetch shows from Spotify API
const fetchShows = async (accessToken) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/shows", // Endpoint for user's saved shows
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch shows:", response.status, response.statusText);
      return;
    }

    const data = await response.json();

    // Map and store shows
    if (data.items) {
      shows.value = data.items.map((item) => ({
        id: item.show.id,
        title: item.show.name,
        publisher: item.show.publisher, // Treat publisher as the artist
        coverImage: item.show.images[0]?.url || "", // Fallback if no image
      }));
    }
  } catch (error) {
    console.error("Error fetching shows:", error);
  }
};

// On component mount, fetch shows using the stored token
onMounted(() => {
  const storedToken = localStorage.getItem("spotify_access_token");
  if (storedToken) {
    fetchShows(storedToken);
  } else {
    console.error("No access token found in localStorage.");
  }
});
</script>

<style scoped>
/* Add any specific styles here */
</style>
