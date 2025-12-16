
import { API_KEY } from './config.js';
const BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query, page=1){
  const r = await fetch(`${BASE}?apikey=${API_KEY}&s=${query}&page=${page}`);
  return r.json();
}

export async function getMovie(id){
  const r = await fetch(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`);
  return r.json();
}
