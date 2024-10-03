<template>
  <div>
    <div class="text-center">
      
    </div>

    <!-- User's Playlists Section -->
    <h1 class="mt-8 text-2xl font-semibold text-white">Your Playlists</h1>
    <div
      v-if="playlists.length"
      class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4"
    >
      <HomeCard
        v-for="playlist in limitedPlaylists"
        :key="playlist.id"
        :title="playlist.name"
        :artist="playlist.owner"
        :albumImage="playlist.image"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import HomeCard from "~/components/HomeCard.vue"; // Import HomeCard component

const route = useRoute();
const token = route.query.token || null;

// Refs for storing playlists
const playlists = ref([]);

// Limit to 4 playlists in each section
const limitedPlaylists = computed(() => playlists.value.slice(0, 4));

// Fetch user's playlists
const fetchPlaylists = async (accessToken) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch playlists:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    // console.log("Full Playlists API Response:", data); // Debugging: Log API response

    // Map and store playlists
    if (data.items) {
      playlists.value = data.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        owner: playlist.owner.display_name,
        image: playlist.images[0]?.url || "", // Some playlists might not have images
      }));
    }
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
};

// On component mount, store token in localStorage and fetch data
onMounted(() => {
  if (token) {
    localStorage.setItem("spotify_access_token", token);
    fetchPlaylists(token);
  } else {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      fetchPlaylists(storedToken);
    } else {
      console.log("No token found.");
    }
  }
});
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
