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
            <div className='flex container mx-auto'>
                <div className='bg-red-800 py-1 px-5 font-bold'>সর্বশেষ</div>
            <MarqueeText className='py-1' direction='right' duration={10}>
            {
                headlines.map (h=><span key={h.id}>

                    <Link href={`/news/${h.id}`} className='hover:underline underline-offset-4'>
                        {h.title}
                    </Link>
                    <span className='mx-5'>•</span>
                </span>)
            }
            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;