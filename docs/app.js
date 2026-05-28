const data = window.PORTFOLIO_DATA;

const state = {
  filter: "all",
  search: "",
};

const filters = [
  ["all", "All"],
  ["app-store", "App Store"],
  ["google-play", "Google Play"],
  ["irem", "Irem"],
  ["eralp", "Eralp"],
  ["2026", "2026"],
  ["2025", "2025"],
  ["2024", "2024"],
  ["2023", "2023"],
];

const byId = (id) => document.getElementById(id);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function iconMarkup(game, className = "icon") {
  if (game.icon) {
    return `<img class="${className}" src="${escapeHtml(game.icon)}" alt="${escapeHtml(game.name)} icon" loading="lazy">`;
  }
  return `<span class="${className} fallback-icon" aria-hidden="true">${escapeHtml(initials(game.name))}</span>`;
}

function imageMarkup(src, alt, className = "") {
  return `<img class="${className}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`;
}

function roleChips(game) {
  return game.contributors
    .map((person) => {
      const variant = person.name.toLowerCase().includes("eralp") ? "violet" : "alt";
      return `<span class="chip ${variant}">${escapeHtml(person.name.split(" ")[0])}</span>`;
    })
    .join("");
}

function genreChips(game, limit = 2) {
  return (game.genres || [])
    .filter((genre) => genre !== "Games")
    .slice(0, limit)
    .map((genre) => `<span class="chip">${escapeHtml(genre)}</span>`)
    .join("");
}

function platformChip(game) {
  return `<span class="chip">${escapeHtml(game.platform)}</span>`;
}

function metaLine(game) {
  const parts = [game.year, game.platform, game.versionCount ? `${game.versionCount} versions` : ""].filter(Boolean);
  return parts.join(" / ");
}

function featuredGames() {
  const order = new Map(data.featuredOrder.map((name, index) => [name, index]));
  return data.games
    .filter((game) => game.featured)
    .sort((a, b) => (order.get(a.name) ?? 99) - (order.get(b.name) ?? 99));
}

function bestImages(game, limit = 4) {
  const shots = [...(game.screenshots || [])];
  if (!shots.length && game.icon) {
    shots.push(game.icon);
  }
  return shots.slice(0, limit);
}

function renderStats() {
  byId("stat-total").textContent = data.stats.totalGames;
  byId("stat-years").textContent = data.stats.yearRange;
  byId("stat-platforms").textContent = `${data.stats.appStoreGames}/${data.stats.googlePlayGames}`;
  byId("stat-versions").textContent = data.stats.totalVersionCount;
}

function renderHero() {
  if (!byId("hero-collage")) return;
  const images = featuredGames().flatMap((game) => bestImages(game, 2)).slice(0, 7);
  byId("hero-collage").innerHTML = images
    .map((src, index) => imageMarkup(src, `Featured game screenshot ${index + 1}`))
    .join("");
}

function renderFeatured() {
  if (!byId("featured-grid")) return;
  byId("featured-grid").innerHTML = featuredGames()
    .map((game) => {
      const images = bestImages(game, 4);
      return `
        <article class="featured-card">
          <div class="featured-media">
            ${images.map((src) => imageMarkup(src, `${game.name} screenshot`)).join("")}
          </div>
          <div class="featured-content">
            <div class="project-topline">
              ${iconMarkup(game)}
              <div>
                <h3>${escapeHtml(game.name)}</h3>
                <p class="muted">${escapeHtml(metaLine(game))}</p>
              </div>
            </div>
            <p class="description">${escapeHtml(game.description || "A released mobile game project from the portfolio catalog.")}</p>
            <div class="chip-row">
              ${platformChip(game)}
              ${roleChips(game)}
              ${genreChips(game)}
            </div>
            <div class="project-actions">
              <a class="store-link" href="${escapeHtml(game.storeUrl)}" target="_blank" rel="noreferrer">Open store page</a>
              <button class="filter-button" type="button" data-open="${escapeHtml(game.slug)}">Details</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderFilters() {
  byId("filter-bar").innerHTML = filters
    .map(
      ([key, label]) => `
        <button class="filter-button ${state.filter === key ? "is-active" : ""}" type="button" data-filter="${key}">
          ${label}
        </button>
      `,
    )
    .join("");
}

function matchesFilter(game) {
  if (state.filter === "all") return true;
  if (state.filter === "featured") return game.featured;
  if (state.filter === "app-store") return game.platform === "App Store";
  if (state.filter === "google-play") return game.platform === "Google Play";
  if (state.filter === "irem") return game.contributors.some((person) => person.name.toLowerCase().includes("irem"));
  if (state.filter === "eralp") return game.contributors.some((person) => person.name.toLowerCase().includes("eralp"));
  return String(game.year) === state.filter;
}

function matchesSearch(game) {
  if (!state.search) return true;
  const haystack = [
    game.name,
    game.platform,
    game.seller,
    game.year,
    ...(game.genres || []),
    ...game.contributors.map((person) => person.name),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(state.search);
}

function sortedGames() {
  return data.games
    .filter((game) => matchesFilter(game) && matchesSearch(game))
    .sort((a, b) => {
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
      return a.name.localeCompare(b.name);
    });
}

function renderLibrary() {
  const games = sortedGames();
  byId("library-grid").innerHTML =
    games
      .map((game) => {
        const shots = bestImages(game, 3);
        return `
          <article class="game-card" tabindex="0" role="button" data-open="${escapeHtml(game.slug)}">
            <div class="card-topline">
              ${iconMarkup(game)}
              <div>
                <h3>${escapeHtml(game.name)}</h3>
                <p class="muted">${escapeHtml(metaLine(game))}</p>
              </div>
            </div>
            <div class="mini-shots">
              ${shots.map((src) => imageMarkup(src, `${game.name} screenshot`)).join("")}
            </div>
            <div class="chip-row">
              ${platformChip(game)}
              ${roleChips(game)}
            </div>
          </article>
        `;
      })
      .join("") || `<p class="muted">No games match the current filter.</p>`;
}

function renderTeam() {
  byId("team-grid").innerHTML = data.contributors
    .map(
      (person) => `
        <article class="member-card">
          <p class="eyebrow">${escapeHtml(person.role)}</p>
          <h3>${escapeHtml(person.name)}</h3>
          <p class="muted">${escapeHtml(teamSummary(person.name))}</p>
          <ul>
            ${person.focus.map((item) => `<li class="chip">${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function teamSummary(name) {
  if (name.toLowerCase().includes("eralp")) {
    return "Owns gameplay implementation, mobile game systems, build readiness, and technical iteration across partner projects.";
  }
  return "Shapes concepts, levels, puzzle flows, and marketable mechanics from early ideation through store-ready presentation.";
}

function openDialog(slug) {
  const game = data.games.find((item) => item.slug === slug);
  if (!game) return;

  const images = bestImages(game, 4);
  byId("dialog-content").innerHTML = `
    <div class="dialog-layout">
      <div class="dialog-gallery">
        ${images.map((src) => imageMarkup(src, `${game.name} screenshot`)).join("")}
      </div>
      <div class="dialog-body">
        <div class="project-topline">
          ${iconMarkup(game)}
          <div>
            <h2 id="dialog-title">${escapeHtml(game.name)}</h2>
            <p class="muted">${escapeHtml(metaLine(game))}</p>
          </div>
        </div>
        <p>${escapeHtml(game.description || "A released mobile game project from the portfolio catalog.")}</p>
        <div class="chip-row">
          ${platformChip(game)}
          ${roleChips(game)}
          ${genreChips(game, 4)}
        </div>
        <dl class="detail-list">
          <dt>Seller</dt>
          <dd>${escapeHtml(game.seller || "Listed on store page")}</dd>
          <dt>Release date</dt>
          <dd>${escapeHtml(game.releaseDate || "N/A")}</dd>
          <dt>Store ID</dt>
          <dd>${escapeHtml(game.storeId || game.packageId || "N/A")}</dd>
        </dl>
        <div class="project-actions">
          <a class="store-link" href="${escapeHtml(game.storeUrl)}" target="_blank" rel="noreferrer">Open store page</a>
        </div>
      </div>
    </div>
  `;
  byId("game-dialog").showModal();
}

function wireEvents() {
  document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      state.filter = filterButton.dataset.filter;
      renderFilters();
      renderLibrary();
      return;
    }

    const openButton = event.target.closest("[data-open]");
    if (openButton) {
      openDialog(openButton.dataset.open);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const card = event.target.closest(".game-card[data-open]");
    if (card) {
      openDialog(card.dataset.open);
    }
  });

  byId("search-input").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderLibrary();
  });

  document.querySelector(".dialog-close").addEventListener("click", () => {
    byId("game-dialog").close();
  });
}

function init() {
  renderStats();
  renderHero();
  renderFeatured();
  renderFilters();
  renderLibrary();
  renderTeam();
  wireEvents();
}

init();
