export const useClientToken = async () => {
  const response = await useFetch("/api/accessToken");
  const accessData = response.data.value.token;

  return {response}
  // console.log(response.data.value.token, "response");
};
