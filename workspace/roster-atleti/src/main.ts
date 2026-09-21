import { aggiungiAtleta, impostaFiltro } from "./state";
import { renderAtleti } from "./render";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-aggiungi") as HTMLFormElement | null;
  const inputNome = document.getElementById("nome") as HTMLInputElement | null;
  const inputDisc = document.getElementById("disciplina") as HTMLInputElement | null;
  const inputFoto = document.getElementById("foto") as HTMLInputElement | null;

  if (form && inputNome && inputDisc && inputFoto) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      aggiungiAtleta(inputNome.value, inputDisc.value, inputFoto.value);
      inputNome.value = "";
      inputDisc.value = "";
      inputFoto.value = "";
      renderAtleti();
    });
  }

  const bTutti = document.getElementById("f-tutti");
  const bIn = document.getElementById("f-in-squadra");
  const bR = document.getElementById("f-riserve");

  bTutti?.addEventListener("click", () => {
    impostaFiltro("tutti");
    renderAtleti();
  });
  bIn?.addEventListener("click", () => {
    impostaFiltro("inSquadra");
    renderAtleti();
  });
  bR?.addEventListener("click", () => {
    impostaFiltro("riserve");
    renderAtleti();
  });

  renderAtleti();
});
