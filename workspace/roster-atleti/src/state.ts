import type { Atleta, Filtro } from "./types";
import { salva, carica } from "./storage";

const stato = {
  atleti: carica() as Atleta[],
  filtro: "tutti" as Filtro,
};

export function getAtleti(): Atleta[] {
  return [...stato.atleti];
}

export function getFiltro(): Filtro {
  return stato.filtro;
}

export function aggiungiAtleta(nome: string, disciplina: string, foto: string): void {
  const trimmedNome = nome.trim();
  const trimmedFoto = foto.trim();
  if (!trimmedNome || !trimmedFoto) return;
  const nuovo: Atleta = {
    id: Date.now(),
    nome: trimmedNome,
    disciplina: disciplina.trim() || "-",
    foto: trimmedFoto,
    inSquadra: false,
  };
  stato.atleti.unshift(nuovo);
  salva(stato.atleti);
}

export function eliminaAtleta(id: number): void {
  stato.atleti = stato.atleti.filter((a) => a.id !== id);
  salva(stato.atleti);
}

export function impostaInSquadra(id: number, inSquadra: boolean): void {
  stato.atleti = stato.atleti.map((a) => (a.id === id ? { ...a, inSquadra } : a));
  salva(stato.atleti);
}

export function impostaFiltro(f: Filtro): void {
  stato.filtro = f;
}

export function getAtletiVisibili(): Atleta[] {
  if (stato.filtro === "tutti") return getAtleti();
  if (stato.filtro === "inSquadra") return getAtleti().filter((a) => a.inSquadra);
  return getAtleti().filter((a) => !a.inSquadra);
}

export function contaInSquadra(): { inSquadra: number; totale: number } {
  const totale = stato.atleti.length;
  const inSquadra = stato.atleti.filter((a) => a.inSquadra).length;
  return { inSquadra, totale };
}
