import type { Atleta } from "./types";

const KEY = "roster_atleti_v1";

export function salva(atleti: Atleta[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(atleti));
  } catch (e) {
    console.error("Errore salvataggio localStorage", e);
  }
}

export function carica(): Atleta[] {
  try {
    const s = localStorage.getItem(KEY);
    return s ? JSON.parse(s) : [];
  } catch (e) {
    console.error("Errore caricamento localStorage", e);
    return [];
  }
}
