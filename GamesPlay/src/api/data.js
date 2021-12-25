import * as api from "./api.js";

const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getRecentGames() {
   const response = await api.get(host + '/data/games?sortBy=_createdOn%20desc&distinct=category');
   return await response;
}

export async function getAllGames() {
   const response = await api.get(host + '/data/games?sortBy=_createdOn%20desc');
   return await response;
}

export async function getGameById(id) {
   const response = await api.get(host + '/data/games/' + id);
   return await response;
}

export async function createGame(data) {
   const response = await api.post(host + '/data/games', data);
   return await response;
}

export async function deleteGame(id) {
   const response = await api.del(host + '/data/games/' + id);
   return await response;
}

export async function editGame(id, data) {
   const response = await api.put(host + '/data/games/' + id, data);
   return await response;
}