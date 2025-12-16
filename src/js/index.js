
// import { searchMovies } from './api.js';

const API_KEY = "VOTRE_API_KEY";

const BASE = 'https://www.omdbapi.com/';

async function searchMovies(query, page=1){
  const r = await fetch(`${BASE}?apikey=${API_KEY}&s=${query}&page=${page}`);
  return r.json();
}

async function getMovie(id){
  const r = await fetch(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`);
  return r.json();
}


let page=1;
const container=document.getElementById('movies');
async function load(){
  const data=await searchMovies('Marvel',page);
  data.Search?.forEach(m=>{
    container.innerHTML+=`<article><img src="${m.Poster}"><h2>${m.Title}</h2><a href="movie.html?id=${m.imdbID}">Voir plus</a></article>`;
  });
  page++;
}
document.getElementById('loadMore').onclick=load;
load();
