document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search.includes("reset=true")) {
    localStorage.removeItem("cwgVaultAccessTime");
  }

  const bootScreen = document.getElementById("boot-screen");
  const site = document.getElementById("site");
  const enterButton = document.getElementById("enter-vault-btn");

  renderStrains();
  renderProjects();
  setupVaultNavigation();

  const accessTime = Number(localStorage.getItem("cwgVaultAccessTime"));
  const now = Date.now();
  const sixHours = 6 * 60 * 60 * 1000;

  const hasRecentAccess = accessTime && now - accessTime < sixHours;

  if (hasRecentAccess) {
    bootScreen.classList.add("hidden");
    site.classList.remove("hidden");
    return;
  }

  bootScreen.classList.remove("hidden");
  site.classList.add("hidden");

  runVaultBoot();
  enterButton.addEventListener("click", enterVault);
});

function renderStrains() {
  const grid = document.getElementById("strain-grid");
  if (!grid || !Array.isArray(strains)) return;

  grid.innerHTML = strains
    .map((strain, index) => {
      return `
        <article class="vault-card">
          <div class="card-content">
            <div class="card-kicker">FILE ${String(index + 1).padStart(2, "0")} // ${strain.status}</div>
            <h3>${strain.name}</h3>
            <div class="card-meta">${strain.type} · ${strain.genetics}</div>
            <p>${strain.description}</p>
            <div class="tag-row">
              ${strain.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <button class="card-button" data-screen="access-screen">Request Access</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderProjects() {
  const wormholeGrid = document.getElementById("wormhole-grid");
  if (!wormholeGrid || !Array.isArray(projects)) return;

  wormholeGrid.innerHTML = projects
    .map((project, index) => {
      return `
        <article class="vault-card">
          <div class="card-content">
            <div class="card-kicker">PORTAL ${String(index + 1).padStart(2, "0")} // ${project.status}</div>
            <h3>${project.name}</h3>
            <div class="card-meta">${project.category}</div>
            <p>${project.description}</p>
            ${
              project.url && project.url !== "#"
                ? `<a href="${project.url}" class="card-button" target="_blank" rel="noopener">Open Portal</a>`
                : `<span class="card-button disabled-button">Portal Pending</span>`
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function setupVaultNavigation() {
  const buttons = document.querySelectorAll("[data-screen]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const screenId = button.dataset.screen;
      showScreen(screenId);
    });
  });
}

function showScreen(screenId) {
  const target = document.getElementById(screenId);
  if (!target) return;

  document
    .querySelectorAll(".vault-screen")
    .forEach((screen) => screen.classList.remove("active-screen"));

  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));

  target.classList.add("active-screen");

  const activeNav = document.querySelector(`.nav-btn[data-screen="${screenId}"]`);
  if (activeNav) activeNav.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}
