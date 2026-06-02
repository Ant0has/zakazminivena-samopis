import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, UsersIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title:
    "Минивэн на 6 человек с водителем — заказать от 60 руб/км | ЗаказМинивэна.ru",
  description:
    "Заказать минивэн на 6 человек с водителем. 6 пассажиров не поместятся в одно такси — минивэн решает проблему. Все едут вместе, от 3000 руб/чел на 300 км. Детское кресло, вода, кондиционер бесплатно.",
  alternates: {
    canonical: "https://zakazminivena.ru/minivan-6-mest",
  },
};

export default function Minivan6Page() {
  const includedItems = [
    "Детское автокресло бесплатно",
    "Бутылки воды в салоне",
    "Кондиционер / климат-контроль",
    "USB-зарядка для каждого пассажира",
    "Встреча с табличкой (аэропорт/вокзал)",
    "Бесплатное ожидание 30 минут",
    "Помощь с багажом",
    "Остановки по пути по вашему желанию",
  ];

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Минивэн на 6 человек</span>
            </nav>

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <UsersIcon className="mr-1 h-3 w-3" />
              6 пассажиров
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн на 6 человек с водителем
            </h1>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Шесть человек — это группа, которая гарантированно не поместится
                в одно обычное такси. Даже самый просторный седан или кроссовер
                рассчитан максимум на 4 пассажиров. Значит, для шестерых
                придётся заказывать минимум два автомобиля — а это двойная
                цена, два разных водителя и постоянная координация между
                машинами. Минивэн на 6 человек — простое и выгодное
                решение этой проблемы.
              </p>
              <p>
                В наших минивэнах 7 пассажирских мест, поэтому при поездке
                вшестером одно место остаётся свободным. Это дополнительное
                пространство для сумки, рюкзака или просто для комфорта.
                Каждое сиденье оборудовано полноценным ремнём безопасности,
                а в багажнике легко размещаются 6 чемоданов или крупных
                дорожных сумок.
              </p>
              <p>
                Минивэн на шестерых — популярный выбор для больших семей
                с детьми, компаний друзей и небольших рабочих групп.
                Два взрослых и четверо детей, три пары друзей,
                коллеги на выездное совещание — для каждой такой ситуации
                минивэн обеспечивает комфорт, безопасность и экономию.
                Детские автокресла предоставляются бесплатно: укажите
                возраст и вес детей при бронировании.
              </p>

              <h2 className="text-2xl font-bold text-foreground">
                Стоимость поездки на 6 человек
              </h2>
              <p>
                Стоимость минивэна — от 60 руб/км на весь автомобиль,
                независимо от количества пассажиров. На маршруте в 300 км
                это примерно 18 000 рублей. Разделите на шестерых —
                и получите всего 3 000 рублей на человека. Это сопоставимо
                с ценой билета на автобус, но с максимальным комфортом
                и подачей от двери до двери.
              </p>
              <p>
                Два такси на тот же маршрут обойдутся в 24 000 — 30 000 рублей
                суммарно, то есть по 4 000 — 5 000 на человека. Экономия
                при заказе минивэна для шести пассажиров — от 30 до 40
                процентов. При этом все едут вместе, общаются, не теряют
                друг друга в пути и приезжают одновременно.
              </p>

              <h2 className="text-2xl font-bold text-foreground">
                Почему именно минивэн для 6 пассажиров
              </h2>
              <p>
                Шесть человек — это та самая «серая зона», когда одного
                такси мало, а два — слишком дорого и неудобно. Минивэн
                закрывает эту потребность идеально: один автомобиль,
                один водитель, одна фиксированная цена. Не нужно
                разделяться, спорить, кто с кем едет, и переживать,
                что вторая машина отстала или свернула не туда.
              </p>
              <p>
                На длинных маршрутах водитель делает остановки каждые
                2-2,5 часа. В салоне работает кондиционер, у каждого
                сиденья есть USB-зарядка. Мы предоставляем бутилированную
                воду для всех пассажиров. Просторные кресла с хорошим
                расстоянием для ног позволяют комфортно перенести даже
                длительную поездку на 5-6 часов.
              </p>
              <p>
                Если вы заказываете трансфер из аэропорта или вокзала,
                водитель встретит вашу группу с табличкой, поможет с
                багажом и проводит до автомобиля. Бесплатное ожидание —
                30 минут, чтобы вы успели получить багаж и собраться
                всей группой.
              </p>
            </div>

            {/* What's included */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Что включено в поездку
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {includedItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <CheckIcon className="h-5 w-5 shrink-0 text-emerald" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular routes */}
            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold">
                Популярные маршруты для 6 пассажиров
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Минивэн на шестерых заказывают для семейных поездок между
                городами, трансфера из аэропорта большой компанией,
                выездных мероприятий и корпоративов. Все направления
                с фиксированными ценами — на странице маршрутов.
              </p>
              <Button variant="outline" asChild>
                <Link href="/routes">Все маршруты с ценами</Link>
              </Button>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн на 6 человек
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите маршрут, дату и количество багажа — рассчитаем
                стоимость за 5 минут
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href="https://t.me/ZakazMinivena">
                    <TelegramIcon className="mr-2 h-5 w-5" />
                    Написать в Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 text-base font-semibold"
                  asChild
                >
                  <a href="tel:+79185875454">
                    <PhoneIcon className="mr-2 h-5 w-5 text-emerald" />
                    +7 (918) 587-54-54
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
