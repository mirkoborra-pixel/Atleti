import { getAtletiVisibili, impostaInSquadra, eliminaAtleta } from "./state";
import type { Atleta } from "./types";

export function renderAtleti(): void {
  const lista = document.getElementById("lista");
  const contatore = document.getElementById("contatore");
  if (!lista) return;
  lista.innerHTML = "";

  const atleti = getAtletiVisibili();

  atleti.forEach((a) => {
    const card = document.createElement("article");
    card.className = "card" + (a.inSquadra ? " in-squadra" : "");

    const img = document.createElement("img");
    img.src = a.foto;
    img.alt = a.nome;
    img.width = 150;
    img.height = 150;
    img.addEventListener("error", () => {
      img.src = "https://picsum.photos/150?grayscale"; // immagine alternativa semplice
    });

    const nome = document.createElement("h3");
    nome.textContent = a.nome;

    const disciplina = document.createElement("p");
    disciplina.textContent = a.disciplina;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = a.inSquadra;
    checkbox.addEventListener("change", () => {
      impostaInSquadra(a.id, checkbox.checked);
      renderAtleti();
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" In squadra"));

    const btnElimina = document.createElement("button");
    btnElimina.textContent = "Elimina";
    btnElimina.addEventListener("click", () => {
      if (confirm("Eliminare questo atleta?")) {
        eliminaAtleta(a.id);
        renderAtleti();
      }
    });

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(disciplina);
    card.appendChild(label);
    card.appendChild(btnElimina);

    lista.appendChild(card);
  });

  if (contatore) {
    // aggiorna contatore semplice
    const all = (document.getElementById("lista")?.childElementCount) ?? 0;
    const inSquadra = getAtletiVisibili().filter((a) => a.inSquadra).length;
    contatore.textContent = `${inSquadra} atleti in squadra su ${all}`;
  }
}
