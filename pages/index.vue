<template>
  <div>
    <div class="text-center">
      <h1 class="mb-6 text-4xl font-bold">Welcome to Muse</h1>

      <!-- Conditionally render login or logged-in message -->
      <button @click="login"
        v-if="!token"
        class="px-6 py-3 text-lg text-white transition bg-green-500 rounded-lg hover:bg-green-600"
      >
        Login with Spotify
      </button>
      <span
        v-else
        class="px-6 py-3 text-lg text-white transition bg-green-500 rounded-lg hover:bg-green-600"
      >
        You are logged in
      </span>
    </div>

    <!-- Personalized Recommendations Section -->
    <div v-if="recommendedSongs.length">
      <h1
        class="mt-8 text-2xl font-semibold text-white cursor-pointer hover:underline"
      >
        Personalized Recommendations
      </h1>
      <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        <HomeCard
          v-for="song in limitedRecommendedSongs"
          :key="song.id"
          :title="song.title"
          :artist="song.artist"
          :albumImage="song.albumImage"
        />
      </div>
    </div>

    <!-- User's Playlists Section -->
    <div v-if="playlists.length">
      <h1 class="mt-8 text-2xl font-semibold text-white">Your Playlists</h1>
      <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        <HomeCard
          v-for="playlist in limitedPlaylists"
          :key="playlist.id"
          :title="playlist.name"
          :artist="playlist.owner"
          :albumImage="playlist.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import HomeCard from "~/components/HomeCard.vue"; // Import HomeCard component


const login= async()=>{
const response=await useFetch('/api/login')
const data=response.data.value
window.location.href=data

console.log(data)


}

const route = useRoute();
const token = route.query.token || null;

// Refs for storing songs
const recommendedSongs = ref([]);

// Limit to 4 songs in each section
const limitedRecommendedSongs = computed(() =>
  recommendedSongs.value.slice(0, 4)
);

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
      console.error(
        "Failed to fetch recommendations:",
        response.status,
        response.statusText
      );
      return;
    }

    const data = await response.json();
    // console.log("Full Recommendations API Response:", data); // Debugging: Log API response

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

// get playlist
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
      console.error(
        "Failed to fetch playlists:",
        response.status,
        response.statusText
      );
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
    // console.log("Access token stored in localStorage:", token);
    fetchRecommendations(token);
    fetchPlaylists(token);
  } else {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      // console.log("Access token loaded from localStorage:", storedToken);
      fetchRecommendations(storedToken);
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
