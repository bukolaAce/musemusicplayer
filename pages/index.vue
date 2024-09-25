<template>
  <div>
    <div class="text-center">
      <h1 class="mb-6 text-4xl font-bold">Welcome to Muse</h1>
      <a
        href="/api/login"
        class="px-6 py-3 text-lg text-white transition bg-green-500 rounded-lg hover:bg-green-600"
      >
        Login with Spotify
      </a>
      <!-- <p v-if="token" class="mt-4 text-gray-700">
        You are logged in! Token: {{ token }}
      </p> -->
    </div>

    <!-- Personalized Recommendations Section -->
    <h1 class="mt-8 text-2xl font-semibold text-white cursor-pointer hover:underline">
      Personalized Recommendations
    </h1>
    <div v-if="recommendedSongs.length" class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
      <HomeCard
        v-for="song in limitedRecommendedSongs"
        :key="song.id"
        :title="song.title"
        :artist="song.artist"
        :albumImage="song.albumImage"
      />
    </div>

    <!-- Recently Played Section -->
    <h1 class="mt-8 text-2xl font-semibold text-white cursor-pointer hover:underline">
      Recently Played
    </h1>
    <div v-if="recentlyPlayedSongs.length" class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
      <HomeCard
        v-for="song in limitedRecentlyPlayedSongs"
        :key="song.id"
        :title="song.title"
        :artist="song.artist"
        :albumImage="song.albumImage"
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

// Refs for storing songs
const recommendedSongs = ref([]);
const recentlyPlayedSongs = ref([]);

// Limit to 4 songs in each section
const limitedRecommendedSongs = computed(() => recommendedSongs.value.slice(0, 4));
const limitedRecentlyPlayedSongs = computed(() => recentlyPlayedSongs.value.slice(0, 4));

// Fetch user's personalized song recommendations
const fetchRecommendations = async (accessToken) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop&seed_tracks=0c6xIDDpzE81m2q797ordA",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch recommendations:", response.status, response.statusText);
      return;
    }

    const data = await response.json();

    // Map and store recommended songs
    if (data.tracks) {
      recommendedSongs.value = data.tracks.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        albumImage: track.album.images[0].url,
      }));
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};

// Fetch user's recently played songs
const fetchRecentlyPlayed = async (accessToken) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=4", // Request the last 4 tracks
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch recently played tracks:", response.status, response.statusText);
      return;
    }

    const data = await response.json();

    // Map and store recently played songs
    if (data.items) {
      recentlyPlayedSongs.value = data.items.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
        albumImage: item.track.album.images[0].url,
      }));
    }
  } catch (error) {
    console.error("Error fetching recently played songs:", error);
  }
};

// On component mount, store token in localStorage and fetch data
onMounted(() => {
  if (token) {
    localStorage.setItem("spotify_access_token", token);
    fetchRecommendations(token);
    fetchRecentlyPlayed(token);
  } else {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      fetchRecommendations(storedToken);
      fetchRecentlyPlayed(storedToken);
    } else {
      console.log("No token found.");
    }
  }
});
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
