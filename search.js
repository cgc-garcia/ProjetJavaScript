document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "VOTRE_CLE_API"; // Remplace par ta clé OMDb

  const input = document.getElementById("searchInput");
  const container = document.getElementById("results-container");
  const loadBtn = document.getElementById("loadMore");

  if (!input || !container || !loadBtn) {
    console.warn(
      "Elements manquants : vérifie que #searchInput, #results-container et #loadMore existent dans le HTML."
    );
    return;
  }

  let currentQuery = "";
  let currentPage = 1; // OMDb retourne 10 résultats par page

  function placeholderPoster() {
    return "https://via.placeholder.com/200x300?text=Pas+de+poster";
  }

  function createMovieCard(movie) {
    const card = document.createElement("div");
    card.className = "movie-card";

    const img = document.createElement('img');
    // essayer d'abord une image locale images/<slug>.jpg, sinon OMDb, sinon placeholder
    const slug = (movie.Title || '').toString().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    const localPath = `images/${slug}.jpg`;
    img.src = localPath;
    img.alt = movie.Title || 'Poster';
    img.onerror = () => {
      img.onerror = null;
      if (movie.Poster && movie.Poster !== 'N/A') img.src = movie.Poster;
      else img.src = placeholderPoster();
    };
        ? movie.Poster
        : placeholderPoster();
    img.alt = movie.Title || "Poster";

    const title = document.createElement("h3");
    title.textContent = movie.Title || "Titre indisponible";

    const link = document.createElement("a");
    link.href = `movie.html?id=${encodeURIComponent(movie.imdbID || "")}`;
    link.textContent = "En savoir plus";
    link.className = "details-link";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);

    return card;
  }

  async function searchMovies(query, page = 1) {
    if (!API_KEY || API_KEY === "VOTRE_CLE_API") {
      console.error("Clé OMDb manquante : remplace API_KEY dans search.js");
      return null;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erreur réseau");
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Erreur fetch OMDb :", err);
      return null;
    }
  }

  async function displayResults(reset = false) {
    if (reset) {
      container.innerHTML = "";
      currentPage = 1;
    }

    const results = await searchMovies(currentQuery, currentPage);

    if (!results || results.Response === "False" || !results.Search) {
      container.innerHTML = "<p>Aucun résultat.</p>";
      loadBtn.style.display = "none";
      return;
    }

    results.Search.forEach((movie) => {
      container.appendChild(createMovieCard(movie));
    });

    const total = parseInt(results.totalResults || "0", 10);
    if (total > currentPage * 10) {
      loadBtn.style.display = "block";
    } else {
      loadBtn.style.display = "none";
    }
  }

  // Éviter les requêtes trop courtes
  input.addEventListener("input", () => {
    const value = input.value.trim();
    if (value.length < 2) {
      container.innerHTML = "";
      loadBtn.style.display = "none";
      return;
    }
    currentQuery = value;
    currentPage = 1;
    displayResults(true);
  });

  loadBtn.addEventListener("click", () => {
    currentPage += 1;
    displayResults(false);
  });
});
