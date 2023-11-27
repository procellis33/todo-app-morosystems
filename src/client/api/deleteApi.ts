import { BASE_API_LINK } from "../constants";

const deleteApi = async (api: string): Promise<Response> => {
  return await fetch(`${BASE_API_LINK}${api}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default deleteApi;
