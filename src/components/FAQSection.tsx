import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Сколько стоит заказать минивэн?",
    a: "Стоимость зависит от маршрута — цена фиксируется при заказе и не меняется. Напишите нам маршрут и дату, назовём точную цену за 5 минут.",
  },
  {
    q: "Сколько человек помещается в минивэн?",
    a: "В минивэн помещается до 7 пассажиров с комфортом. Каждое место оборудовано ремнём безопасности. Большой багажник вмещает чемоданы всех пассажиров.",
  },
  {
    q: "Есть ли детское кресло?",
    a: "Да, мы бесплатно предоставляем детские автокресла для детей от 0 до 12 лет и бустеры для детей старше 7 лет. Укажите возраст и вес ребёнка при заказе.",
  },
  {
    q: "Нужна ли предоплата?",
    a: "Нет, предоплата не требуется. Оплата производится водителю по факту поездки — наличными или переводом на карту.",
  },
  {
    q: "Как отменить или перенести поездку?",
    a: "Бесплатная отмена или перенос возможны за 24 часа до поездки. Просто напишите нам в Telegram или позвоните.",
  },
  {
    q: "Что включено в стоимость?",
    a: "В стоимость входит: подача автомобиля, поездка по маршруту, детское кресло, встреча с табличкой в аэропорту, бесплатное ожидание 30 минут, кондиционер, вода в салоне, USB-зарядка.",
  },
  {
    q: "Какие автомобили используются?",
    a: "Мы используем комфортные минивэны: Hyundai Staria, Mercedes V-class, Volkswagen Multivan и аналогичные. Все автомобили в отличном техническом состоянии, чистые и ухоженные.",
  },
  {
    q: "Работаете ли вы ночью и в праздники?",
    a: "Мы работаем ежедневно с 08:00 до 22:00. Поездки можно заказать на любое время, включая ранние утренние рейсы. Цена не зависит от времени суток.",
  },
];

export function FAQSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="relative py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Частые вопросы
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ответы на популярные вопросы о заказе минивэна
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border/50 bg-card px-6 data-[state=open]:border-emerald/30"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
