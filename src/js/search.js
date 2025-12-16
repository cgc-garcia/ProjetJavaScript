
let page=1, query='';
const input=document.getElementById('search');
const results=document.getElementById('results');

input.addEventListener('input', async e=>{
  query=e.target.value;
  page=1;
  results.innerHTML='';
  if(query.length<3) return;
  const data=await searchMovies(query,page);
  data.Search?.forEach(m=>{
    results.innerHTML+=`<article><img src="${m.Poster}"><h2>${m.Title}</h2><a href="movie.html?id=${m.imdbID}">Voir</a></article>`;
  });
});

document.getElementById('loadMore').onclick=async()=>{
  page++;
  const data=await searchMovies(query,page);
  data.Search?.forEach(m=>{
    results.innerHTML+=`<article><h2>${m.Title}</h2></article>`;
  });
};
