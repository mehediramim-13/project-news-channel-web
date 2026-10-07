import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface News {
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string
}

const NewsCard = ({ news }: { news: News }) => {
    return (
        <Link
            href={`/news/${news.id}`}
            className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c00000]"
        >
            <div className="card h-full overflow-hidden border border-transparent bg-base-100 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-gray-200 group-hover:shadow-lg sm:my-5 sm:mr-5">
                <figure className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                        src={news.imageUrl}
                        alt={news.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                </figure>
                <div className="card-body gap-1 p-3 sm:p-4">
                    <h2 className="card-title line-clamp-2 text-sm leading-snug transition-colors group-hover:text-[#c00000] sm:text-base">
                        {news.title}
                    </h2>
                    <p className="line-clamp-2 text-xs text-gray-600 sm:text-sm">{news.description}</p>
                    <span className="mt-1 text-sm font-semibold text-[#c00000] transition duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                        বিস্তারিত পড়ুন →
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;