import { BASE_API_LINK } from "@constants.ts";

const getApi = async (api: string): Promise<Response> => {
  return await fetch(`${BASE_API_LINK}${api}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default getApi;
