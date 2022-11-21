import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getGames(query) {
  await fakeNetwork(`getGames:${query}`);
  let games = await localforage.getItem("games");
  if (!games) games = [];
  if (query) {
    games = matchSorter(games, query, { keys: ["name"] });
  }
  return games.sort(sortBy("name", "createdAt"));
}

export async function createGame() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let game = { id, createdAt: Date.now() };
  let games = await getGames();
  games.unshift(game);
  await set(games);
  return game;
}

export async function getGame(id) {
  await fakeNetwork(`game:${id}`);
  let games = await localforage.getItem("games");
  let game = games.find(game => game.id === id);
  return game ?? null;
}

export async function updateGame(id, updates) {
  await fakeNetwork();
  let games = await localforage.getItem("games");
  let game = games.find(game => game.id === id);
  if (!game) throw new Error("Nenhum jogo encontrado para ", id);
  Object.assign(game, updates);
  await set(games);
  return game;
}

export async function deleteGame(id) {
  let games = await localforage.getItem("games");
  let index = games.findIndex(game => game.id === id);
  if (index > -1) {
    games.splice(index, 1);
    await set(games);
    return true;
  }
  return false;
}

function set(games) {
  return localforage.setItem("games", games);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}