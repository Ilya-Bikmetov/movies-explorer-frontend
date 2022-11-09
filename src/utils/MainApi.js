import { baseUrlMainApi, imgUrl } from "./constants.js";
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

export const changeLikeCardStatus = (isLiked, card, movieId) => {
  if (!isLiked) {
    return fetch(`${baseUrlMainApi}movies`, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        {
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: `${imgUrl}${card.image.url}`,
          trailerLink: card.trailerLink,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          thumbnail: `${imgUrl}${card.image.formats.thumbnail.url}`,
          movieId: card.id,
        }),
      credentials: "include",
    })
      .then(checkResponse)
  } else {
    return fetch(`${baseUrlMainApi}${movieId}`, {
      method: 'DELETE',
      headers,
      credentials: "include",
    })
      .then(checkResponse)
  }
}

export const getMoviesLiked = () => {
  return fetch(`${baseUrlMainApi}movies`, {
    method: 'GET',
    headers,
    credentials: "include",
  })
    .then((res) => checkResponse(res))
}
