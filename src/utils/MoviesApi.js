import { checkResponse } from "./CheckResponse";
import { baseUrl } from "./constants";
const headers = {
  "Content-Type": "application/json",
};

export const getContent = () => {
  return fetch(baseUrl, {
    method: 'GET',
    headers,
  })
    .then((res) => checkResponse(res))
}
