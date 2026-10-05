import Link from "next/link";

type Category = {
  category_id: string;
  category_name: string;
};

async function getCategories(): Promise<Category[]> {
  try {
    // Header e jei URL diye categories fetch korcho, hubohu sheta boshan
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return json?.data?.news_category ?? [];
  } catch {
    return [];
  }
}

export default async function Footer() {
  const year = new Date().getFullYear();
  const categories = await getCategories();

  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
     
      <div className="h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 md:grid-cols-3">
    
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Bangla<span className="text-red-600">Bulletin</span>
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              দেশ ও বিশ্বের সর্বশেষ খবর, এক জায়গায়। সত্য ও নিরপেক্ষ সংবাদ,
              সবার আগে।
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              দ্রুত লিংক
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 transition-colors hover:text-red-600"
                >
                  হোম
                </Link>
              </li>
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.category_id}>
                  <Link
                    href={`/category/${cat.category_id}`}
                    className="text-gray-500 transition-colors hover:text-red-600"
                  >
                    {cat.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              News Source
            </h3>
            <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="font-semibold text-gray-800">BBC Bangla</span>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              সব সংবাদের স্বত্ব মূল প্রকাশকের।
            </p>
          </div>
        </div>

     
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 md:flex-row">
          <p>© {year} BanglaBulletin. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Developed by
            <span className="rounded-md bg-gradient-to-r from-red-600 to-orange-500 px-2.5 py-1 text-xs font-semibold tracking-wide text-white shadow-sm transition-transform hover:scale-105">
              Ramim
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}