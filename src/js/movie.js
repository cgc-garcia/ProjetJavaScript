
import { getMovie } from './api.js';
const id=new URLSearchParams(location.search).get('id');
const container=document.getElementById('movie');
const m=await getMovie(id);
const date=new Date(m.DVD).toLocaleDateString('fr-FR');
container.innerHTML=`
<h1>${m.Title}</h1>
<img src="${m.Poster}">
<p>${m.Plot}</p>
<p><strong>Genre:</strong> ${m.Genre}</p>
<p><strong>Acteurs:</strong> ${m.Actors}</p>
<p><strong>Note:</strong> ${m.imdbRating}</p>
<p><strong>DVD:</strong> ${date}</p>
`;
