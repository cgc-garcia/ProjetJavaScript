const id = new URLSearchParams(location.search).get("id");
console.log(id);

const container = document.getElementById("movie");

async function loadmovie() {
    const m = await getMovie(id);
    console.log(m);

    const date = new Date(m.Released).toLocaleDateString("fr-FR");
    container.innerHTML = `
        <h1>${m.Title}</h1>
        <img src="${m.Poster}">
        <p>${m.Plot}</p>
        <p><strong>Genre:</strong> ${m.Genre}</p>
        <p><strong>Acteurs:</strong> ${m.Actors}</p>
        <p><strong>Note:</strong> ${m.imdbRating}</p>
        <p><strong>DVD:</strong> ${date}</p>
        `;
}
loadmovie();
