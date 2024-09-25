let cachedToken = null;
let tokenExpiration = null;
export default defineEventHandler(async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = useRuntimeConfig();
  const authHeader = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const currentTime = Date.now();
  if (cachedToken && tokenExpiration && currentTime < tokenExpiration) {
    return {
      statusCode: 200,
      token: cachedToken,       
    };
  }
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });
    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiration = currentTime + data.expires_in * 1000;
    return {
      statusCode: 200,
      token: data.access_token,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch access token",
      data: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
});
