import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Страница не найдена</p>
      <p className="mt-2 text-sm text-gray-500">
        Страница, которую вы ищете, не существует или, возможно, была перемещена.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition"
      >
        Вернуться на главную страницу
      </Link>
    </div>
  );
}
