let page = 1;
const container = document.getElementById("movies");
async function load() {
    const data = await searchMovies("Marvel", page);
    data.Search?.forEach((m) => {
        container.innerHTML += `<article class="movie-card" class="flex"><img src="${m.Poster}"><h2>${m.Title}</h2><a href="movie.html?id=${m.imdbID}">Voir plus</a></article>`;
    });
    page++;
}
document.getElementById("loadMore").onclick = load;
load();
