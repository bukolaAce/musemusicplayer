<template>
  <div>
    <h1 class="text-4xl font-bold text-center text-white">Library</h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
import axios from "axios";
const token = await getSP_Token();


const accessToken = token.token; // Replace with your real access token
console.log(accessToken);

// Define the artist ID you want to fetch
const artistId = "3a1tBryiczPAZpgoZN9Rzg"; // Example artist ID for "The Chainsmokers"

// Set up Axios to make the request
const fetchArtistData = async () => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      }
    );

    console.log("Artist Data:", response.data);
  } catch (error) {
    console.error("Error fetching artist data:", error);
  }
};

// Call the function to fetch artist data
fetchArtistData();
</script>

<style scoped>
/* Add any styles if necessary */
</style>
