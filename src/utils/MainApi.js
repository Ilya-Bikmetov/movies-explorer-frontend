import { baseUrlMainApi } from "./constants.js";
import { checkResponse } from "./CheckResponse.js";

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3001/',
  'Content-Type': 'application/json',
}

export const signup = ({ name, email, password }) => {
  return fetch(`${baseUrlMainApi}signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => checkResponse(res))
}

export const signin = ({ email, password }) => {
  return fetch(`${baseUrlMainApi}signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
    .then((res) => checkResponse(res))
}

export const clearJwtCookie = (url) => {
  return fetch(`${this._baseUrl}${url}`, {
    method: 'GET',
    headers,
    credentials: "include",
  })
    .then((res) => {
      if (res.ok)
        return;
      return Promise.reject(`Возникла ошибка ${res.status}`);
    })
}
