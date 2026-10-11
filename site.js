const entries = [
  { title: "Ensayos", description: "Ensayos para pensar el tiempo, la existencia y lo que nos hace humanos.", href: "ensayos/" },
  { title: "Investigación", description: "Meditaciones sobre la naturaleza del tiempo", href: "investigacion/" },
  { title: "Marte", description: "Una novela de historia alternativa ambientada en Marte, en 1978.", href: "marte/" },
  { title: "Autor", description: "Juani", href: "autor/" },
];
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const dialog = document.querySelector("#search-dialog");
const input = document.querySelector("#site-search");
const results = document.querySelector("#search-results");
const base = document.body.dataset.base || "";

function renderResults() {
  const query = input.value;
  const matches = entries.filter(entry => normalize(`${entry.title} ${entry.description}`).includes(normalize(query)));
  results.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "no-results";
    empty.textContent = `No se encontraron secciones para «${query}».`;
    results.append(empty);
    return;
  }
  for (const entry of matches) {
    const link = document.createElement("a");
    link.href = `${base}${entry.href}`;
    const title = document.createElement("span");
    title.textContent = entry.title;
    const description = document.createElement("small");
    description.textContent = entry.description;
    link.append(title, description);
    results.append(link);
  }
}

document.querySelector("[data-open-search]")?.addEventListener("click", () => {
  renderResults();
  dialog.showModal();
  input.focus();
});
document.querySelector("[data-close-search]")?.addEventListener("click", () => dialog.close());
input?.addEventListener("input", renderResults);
dialog?.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
