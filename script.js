let designers = [];
let showShortlistedOnly = false;

const listContainer = document.getElementById("designerList");
const toggleBtn = document.getElementById("toggleShortlist");

toggleBtn.addEventListener("click", () => {
  showShortlistedOnly = !showShortlistedOnly;
  toggleBtn.textContent = showShortlistedOnly ? "Show All" : "Show Shortlisted";
  renderList();
});

function renderList() {
  listContainer.innerHTML = "";

  const filtered = showShortlistedOnly
    ? designers.filter((d) => d.shortlisted)
    : designers;

  filtered.forEach((designer) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${designer.name}</h3>
      <p>${designer.experience} – ${designer.location}</p>
      <button class="shortlist ${
        designer.shortlisted ? "active" : ""
      }" onclick="toggleShortlist(${designer.id})">
        <i class="fas ${
          designer.shortlisted ? "fa-star" : "fa-star-half-alt"
        }"></i>
        ${designer.shortlisted ? "Shortlisted" : "Shortlist"}
      </button>
    `;
    listContainer.appendChild(card);
  });
}

function toggleShortlist(id) {
  designers = designers.map((d) =>
    d.id === id ? { ...d, shortlisted: !d.shortlisted } : d
  );
  renderList();
}

fetch("https://internship-backend-14.onrender.com/api/listings")
  .then((res) => res.json())
  .then((data) => {
    designers = data.map((d) => ({ ...d, shortlisted: false }));
    renderList();
  });
