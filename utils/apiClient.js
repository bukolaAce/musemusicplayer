const base = "https:/api.spotify.com/v1/";
import { getSP_Token } from "./getAccessToken";

export const getRequest = async (params) => {
  const url = `${base}${params}`;
  try {
    const tokenResponse = await getSP_Token();
    const response = await useFetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenResponse?.token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
