// Утилиты форматирования для генератора текстов.

import { calcPrice, formatPrice } from "@/lib/routes-data";

/** Парсит "1.5 ч" / "45–75 мин" в человекочитаемый кусок для текста. */
export function durationPhrase(hours: string): string {
  const trimmed = hours.trim();
  if (/мин/i.test(trimmed)) return trimmed; // уже минуты
  // "1.5 ч" -> "1 час 30 минут"
  const m = trimmed.match(/^(\d+(?:[.,]\d+)?)\s*ч/);
  if (!m) return trimmed;
  const num = parseFloat(m[1].replace(",", "."));
  const h = Math.floor(num);
  const min = Math.round((num - h) * 60);
  const parts: string[] = [];
  if (h > 0) parts.push(`${h} ${hoursWord(h)}`);
  if (min > 0) parts.push(`${min} ${minutesWord(min)}`);
  return parts.join(" ") || trimmed;
}

function hoursWord(h: number): string {
  const last = h % 10;
  const lastTwo = h % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return "часов";
  if (last === 1) return "час";
  if (last >= 2 && last <= 4) return "часа";
  return "часов";
}

function minutesWord(m: number): string {
  const last = m % 10;
  const lastTwo = m % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return "минут";
  if (last === 1) return "минута";
  if (last >= 2 && last <= 4) return "минуты";
  return "минут";
}

/** "32 км" -> "32 километра" */
export function kmPhrase(km: number): string {
  const last = km % 10;
  const lastTwo = km % 100;
  let word = "километров";
  if (lastTwo < 11 || lastTwo > 14) {
    if (last === 1) word = "километр";
    else if (last >= 2 && last <= 4) word = "километра";
  }
  return `${km} ${word}`;
}

/** Цена с разделителями: 3500 → "3 500" */
export function priceFromKm(km: number): string {
  return formatPrice(calcPrice(km));
}

/** Цена туда-обратно за день */
export function priceRoundTripFromKm(km: number): string {
  const oneWay = calcPrice(km);
  const ret = Math.max(4000, Math.ceil((oneWay * 0.8) / 500) * 500);
  return formatPrice(oneWay + ret);
}

/** Цена за человека при загрузке 7 — для копирайтов "вместо 2 такси" */
export function pricePerPersonFromKm(km: number, people = 7): string {
  return formatPrice(Math.ceil(calcPrice(km) / people));
}

export const BRAND = "ЗаказМинивена.ru";
export const PHONE = "+7 (918) 587-54-54";

/** Безопасно обрезает заголовок до limit символов на границе слова. */
export function clampTitle(s: string, limit = 70): string {
  if (s.length <= limit) return s;
  const cut = s.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

/** Description: гарантировано 130–160 знаков. */
export function clampDescription(s: string, limit = 160): string {
  if (s.length <= limit) return s;
  const cut = s.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}
