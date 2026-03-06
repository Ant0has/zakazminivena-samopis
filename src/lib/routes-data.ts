export interface RouteData {
  from: string;
  to: string;
  slug: string;
  km: number;
  hours: string;
  fromSlug: string;
  toSlug: string;
}

// Цена = Math.ceil((km * 60) / 500) * 500
export function calcPrice(km: number): number {
  return Math.ceil((km * 60) / 500) * 500;
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU");
}

export function pricePerPerson(km: number, people: number = 7): string {
  return Math.ceil(calcPrice(km) / people).toLocaleString("ru-RU");
}

// Все маршруты — данные из базы city2city.ru
export const allRoutes: RouteData[] = [
  // === КУРОРТНЫЕ (приоритет A) ===
  { from: "Адлер", to: "Роза Хутор", slug: "adler-roza-khutor", km: 45, hours: "1 ч", fromSlug: "sochi", toSlug: "sochi" },
  { from: "Сочи", to: "Красная Поляна", slug: "sochi-krasnaya-polyana", km: 70, hours: "1.5 ч", fromSlug: "sochi", toSlug: "sochi" },
  { from: "Симферополь", to: "Ялта", slug: "simferopol-yalta", km: 82, hours: "1.5 ч", fromSlug: "simferopol", toSlug: "yalta" },
  { from: "Симферополь", to: "Алушта", slug: "simferopol-alushta", km: 60, hours: "1 ч", fromSlug: "simferopol", toSlug: "simferopol" },
  { from: "Симферополь", to: "Евпатория", slug: "simferopol-evpatoriya", km: 65, hours: "1 ч", fromSlug: "simferopol", toSlug: "simferopol" },
  { from: "Симферополь", to: "Феодосия", slug: "simferopol-feodosiya", km: 115, hours: "2 ч", fromSlug: "simferopol", toSlug: "simferopol" },
  { from: "Симферополь", to: "Судак", slug: "simferopol-sudak", km: 100, hours: "1.5 ч", fromSlug: "simferopol", toSlug: "simferopol" },
  { from: "Симферополь", to: "Севастополь", slug: "simferopol-sevastopol", km: 80, hours: "1.5 ч", fromSlug: "simferopol", toSlug: "simferopol" },
  { from: "Краснодар", to: "Сочи", slug: "krasnodar-sochi", km: 320, hours: "5 ч", fromSlug: "krasnodar", toSlug: "sochi" },
  { from: "Краснодар", to: "Адлер", slug: "krasnodar-adler", km: 350, hours: "5.5 ч", fromSlug: "krasnodar", toSlug: "sochi" },
  { from: "Краснодар", to: "Симферополь", slug: "krasnodar-simferopol", km: 440, hours: "6.5 ч", fromSlug: "krasnodar", toSlug: "simferopol" },
  { from: "Краснодар", to: "Анапа", slug: "krasnodar-anapa", km: 165, hours: "2.5 ч", fromSlug: "krasnodar", toSlug: "krasnodar" },
  { from: "Краснодар", to: "Геленджик", slug: "krasnodar-gelendzhik", km: 200, hours: "3 ч", fromSlug: "krasnodar", toSlug: "krasnodar" },
  { from: "Краснодар", to: "Новороссийск", slug: "krasnodar-novorossiysk", km: 165, hours: "2.5 ч", fromSlug: "krasnodar", toSlug: "krasnodar" },
  { from: "Краснодар", to: "Ялта", slug: "krasnodar-yalta", km: 500, hours: "7.5 ч", fromSlug: "krasnodar", toSlug: "yalta" },
  { from: "Ростов", to: "Краснодар", slug: "rostov-krasnodar", km: 275, hours: "4 ч", fromSlug: "rostov", toSlug: "krasnodar" },
  { from: "Ростов", to: "Сочи", slug: "rostov-sochi", km: 550, hours: "8 ч", fromSlug: "rostov", toSlug: "sochi" },
  { from: "Ростов", to: "Адлер", slug: "rostov-adler", km: 570, hours: "8 ч", fromSlug: "rostov", toSlug: "sochi" },
  { from: "Ростов", to: "Анапа", slug: "rostov-anapa", km: 430, hours: "6 ч", fromSlug: "rostov", toSlug: "krasnodar" },
  { from: "Москва", to: "Сочи", slug: "moskva-sochi", km: 1650, hours: "20 ч", fromSlug: "moskva", toSlug: "sochi" },

  // === КМВ / Горнолыжные ===
  { from: "Минеральные Воды", to: "Домбай", slug: "mineralnye-vody-dombay", km: 200, hours: "3.5 ч", fromSlug: "mineralnye-vody", toSlug: "mineralnye-vody" },
  { from: "Минеральные Воды", to: "Кисловодск", slug: "mineralnye-vody-kislovodsk", km: 60, hours: "1 ч", fromSlug: "mineralnye-vody", toSlug: "mineralnye-vody" },
  { from: "Минеральные Воды", to: "Пятигорск", slug: "mineralnye-vody-pyatigorsk", km: 25, hours: "0.5 ч", fromSlug: "mineralnye-vody", toSlug: "mineralnye-vody" },
  { from: "Минеральные Воды", to: "Нальчик", slug: "mineralnye-vody-nalchik", km: 80, hours: "1.5 ч", fromSlug: "mineralnye-vody", toSlug: "mineralnye-vody" },

  // === МЕЖГОРОДСКИЕ (приоритет B-C) ===
  { from: "Казань", to: "Самара", slug: "kazan-samara", km: 375, hours: "5.5 ч", fromSlug: "kazan", toSlug: "samara" },
  { from: "Самара", to: "Казань", slug: "samara-kazan", km: 365, hours: "5 ч", fromSlug: "samara", toSlug: "kazan" },
  { from: "Екатеринбург", to: "Челябинск", slug: "ekaterinburg-chelyabinsk", km: 210, hours: "3 ч", fromSlug: "ekaterinburg", toSlug: "chelyabinsk" },
  { from: "Челябинск", to: "Екатеринбург", slug: "chelyabinsk-ekaterinburg", km: 210, hours: "3 ч", fromSlug: "chelyabinsk", toSlug: "ekaterinburg" },
  { from: "Екатеринбург", to: "Тюмень", slug: "ekaterinburg-tyumen", km: 330, hours: "4.5 ч", fromSlug: "ekaterinburg", toSlug: "tyumen" },
  { from: "Тюмень", to: "Екатеринбург", slug: "tyumen-ekaterinburg", km: 330, hours: "4.5 ч", fromSlug: "tyumen", toSlug: "ekaterinburg" },
  { from: "Екатеринбург", to: "Пермь", slug: "ekaterinburg-perm", km: 360, hours: "5 ч", fromSlug: "ekaterinburg", toSlug: "perm" },
  { from: "Екатеринбург", to: "Курган", slug: "ekaterinburg-kurgan", km: 365, hours: "5 ч", fromSlug: "ekaterinburg", toSlug: "ekaterinburg" },
  { from: "Казань", to: "Нижний Новгород", slug: "kazan-nizhniy-novgorod", km: 420, hours: "6 ч", fromSlug: "kazan", toSlug: "nizhniy-novgorod" },
  { from: "Нижний Новгород", to: "Казань", slug: "nizhniy-novgorod-kazan", km: 390, hours: "5.5 ч", fromSlug: "nizhniy-novgorod", toSlug: "kazan" },
  { from: "Казань", to: "Екатеринбург", slug: "kazan-ekaterinburg", km: 865, hours: "12.5 ч", fromSlug: "kazan", toSlug: "ekaterinburg" },

  // === МОСКВА ===
  { from: "Москва", to: "Санкт-Петербург", slug: "moskva-spb", km: 700, hours: "10 ч", fromSlug: "moskva", toSlug: "spb" },
  { from: "Санкт-Петербург", to: "Москва", slug: "spb-moskva", km: 705, hours: "10 ч", fromSlug: "spb", toSlug: "moskva" },
  { from: "Москва", to: "Нижний Новгород", slug: "moskva-nizhniy-novgorod", km: 460, hours: "6.5 ч", fromSlug: "moskva", toSlug: "nizhniy-novgorod" },
  { from: "Нижний Новгород", to: "Москва", slug: "nizhniy-novgorod-moskva", km: 440, hours: "6.5 ч", fromSlug: "nizhniy-novgorod", toSlug: "moskva" },
  { from: "Москва", to: "Воронеж", slug: "moskva-voronezh", km: 515, hours: "7.5 ч", fromSlug: "moskva", toSlug: "voronezh" },
  { from: "Воронеж", to: "Москва", slug: "voronezh-moskva", km: 515, hours: "7.5 ч", fromSlug: "voronezh", toSlug: "moskva" },
  { from: "Москва", to: "Казань", slug: "moskva-kazan", km: 805, hours: "11.5 ч", fromSlug: "moskva", toSlug: "kazan" },
  { from: "Казань", to: "Москва", slug: "kazan-moskva", km: 810, hours: "11.5 ч", fromSlug: "kazan", toSlug: "moskva" },
  { from: "Москва", to: "Ярославль", slug: "moskva-yaroslavl", km: 265, hours: "4 ч", fromSlug: "moskva", toSlug: "yaroslavl" },
  { from: "Ярославль", to: "Москва", slug: "yaroslavl-moskva", km: 265, hours: "4 ч", fromSlug: "yaroslavl", toSlug: "moskva" },
  { from: "Москва", to: "Суздаль", slug: "moskva-suzdal", km: 230, hours: "3.5 ч", fromSlug: "moskva", toSlug: "moskva" },
  { from: "Москва", to: "Владимир", slug: "moskva-vladimir", km: 185, hours: "2.5 ч", fromSlug: "moskva", toSlug: "moskva" },
  { from: "Москва", to: "Тверь", slug: "moskva-tver", km: 165, hours: "2.5 ч", fromSlug: "moskva", toSlug: "moskva" },
  { from: "Москва", to: "Тула", slug: "moskva-tula", km: 185, hours: "2.5 ч", fromSlug: "moskva", toSlug: "moskva" },
  { from: "Москва", to: "Рязань", slug: "moskva-ryazan", km: 200, hours: "3 ч", fromSlug: "moskva", toSlug: "moskva" },
  { from: "Москва", to: "Калуга", slug: "moskva-kaluga", km: 220, hours: "3 ч", fromSlug: "moskva", toSlug: "moskva" },
  { from: "Москва", to: "Кострома", slug: "moskva-kostroma", km: 350, hours: "5 ч", fromSlug: "moskva", toSlug: "moskva" },

  // === СПБ ===
  { from: "Санкт-Петербург", to: "Великий Новгород", slug: "spb-velikiy-novgorod", km: 195, hours: "3 ч", fromSlug: "spb", toSlug: "spb" },
  { from: "Санкт-Петербург", to: "Псков", slug: "spb-pskov", km: 295, hours: "4 ч", fromSlug: "spb", toSlug: "spb" },
  { from: "Санкт-Петербург", to: "Петрозаводск", slug: "spb-petrozavodsk", km: 430, hours: "6 ч", fromSlug: "spb", toSlug: "spb" },

  // === ВОРОНЕЖ ===
  { from: "Воронеж", to: "Липецк", slug: "voronezh-lipetsk", km: 125, hours: "2 ч", fromSlug: "voronezh", toSlug: "voronezh" },
  { from: "Воронеж", to: "Белгород", slug: "voronezh-belgorod", km: 255, hours: "3.5 ч", fromSlug: "voronezh", toSlug: "voronezh" },
  { from: "Воронеж", to: "Курск", slug: "voronezh-kursk", km: 225, hours: "3 ч", fromSlug: "voronezh", toSlug: "voronezh" },
  { from: "Воронеж", to: "Тамбов", slug: "voronezh-tambov", km: 220, hours: "3 ч", fromSlug: "voronezh", toSlug: "voronezh" },

  // === НОВОСИБИРСК ===
  { from: "Новосибирск", to: "Барнаул", slug: "novosibirsk-barnaul", km: 240, hours: "3.5 ч", fromSlug: "novosibirsk", toSlug: "novosibirsk" },
  { from: "Новосибирск", to: "Томск", slug: "novosibirsk-tomsk", km: 260, hours: "3.5 ч", fromSlug: "novosibirsk", toSlug: "novosibirsk" },
  { from: "Новосибирск", to: "Кемерово", slug: "novosibirsk-kemerovo", km: 260, hours: "3.5 ч", fromSlug: "novosibirsk", toSlug: "novosibirsk" },
  { from: "Новосибирск", to: "Омск", slug: "novosibirsk-omsk", km: 650, hours: "9 ч", fromSlug: "novosibirsk", toSlug: "novosibirsk" },

  // === ВОЛГОГРАД ===
  { from: "Волгоград", to: "Ростов-на-Дону", slug: "volgograd-rostov", km: 490, hours: "7 ч", fromSlug: "volgograd", toSlug: "rostov" },
  { from: "Волгоград", to: "Саратов", slug: "volgograd-saratov", km: 375, hours: "5.5 ч", fromSlug: "volgograd", toSlug: "volgograd" },
  { from: "Волгоград", to: "Астрахань", slug: "volgograd-astrakhan", km: 430, hours: "6 ч", fromSlug: "volgograd", toSlug: "volgograd" },
  { from: "Волгоград", to: "Элиста", slug: "volgograd-elista", km: 295, hours: "4 ч", fromSlug: "volgograd", toSlug: "volgograd" },
];

// Города-хабы
export interface CityData {
  name: string;
  slug: string;
  nameIn: string; // предложный падеж
  description: string;
}

export const allCities: CityData[] = [
  { name: "Москва", slug: "moskva", nameIn: "Москве", description: "Столица России — крупнейший хаб межгородних перевозок и трансферов в аэропорты Шереметьево, Домодедово, Внуково" },
  { name: "Санкт-Петербург", slug: "spb", nameIn: "Санкт-Петербурге", description: "Северная столица — трансфер в Пулково и межгородние поездки по Северо-Западу" },
  { name: "Екатеринбург", slug: "ekaterinburg", nameIn: "Екатеринбурге", description: "Столица Урала — маршруты в Челябинск, Тюмень, Пермь и трансфер в аэропорт Кольцово" },
  { name: "Казань", slug: "kazan", nameIn: "Казани", description: "Столица Татарстана — маршруты в Самару, Нижний Новгород, Москву" },
  { name: "Краснодар", slug: "krasnodar", nameIn: "Краснодаре", description: "Ворота Юга — трансфер в Сочи, Анапу, Геленджик, Крым и аэропорт Пашковский" },
  { name: "Сочи", slug: "sochi", nameIn: "Сочи", description: "Главный курорт России — трансфер из аэропорта Адлер, Красная Поляна, Роза Хутор" },
  { name: "Самара", slug: "samara", nameIn: "Самаре", description: "Поволжье — маршруты в Казань, Тольятти и трансфер в аэропорт Курумоч" },
  { name: "Нижний Новгород", slug: "nizhniy-novgorod", nameIn: "Нижнем Новгороде", description: "Центральная Россия — маршруты в Москву, Казань и трансфер в аэропорт Стригино" },
  { name: "Новосибирск", slug: "novosibirsk", nameIn: "Новосибирске", description: "Столица Сибири — маршруты в Барнаул, Томск, Кемерово и аэропорт Толмачёво" },
  { name: "Воронеж", slug: "voronezh", nameIn: "Воронеже", description: "Чернозёмный край — маршруты в Москву, Липецк, Белгород, Курск" },
  { name: "Ростов-на-Дону", slug: "rostov", nameIn: "Ростове-на-Дону", description: "Южный хаб — маршруты в Краснодар, Сочи, Анапу и аэропорт Платов" },
  { name: "Тюмень", slug: "tyumen", nameIn: "Тюмени", description: "Западная Сибирь — маршруты в Екатеринбург, аэропорт Рощино" },
  { name: "Челябинск", slug: "chelyabinsk", nameIn: "Челябинске", description: "Южный Урал — маршруты в Екатеринбург, Курган" },
  { name: "Волгоград", slug: "volgograd", nameIn: "Волгограде", description: "Нижнее Поволжье — маршруты в Ростов, Саратов, Астрахань" },
  { name: "Пермь", slug: "perm", nameIn: "Перми", description: "Западный Урал — маршруты в Екатеринбург, аэропорт Большое Савино" },
  { name: "Симферополь", slug: "simferopol", nameIn: "Симферополе", description: "Столица Крыма — трансфер из аэропорта в Ялту, Алушту, Севастополь, Евпаторию" },
  { name: "Ярославль", slug: "yaroslavl", nameIn: "Ярославле", description: "Золотое Кольцо — маршруты в Москву, Кострому" },
  { name: "Минеральные Воды", slug: "mineralnye-vody", nameIn: "Минеральных Водах", description: "Кавказские Минеральные Воды — трансфер в Кисловодск, Пятигорск, Домбай" },
];

// Аэропорты
export interface AirportData {
  name: string;
  code: string;
  slug: string;
  city: string;
  citySlug: string;
  km: number;
}

export const allAirports: AirportData[] = [
  { name: "Шереметьево", code: "SVO", slug: "sheremetyevo", city: "Москва", citySlug: "moskva", km: 35 },
  { name: "Домодедово", code: "DME", slug: "domodedovo", city: "Москва", citySlug: "moskva", km: 45 },
  { name: "Внуково", code: "VKO", slug: "vnukovo", city: "Москва", citySlug: "moskva", km: 30 },
  { name: "Пулково", code: "LED", slug: "pulkovo", city: "Санкт-Петербург", citySlug: "spb", km: 20 },
  { name: "Кольцово", code: "SVX", slug: "koltsovo", city: "Екатеринбург", citySlug: "ekaterinburg", km: 20 },
  { name: "Курумоч", code: "KUF", slug: "kurumoch", city: "Самара", citySlug: "samara", km: 40 },
  { name: "Адлер", code: "AER", slug: "adler-airport", city: "Сочи", citySlug: "sochi", km: 30 },
  { name: "Пашковский", code: "KRR", slug: "pashkovskiy", city: "Краснодар", citySlug: "krasnodar", km: 15 },
  { name: "Платов", code: "ROV", slug: "platov", city: "Ростов-на-Дону", citySlug: "rostov", km: 40 },
  { name: "Толмачёво", code: "OVB", slug: "tolmachyovo", city: "Новосибирск", citySlug: "novosibirsk", km: 25 },
  { name: "Симферополь", code: "SIP", slug: "simferopol-airport", city: "Симферополь", citySlug: "simferopol", km: 15 },
  { name: "Минеральные Воды", code: "MRV", slug: "mineralnye-vody-airport", city: "Минеральные Воды", citySlug: "mineralnye-vody", km: 10 },
];
