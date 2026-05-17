// Кастомные POI (Point of Interest) — аэропорты и значимые точки.
// Поиск по алиасам встроен в подсказки DaData в dadataOsrmService.

export interface POIEntry {
  name: string;
  aliases: string[];
  lat: number;
  lon: number;
  type: "airport" | "border" | "station" | "resort";
  iata?: string;
}

export const CUSTOM_POI: POIEntry[] = [
  // ─── 14 IATA-аэропортов основного покрытия ───
  { name: "Москва, Аэропорт Шереметьево (SVO)", aliases: ["шереметьево", "svo", "москва аэропорт"], lat: 55.97260, lon: 37.41460, type: "airport", iata: "SVO" },
  { name: "Москва, Аэропорт Домодедово (DME)", aliases: ["домодедово", "dme"], lat: 55.40840, lon: 37.90630, type: "airport", iata: "DME" },
  { name: "Москва, Аэропорт Внуково (VKO)", aliases: ["внуково", "vko"], lat: 55.59610, lon: 37.27150, type: "airport", iata: "VKO" },
  { name: "Москва, Аэропорт Жуковский (ZIA)", aliases: ["жуковский аэропорт", "zia", "раменское"], lat: 55.55330, lon: 38.15000, type: "airport", iata: "ZIA" },
  { name: "Санкт-Петербург, Аэропорт Пулково (LED)", aliases: ["пулково", "led", "спб аэропорт", "питер аэропорт"], lat: 59.80030, lon: 30.26250, type: "airport", iata: "LED" },
  { name: "Сочи, Аэропорт Адлер (AER)", aliases: ["адлер аэропорт", "aer", "сочи аэропорт", "адлер"], lat: 43.44990, lon: 39.95660, type: "airport", iata: "AER" },
  { name: "Минеральные Воды, Аэропорт (MRV)", aliases: ["минводы аэропорт", "mrv", "минеральные воды аэропорт", "кмв аэропорт"], lat: 44.21910, lon: 43.08130, type: "airport", iata: "MRV" },
  { name: "Анапа, Аэропорт Витязево (AAQ)", aliases: ["витязево", "aaq", "анапа аэропорт"], lat: 45.00210, lon: 37.34730, type: "airport", iata: "AAQ" },
  { name: "Краснодар, Аэропорт Пашковский (KRR)", aliases: ["пашковский", "krr", "краснодар аэропорт"], lat: 45.03470, lon: 39.17050, type: "airport", iata: "KRR" },
  { name: "Симферополь, Аэропорт (SIP)", aliases: ["симферополь аэропорт", "sip", "крым аэропорт"], lat: 45.05220, lon: 33.97510, type: "airport", iata: "SIP" },
  { name: "Калининград, Аэропорт Храброво (KGD)", aliases: ["храброво", "kgd", "калининград аэропорт"], lat: 54.88960, lon: 20.59260, type: "airport", iata: "KGD" },
  { name: "Казань, Аэропорт (KZN)", aliases: ["казань аэропорт", "kzn"], lat: 55.60620, lon: 49.27870, type: "airport", iata: "KZN" },
  { name: "Екатеринбург, Аэропорт Кольцово (SVX)", aliases: ["кольцово", "svx", "екатеринбург аэропорт", "екб аэропорт"], lat: 56.74310, lon: 60.80260, type: "airport", iata: "SVX" },
  { name: "Новосибирск, Аэропорт Толмачёво (OVB)", aliases: ["толмачёво", "толмачево", "ovb", "новосибирск аэропорт"], lat: 55.01260, lon: 82.65070, type: "airport", iata: "OVB" },
  { name: "Иркутск, Аэропорт (IKT)", aliases: ["иркутск аэропорт", "ikt"], lat: 52.26800, lon: 104.38890, type: "airport", iata: "IKT" },
  { name: "Мурманск, Аэропорт Мурмаши (MMK)", aliases: ["мурмаши", "mmk", "мурманск аэропорт"], lat: 68.78170, lon: 32.75080, type: "airport", iata: "MMK" },

  // ─── Курорты и популярные точки назначения ───
  { name: "Сочи, Красная Поляна", aliases: ["красная поляна", "krasnaya polyana"], lat: 43.67700, lon: 40.20660, type: "resort" },
  { name: "Сочи, Роза Хутор", aliases: ["роза хутор", "rosa khutor"], lat: 43.66980, lon: 40.29870, type: "resort" },
  { name: "Республика Карелия, Сортавала", aliases: ["сортавала"], lat: 61.70410, lon: 30.69430, type: "resort" },
  { name: "Республика Карелия, Горный парк Рускеала", aliases: ["рускеала", "горный парк"], lat: 61.94750, lon: 30.58880, type: "resort" },
  { name: "Кисловодск, центр", aliases: ["кисловодск"], lat: 43.90550, lon: 42.71640, type: "resort" },
  { name: "Пятигорск, центр", aliases: ["пятигорск"], lat: 44.04860, lon: 43.05940, type: "resort" },
  { name: "Ессентуки, центр", aliases: ["ессентуки"], lat: 44.04420, lon: 42.86010, type: "resort" },
  { name: "Архыз, горнолыжный курорт", aliases: ["архыз"], lat: 43.55310, lon: 41.27680, type: "resort" },
  { name: "Домбай, горнолыжный курорт", aliases: ["домбай"], lat: 43.29770, lon: 41.62880, type: "resort" },
  { name: "Приэльбрусье, Терскол", aliases: ["приэльбрусье", "терскол", "эльбрус"], lat: 43.25500, lon: 42.51910, type: "resort" },
  { name: "Республика Крым, Ялта", aliases: ["ялта"], lat: 44.49520, lon: 34.16630, type: "resort" },
  { name: "Республика Крым, Алушта", aliases: ["алушта"], lat: 44.66520, lon: 34.41020, type: "resort" },
  { name: "Республика Крым, Севастополь", aliases: ["севастополь"], lat: 44.61660, lon: 33.52540, type: "resort" },
  { name: "Краснодарский край, Геленджик", aliases: ["геленджик"], lat: 44.56110, lon: 38.07730, type: "resort" },
  { name: "Калининградская область, Куршская коса", aliases: ["куршская коса", "куршская"], lat: 55.18470, lon: 20.85540, type: "resort" },
  { name: "Калининградская область, Зеленоградск", aliases: ["зеленоградск"], lat: 54.95940, lon: 20.47640, type: "resort" },
  { name: "Калининградская область, Светлогорск", aliases: ["светлогорск"], lat: 54.94380, lon: 20.13860, type: "resort" },
  { name: "Иркутская область, Листвянка", aliases: ["листвянка"], lat: 51.84640, lon: 104.86810, type: "resort" },
  { name: "Иркутская область, Ольхон (Хужир)", aliases: ["ольхон", "хужир"], lat: 53.20290, lon: 107.34330, type: "resort" },
  { name: "Мурманская область, Териберка", aliases: ["териберка"], lat: 69.16770, lon: 35.13150, type: "resort" },
  { name: "Республика Карелия, Кижи", aliases: ["кижи"], lat: 62.07050, lon: 35.21420, type: "resort" },
  { name: "Республика Карелия, Валаам", aliases: ["валаам"], lat: 61.38780, lon: 30.93310, type: "resort" },
];

const norm = (s: string) =>
  s.toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9\s-]/g, "").replace(/\s+/g, " ").trim();

export function searchPOI(query: string): POIEntry[] {
  const q = norm(query);
  if (q.length < 2) return [];
  const results: Array<{ poi: POIEntry; score: number }> = [];
  for (const poi of CUSTOM_POI) {
    let score = 0;
    if (norm(poi.name).includes(q)) score = 3;
    for (const a of poi.aliases) {
      if (norm(a) === q) {
        score = Math.max(score, 5);
        break;
      }
      if (norm(a).startsWith(q)) score = Math.max(score, 4);
      else if (norm(a).includes(q)) score = Math.max(score, 2);
    }
    if (poi.iata && norm(poi.iata) === q) score = Math.max(score, 5);
    if (score > 0) results.push({ poi, score });
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 5).map((r) => r.poi);
}
