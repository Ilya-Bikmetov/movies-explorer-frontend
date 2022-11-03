import { checkResponse } from "./CheckResponse";
export const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
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
