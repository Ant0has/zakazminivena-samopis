import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Пользовательское соглашение | ЗаказМинивена.ru",
  description:
    "Пользовательское соглашение сайта ЗаказМинивена.ru. Условия использования сервиса заказа минивэнов с водителем.",
  openGraph: {
    title: "Пользовательское соглашение | ЗаказМинивена.ru",
    description:
      "Пользовательское соглашение сайта ЗаказМинивена.ru. Условия использования сервиса.",
    url: "https://zakazminivena.ru/terms",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Пользовательское соглашение" },
              ]}
            />

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Пользовательское соглашение
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
                  1.1. Настоящее Пользовательское соглашение (далее — «Соглашение»)
                  регулирует отношения между Индивидуальным предпринимателем Макаренко
                  Вадимом Петровичем (далее — «Администрация сайта») и любым лицом,
                  использующим сайт zakazminivena.ru (далее — «Пользователь»).
                </p>
                <p className="mt-3">
                  1.2. Использование Сайта означает полное и безоговорочное принятие
                  Пользователем условий настоящего Соглашения. Если Пользователь не
                  согласен с условиями Соглашения, он обязан прекратить использование
                  Сайта.
                </p>
                <p className="mt-3">
                  1.3. Администрация сайта оставляет за собой право в любое время
                  изменять, дополнять или обновлять условия настоящего Соглашения без
                  предварительного уведомления Пользователя. Актуальная версия Соглашения
                  размещена на странице{" "}
                  <a href="/terms" className="text-emerald underline hover:text-emerald/80">
                    zakazminivena.ru/terms
                  </a>.
                </p>
                <p className="mt-3">
                  1.4. Продолжение использования Сайта после внесения изменений
                  означает принятие Пользователем этих изменений.
                </p>
              </section>

              {/* 2. Использование сайта */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  2. Использование сайта
                </h2>
                <p>
                  2.1. Сайт zakazminivena.ru предназначен для информирования о услугах
                  по перевозке пассажиров автомобилями категории «минивэн» и оформления
                  заявок на перевозку.
                </p>
                <p className="mt-3">
                  2.2. Пользователь обязуется использовать Сайт добросовестно, не
                  нарушая действующее законодательство Российской Федерации и права
                  третьих лиц.
                </p>
                <p className="mt-3">При использовании Сайта запрещается:</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>
                    предоставлять заведомо ложную информацию при оформлении заявок;
                  </li>
                  <li>
                    осуществлять действия, направленные на нарушение нормальной работы
                    Сайта (DDoS-атаки, внедрение вредоносного кода и пр.);
                  </li>
                  <li>
                    копировать, распространять или иным образом использовать контент Сайта
                    без письменного согласия Администрации;
                  </li>
                  <li>
                    использовать автоматизированные средства сбора информации с Сайта
                    (парсинг, скрапинг) без разрешения Администрации.
                  </li>
                </ul>
                <p className="mt-3">
                  2.3. Администрация сайта вправе ограничить доступ Пользователя к Сайту
                  в случае нарушения условий настоящего Соглашения.
                </p>
              </section>

              {/* 3. Интеллектуальная собственность */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  3. Интеллектуальная собственность
                </h2>
                <p>
                  3.1. Все материалы, размещённые на Сайте, включая тексты, фотографии,
                  графические элементы, дизайн, логотипы, программный код и иные объекты,
                  являются объектами интеллектуальной собственности Администрации сайта
                  и/или её партнёров и защищены законодательством Российской Федерации
                  об интеллектуальной собственности.
                </p>
                <p className="mt-3">
                  3.2. Использование материалов Сайта без предварительного письменного
                  согласия Администрации запрещено. Исключение составляет использование
                  в личных некоммерческих целях при сохранении указания на источник.
                </p>
                <p className="mt-3">
                  3.3. Товарный знак «ЗаказМинивена.ru» и логотип сервиса являются
                  собственностью Администрации сайта.
                </p>
              </section>

              {/* 4. Ограничение ответственности */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  4. Ограничение ответственности
                </h2>
                <p>
                  4.1. Сайт и все его содержимое предоставляются «как есть» (as is).
                  Администрация не гарантирует бесперебойную работу Сайта и отсутствие
                  технических ошибок.
                </p>
                <p className="mt-3">
                  4.2. Администрация сайта не несёт ответственности за:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>
                    временную недоступность Сайта вследствие технических работ или
                    обстоятельств непреодолимой силы;
                  </li>
                  <li>
                    действия третьих лиц, нарушающих работу Сайта;
                  </li>
                  <li>
                    убытки, возникшие у Пользователя в связи с использованием или
                    невозможностью использования Сайта;
                  </li>
                  <li>
                    содержание внешних сайтов, ссылки на которые могут размещаться на
                    Сайте.
                  </li>
                </ul>
                <p className="mt-3">
                  4.3. Порядок оказания услуг по перевозке регулируется{" "}
                  <a href="/offer" className="text-emerald underline hover:text-emerald/80">
                    Публичной офертой
                  </a>.
                </p>
              </section>

              {/* 5. Изменение условий */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  5. Изменение условий Соглашения
                </h2>
                <p>
                  5.1. Администрация сайта вправе в одностороннем порядке изменять
                  условия настоящего Соглашения. Изменения вступают в силу с момента
                  публикации новой редакции Соглашения на Сайте.
                </p>
                <p className="mt-3">
                  5.2. Пользователь обязуется самостоятельно отслеживать изменения
                  настоящего Соглашения. Продолжение использования Сайта после
                  публикации изменений означает согласие с ними.
                </p>
              </section>

              {/* 6. Контакты */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  6. Контактная информация
                </h2>
                <p>
                  По всем вопросам, связанным с настоящим Соглашением, Пользователь
                  может обратиться к Администрации сайта:
                </p>
                <div className="mt-4 rounded-xl border border-border bg-card p-6 text-sm">
                  <p><strong className="text-foreground">Администрация:</strong> ИП Макаренко Вадим Петрович</p>
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

              {/* Related links */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  Связанные документы
                </h2>
                <ul className="list-inside list-disc space-y-2">
                  <li>
                    <a href="/offer" className="text-emerald underline hover:text-emerald/80">
                      Публичная оферта
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-emerald underline hover:text-emerald/80">
                      Политика конфиденциальности
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
