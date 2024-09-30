<template>
  <div class="search-container">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold">Search for Music</h1>
      <!-- Search Input Field -->
      <input
        v-model="query"
        type="text"
        placeholder="Search for songs, albums, artists..."
        class="px-4 py-2 border rounded-md w-1/2"
        @keyup.enter="search"
      />
      <button
        @click="search"
        class="px-6 py-2 ml-2 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        Search
      </button>
    </div>

    <!-- Display search results -->
    <div v-if="searchResults.length" class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
      <HomeCard
        v-for="result in searchResults"
        :key="result.id"
        :title="result.name"
        :artist="result.artist"
        :albumImage="result.albumImage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeCard from "~/components/HomeCard.vue"; // Assuming you already have a card component

// Reactive state for search query and search results
const query = ref("");
const searchResults = ref([]);

// Spotify Search Function
const search = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");
  if (!accessToken) {
    console.error("No access token found. Please log in.");
    return;
  }

  if (query.value.trim() === "") {
    console.log("Empty search query.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query.value)}&type=track,artist,album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch search results:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log("Search API Response:", data); // Debugging: Check the full response

    // Map search results (tracks in this case)
    searchResults.value = data.tracks.items.map((item) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0]?.name,
      albumImage: item.album.images[0]?.url || "", // Use default image if not available
    }));
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
</script>

<style scoped>
.search-container {
  margin: 20px auto;
  text-align: center;
}
</style>
