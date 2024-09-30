export default defineEventHandler(async (event) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI; // Make sure this is correctly set
  const scope = "user-read-private user-read-email";

  if (!clientId || !redirectUri) {
    return sendError(event, new Error("Client ID or Redirect URI is missing!"));
  }

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  // Redirect user to Spotify login page
  return authUrl;
});
