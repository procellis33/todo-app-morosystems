import { BASE_API_LINK } from "../constants";

const postApi = async (api: string, body?: object): Promise<Response> => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
  }

  return await fetch(`${BASE_API_LINK}${api}`, requestOptions);
};

export default postApi;
