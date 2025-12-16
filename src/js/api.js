const API_KEY = "245a4e54";
const BASE = 'https://www.omdbapi.com/';

async function searchMovies(query, page=1){
  const r = await fetch(`${BASE}?apikey=${API_KEY}&s=${query}&page=${page}`);
  return r.json();
}

async function getMovie(id){
  const r = await fetch(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`);
  return r.json();
}
