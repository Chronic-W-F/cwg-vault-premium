document.addEventListener("DOMContentLoaded", () => {
  const hasAccess = sessionStorage.getItem("cwgVaultAccess") === "granted";
  const bootScreen = document.getElementById("boot-screen");
  const site = document.getElementById("site");
  const enterButton = document.getElementById("enter-vault-btn");

  renderStrains();
  renderProjects();
  renderArchive();

  if (hasAccess) {
    bootScreen.classList.add("hidden");
    site.classList.remove("hidden");
  } else {
    runVaultBoot();
    enterButton.addEventListener("click", enterVault);
  }
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
            <a href="#contact" class="card-button">Request Access</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  const wormholeGrid = document.getElementById("wormhole-grid");

  if (!Array.isArray(projects)) return;

  const projectCards = projects
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

  if (grid) {
    grid.innerHTML = projectCards;
  }

  if (wormholeGrid) {
    wormholeGrid.innerHTML = projectCards;
  }
}

function renderArchive() {
  const grid = document.getElementById("archive-grid");
  if (!grid || !Array.isArray(archiveItems)) return;

  grid.innerHTML = archiveItems
    .map((item, index) => {
      return `
        <article class="vault-card">
          <div class="card-content">
            <div class="card-kicker">ARCHIVE ${String(index + 1).padStart(2, "0")} // ${item.status}</div>
            <h3>${item.name}</h3>
            <div class="card-meta">${item.type}</div>
            <p>${item.description}</p>
            <div class="tag-row">
              ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}
