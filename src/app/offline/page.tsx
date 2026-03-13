import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Нет подключения — ЗаказМинивена.ru",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-6xl">📡</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Нет подключения к интернету
        </h1>
        <p className="text-gray-600">
          Проверьте соединение и попробуйте снова. Или позвоните нам напрямую:
        </p>
        <a
          href="tel:+79185875454"
          className="inline-block rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-green-700 transition"
        >
          📞 +7 (918) 587-54-54
        </a>
        <p className="text-sm text-gray-400">
          Звонок бесплатный — мы работаем круглосуточно
        </p>
      </div>
    </main>
  );
}
