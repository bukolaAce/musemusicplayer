export const getSP_Token = async () => {
  const response = await useFetch("/api/accessToken");
  return response.data.value;
};
