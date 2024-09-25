import axios from 'axios';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  if (!code) {
    throw new Error('Authorization code not found!');
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token } = response.data;

    // Store token or redirect back to home
    return sendRedirect(event, `/?token=${access_token}`);
  } catch (error) {
    console.error('Error fetching access token:', error);
    return sendError(event, new Error('Failed to get access token.'));
  }
});
