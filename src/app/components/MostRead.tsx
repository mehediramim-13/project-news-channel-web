import React from 'react';
import Link from 'next/link';

interface MostReadNews {
    id: string,
    title: string,
}

const getMostRead = async (): Promise<MostReadNews[]> => {
    try {
        const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read', {
            next: { revalidate: 300 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data ?? [];
    } catch {
        return [];
    }
};

const MostRead = async() => {
    const news = await getMostRead();

    if (news.length === 0) return null;

    return (
        <div className='card border border-gray-300 bg-base-100 p-3 sm:p-4'>
            <h1 className='mb-3 text-base font-bold text-red-700 sm:text-lg'>সর্বাধিক পঠিত</h1>

            <div className='grid gap-2 sm:gap-3'>
                {
                    news.map((n, i)=> (
                        <Link
                            key={n.id}
                            href={`/news/${n.id}`}
                            className='group flex items-start gap-2 rounded-md p-1 transition-colors hover:bg-gray-50'
                        >
                            <p className='shrink-0 text-lg font-bold text-red-500 sm:text-xl'>{(i+1).toLocaleString('bn-BD')}.</p>
                            <h2 className='min-w-0 text-sm leading-snug transition-colors group-hover:text-red-700 sm:text-base'>{n.title}</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default MostRead;