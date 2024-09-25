import { defineStore } from "pinia";
import { getRequest } from "#imports";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    artists: {
      loading: false,
      error: false,
      data: [],
    },
  }),
  actions: {
    async fetchArtists() {
      this.artists.loading = true;
      this.artists.error = false;
      try {
        const res = await getRequest(
          "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg"
        );
        if (res?.status?.value === "success") {
          this.artists.data = res.data.value.artists;
          this.artists.loading = false;
        } else {
          this.artists.error = true;
          this.artists.loading = false;
        }
      } catch (error) {
        this.artists.error = true;
        this.artists.loading;
      }
    },
  },
});