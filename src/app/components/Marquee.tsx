import React from 'react';
import Link from 'next/link';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headlines {
    id : string,
    title : string
}

const getHeadlines = async (): Promise<Headlines[]> => {
    try {
        const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10', {
            next: { revalidate: 300 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data ?? [];
    } catch {
        return [];
    }
};

const Marquee = async() => {
    const headlines = await getHeadlines();

    if (headlines.length === 0) return null;

    return (
        <div className='bg-red-700 text-white'>
            <div className='container mx-auto flex items-stretch'>
                <div className='flex shrink-0 items-center bg-red-800 px-3 py-1 text-sm font-bold sm:px-5 sm:text-base'>
                    সর্বশেষ
                </div>
                <div className='min-w-0 flex-1 overflow-hidden text-sm sm:text-base'>
                    <MarqueeText className='py-1' direction='right' duration={10}>
                    {
                        headlines.map (h=><span key={h.id}>

                            <Link href={`/news/${h.id}`} className='hover:underline underline-offset-4'>
                                {h.title}
                            </Link>
                            <span className='mx-3 sm:mx-5'>•</span>
                        </span>)
                    }
                    </MarqueeText>
                </div>
            </div>
        </div>
    );
};

export default Marquee;