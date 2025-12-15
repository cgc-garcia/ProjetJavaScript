const API_KEY = "VOTRE_CLE_API"; // Remplacez par votre clé OMDb

const trendingMovies = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "Avatar",
  "Avengers",
  "Guardians of the Galaxy",
  "Harry Potter",
  "The Matrix",
];

let moviesDisplayed = 0;
const moviesPerLoad = 3;

const container = document.getElementById("trending-movies");
const loadBtn = document.getElementById("loadMore");

function placeholder(text = "Pas de poster") {
  return `https://via.placeholder.com/300x450?text=${encodeURIComponent(text)}`;
}

async function fetchMovieDetails(title) {
  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
      title
    )}&plot=short`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur réseau");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erreur fetchMovieDetails:", err);
    return null;
  }
}

function createCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const img = document.createElement("img");
  // essayer une image locale d'abord (images/<slug>.jpg), sinon OMDb, sinon placeholder
  const slug = (movie.Title || "")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const localPath = `images/${slug}.jpg`;
  img.src = localPath;
  img.alt = movie.Title ? `${movie.Title} — poster` : "Poster";
  img.onerror = () => {
    img.onerror = null; // éviter boucle
    if (movie.Poster && movie.Poster !== "N/A") img.src = movie.Poster;
    else img.src = placeholder();
  };

  const title = document.createElement("h3");
  title.textContent = movie.Title || "Titre indisponible";

  const plot = document.createElement("p");
  if (movie.Plot && movie.Plot !== "N/A") plot.textContent = movie.Plot;

  const a = document.createElement("a");
  a.href = `movie.html?title=${encodeURIComponent(movie.Title || "")}`;
  a.className = "details-link";
  a.textContent = "En savoir plus";

  card.appendChild(img);
  card.appendChild(title);
  if (plot.textContent) card.appendChild(plot);
  card.appendChild(a);

  return card;
}

async function loadTrendingMovies() {
  if (!container || !loadBtn) return;

  loadBtn.disabled = true;
  loadBtn.textContent = "Chargement...";

  const moviesToLoad = trendingMovies.slice(
    moviesDisplayed,
    moviesDisplayed + moviesPerLoad
  );
  let loadedCount = 0;

  for (const title of moviesToLoad) {
    const movie = await fetchMovieDetails(title);
    if (movie && movie.Response === "True") {
      container.appendChild(createCard(movie));
      loadedCount += 1;
    } else {
      const fallback = document.createElement("div");
      fallback.className = "movie-card";
      fallback.textContent = `${title} — informations indisponibles.`;
      container.appendChild(fallback);
      loadedCount += 1;
    }
  }

  moviesDisplayed += loadedCount;

  if (moviesDisplayed >= trendingMovies.length) {
    loadBtn.style.display = "none";
  } else {
    loadBtn.disabled = false;
    loadBtn.textContent = "Charger plus";
  }
}

if (loadBtn) loadBtn.addEventListener("click", loadTrendingMovies);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadTrendingMovies);
} else {
  loadTrendingMovies();
}
