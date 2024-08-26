import { usersApi } from "@/interceptors/users";

//url viene por defecto de usersApi
const BASE_URL = '';

const findAll = async () => {
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const findAllPages = async (page = 0) => {
  try {
    const response = await usersApi.get(`${BASE_URL}/page/${page}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const save = async ({ username, email, password, admin }) =>{
    return await usersApi.post(BASE_URL, {
      username,
      email,
      password,
      admin,
    });
}

const update = async ({ id, username, email, admin }) => {
  return await usersApi.put(`${BASE_URL}/${id}`, {
    username,
    email,
    admin,
    //password: 'nothing',  //lo realiza el backend UserRequest
  });
}

const remove = async (id) => {
    return await usersApi.delete(`${BASE_URL}/${id}`);
}

const register = async ({ username, email, password, admin, acceptedTerms }) => {
  try {
    return await usersApi.post(`${BASE_URL}/registration`, {
      username,
      email,
      password,
      admin,
      acceptedTerms,
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
}

export { findAll, findAllPages, save, update, remove, register };
