import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface News {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
}

const MainNews = ({ news }: { news: News[] }) => {
    const firstNews = news[0];
    const otherNews = news.slice(1, 5);

    return (
        <div className="grid grid-cols-1 gap-4 pr-5 lg:grid-cols-5">
            <Link
                href={`/news/${firstNews.id}`}
                className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c00000] lg:col-span-3"
            >
                <div className="card h-full overflow-hidden rounded-xl border border-gray-300 bg-base-100 shadow-sm transition duration-300 group-hover:shadow-lg">
                    <figure className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt}
                            fill
                            priority
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    </figure>
                    <div className="card-body gap-2 p-5">
                        <p className="text-xs font-semibold text-[#c00000]">{firstNews.category}</p>
                        <h2 className="text-2xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#c00000]">
                            {firstNews.title}
                        </h2>
                        <p className="line-clamp-3 text-base text-gray-600">{firstNews.description}</p>
                        <span className="mt-1 text-sm font-semibold text-[#c00000] opacity-0 transition duration-300 group-hover:opacity-100">
                            বিস্তারিত পড়ুন →
                        </span>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 grid-rows-4 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-300 bg-base-100 lg:col-span-2">
                {otherNews.map(on => (
                    <Link
                        key={on.id}
                        href={`/news/${on.id}`}
                        className="group flex flex-col justify-center px-4 py-3 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#c00000]"
                    >
                        <p className="text-xs font-semibold text-[#c00000]">{on.category}</p>
                        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-[#c00000]">
                            {on.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainNews;