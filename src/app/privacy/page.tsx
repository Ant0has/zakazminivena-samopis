import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | ЗаказМинивена.ru",
  description:
    "Политика конфиденциальности и обработки персональных данных сервиса ЗаказМинивена.ru. Защита данных в соответствии с ФЗ-152.",
  openGraph: {
    title: "Политика конфиденциальности | ЗаказМинивена.ru",
    description:
      "Политика конфиденциальности и обработки персональных данных сервиса ЗаказМинивена.ru.",
    url: "https://zakazminivena.ru/privacy",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Политика конфиденциальности" },
              ]}
            />

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Политика конфиденциальности
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Дата публикации: 1 января 2025 г.
            </p>

            <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
              {/* 1. Общие положения */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  1. Общие положения
                </h2>
                <p>
                  1.1. Настоящая Политика конфиденциальности (далее — «Политика»)
                  определяет порядок обработки и защиты персональных данных пользователей
                  сайта zakazminivena.ru (далее — «Сайт»), принадлежащего Индивидуальному
                  предпринимателю Макаренко Вадиму Петровичу (далее — «Оператор»).
                </p>
                <p className="mt-3">
                  1.2. Оператор обрабатывает персональные данные в соответствии с
                  Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»
                  и иными нормативными правовыми актами Российской Федерации.
                </p>
                <p className="mt-3">
                  1.3. Использование Сайта, оформление заявки на перевозку или иное
                  взаимодействие с Оператором означает безоговорочное согласие
                  пользователя с настоящей Политикой.
                </p>
                <p className="mt-3">
                  1.4. Оператор оставляет за собой право вносить изменения в настоящую
                  Политику. Актуальная версия всегда доступна на странице{" "}
                  <a href="/privacy" className="text-emerald underline hover:text-emerald/80">
                    zakazminivena.ru/privacy
                  </a>.
                </p>
              </section>

              {/* 2. Какие данные собираем */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  2. Какие данные мы собираем
                </h2>
                <p>
                  2.1. При оформлении заявки на перевозку Оператор может запрашивать
                  следующие персональные данные:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1">
                  <li>имя (фамилия, имя, отчество или псевдоним);</li>
                  <li>номер телефона;</li>
                  <li>адрес электронной почты (при наличии);</li>
                  <li>маршрут поездки (пункты отправления и назначения);</li>
                  <li>дата и время поездки;</li>
                  <li>количество пассажиров;</li>
                  <li>дополнительные пожелания (детское кресло, встреча с табличкой и пр.).</li>
                </ul>
                <p className="mt-3">
                  2.2. Автоматически при посещении Сайта могут собираться технические
                  данные: IP-адрес, тип браузера и устройства, источник перехода, страницы
                  просмотра, время визита.
                </p>
              </section>

              {/* 3. Цели обработки */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  3. Цели обработки персональных данных
                </h2>
                <p>Персональные данные обрабатываются в следующих целях:</p>
                <ul className="mt-3 list-inside list-disc space-y-1">
                  <li>обработка заявок на перевозку и подтверждение заказов;</li>
                  <li>связь с Заказчиком по вопросам оказания услуг;</li>
                  <li>расчёт стоимости поездки;</li>
                  <li>улучшение качества обслуживания и работы Сайта;</li>
                  <li>выполнение обязательств, предусмотренных законодательством РФ.</li>
                </ul>
              </section>

              {/* 4. Хранение и защита */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  4. Хранение и защита данных
                </h2>
                <p>
                  4.1. Персональные данные хранятся на защищённых серверах на территории
                  Российской Федерации.
                </p>
                <p className="mt-3">
                  4.2. Оператор принимает необходимые организационные и технические меры
                  для защиты персональных данных от неправомерного или случайного доступа,
                  уничтожения, изменения, блокирования, копирования, распространения,
                  а также от иных неправомерных действий третьих лиц.
                </p>
                <p className="mt-3">
                  4.3. Персональные данные хранятся в течение срока, необходимого для
                  достижения целей обработки, но не более 3 (трёх) лет с момента
                  последнего взаимодействия с Заказчиком, если иное не предусмотрено
                  законодательством РФ.
                </p>
              </section>

              {/* 5. Передача третьим лицам */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  5. Передача данных третьим лицам
                </h2>
                <p>
                  5.1. Оператор не передаёт персональные данные третьим лицам, за
                  исключением следующих случаев:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-1">
                  <li>с согласия субъекта персональных данных;</li>
                  <li>
                    для исполнения обязательств по договору перевозки (передача контактных
                    данных водителю, осуществляющему перевозку);
                  </li>
                  <li>
                    по запросу уполномоченных государственных органов в случаях,
                    предусмотренных законодательством РФ;
                  </li>
                  <li>для защиты прав и законных интересов Оператора.</li>
                </ul>
              </section>

              {/* 6. Права субъекта */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  6. Права субъекта персональных данных
                </h2>
                <p>Пользователь имеет право:</p>
                <ul className="mt-3 list-inside list-disc space-y-1">
                  <li>получить информацию об обработке своих персональных данных;</li>
                  <li>требовать уточнения, блокирования или уничтожения персональных данных;</li>
                  <li>отозвать согласие на обработку персональных данных;</li>
                  <li>
                    обжаловать действия Оператора в уполномоченный орган по защите прав
                    субъектов персональных данных (Роскомнадзор).
                  </li>
                </ul>
                <p className="mt-3">
                  Для реализации указанных прав пользователь может обратиться к Оператору
                  по контактным данным, указанным в разделе 8 настоящей Политики.
                </p>
              </section>

              {/* 7. Cookies и аналитика */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  7. Файлы cookie и аналитика
                </h2>
                <p>
                  7.1. Сайт использует файлы cookie — небольшие текстовые файлы,
                  сохраняемые на устройстве пользователя для обеспечения корректной
                  работы Сайта, анализа посещаемости и улучшения пользовательского опыта.
                </p>
                <p className="mt-3">
                  7.2. На Сайте используется сервис веб-аналитики Яндекс.Метрика,
                  предоставляемый ООО «Яндекс» (119021, Россия, г. Москва, ул. Льва
                  Толстого, д. 16). Яндекс.Метрика использует файлы cookie для анализа
                  использования Сайта. Собранная информация (включая IP-адрес) передаётся
                  и хранится на серверах Яндекса в Российской Федерации.
                </p>
                <p className="mt-3">
                  7.3. Пользователь может отключить файлы cookie в настройках браузера,
                  однако это может повлиять на функциональность Сайта.
                </p>
              </section>

              {/* 8. Контакты */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  8. Контактная информация
                </h2>
                <div className="rounded-xl border border-border bg-card p-6 text-sm">
                  <p><strong className="text-foreground">Оператор:</strong> ИП Макаренко Вадим Петрович</p>
                  <p className="mt-2"><strong className="text-foreground">ИНН:</strong> 771402853694</p>
                  <p className="mt-2"><strong className="text-foreground">ОГРНИП:</strong> 324774600298412</p>
                  <p className="mt-2">
                    <strong className="text-foreground">Адрес:</strong> г. Москва, ул. Генерала
                    Белобородова, д. 22, БЦ &laquo;Митино Парк&raquo;, офис 314
                  </p>
                  <p className="mt-2"><strong className="text-foreground">Телефон:</strong>{" "}
                    <a href="tel:+79185875454" className="text-emerald underline">+7 (918) 587-54-54</a>
                  </p>
                  <p className="mt-2"><strong className="text-foreground">Telegram:</strong>{" "}
                    <a href="https://t.me/zakazminivena" className="text-emerald underline" target="_blank" rel="noopener noreferrer">@zakazminivena</a>
                  </p>
                  <p className="mt-2"><strong className="text-foreground">Сайт:</strong>{" "}
                    <a href="https://zakazminivena.ru" className="text-emerald underline">zakazminivena.ru</a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
