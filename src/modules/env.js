// Preferências do dispositivo e utilidades compartilhadas.
export const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const FINE_POINTER = matchMedia("(pointer: fine)").matches;

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
export const host = (u) => u.replace(/^https?:\/\//, "");
