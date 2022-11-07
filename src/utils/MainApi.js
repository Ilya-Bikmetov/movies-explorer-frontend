import { baseUrlMainApi } from "./constants.js";
import { checkResponse } from "./CheckResponse.js";

const headers = {
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

export const editProfile = ({ name, email }) => {
  const body = {
    name,
    email
  }
  return fetch(`${baseUrlMainApi}users/me`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers,
    credentials: "include",
  })
    .then(checkResponse)
}

export const clearJwtCookie = () => {
  return fetch(`${baseUrlMainApi}signout`, {
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

export const getContent = () => {
  return fetch(`${baseUrlMainApi}users/me`, {
    method: 'GET',
    headers,
    credentials: "include",
  })
    .then((res) => checkResponse(res))
}
