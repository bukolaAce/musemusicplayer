import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    accessToken: '',
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token;

      // Store token in localStorage if in client-side
      const { $isClient } = useNuxtApp();
      if ($isClient) {
        localStorage.setItem('spotify_access_token', token);
      }
    },
    loadAccessToken() {
      // Load token from localStorage if in client-side
      const { $isClient } = useNuxtApp();
      if ($isClient) {
        const token = localStorage.getItem('spotify_access_token');
        if (token) {
          this.accessToken = token;
        }
      }
    },
  },
});
