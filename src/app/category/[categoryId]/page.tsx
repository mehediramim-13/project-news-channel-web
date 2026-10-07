import NewsCard from '@/app/components/NewsCard';
import React from 'react';

interface News {
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string
}

const CategoryNews = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
    const { categoryId } = await params;

    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const categoryNews: News[] = data.data;

    return (
        <div className='py-6 sm:py-10'>
            <h1 className='mb-5 border-b-2 border-red-700 text-xl font-bold sm:text-2xl'>{data.title}</h1>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10'>
                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news}></NewsCard>)
                }
            </div>
        </div>
    );
};

export default CategoryNews;