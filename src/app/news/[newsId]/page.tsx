import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Block =
    | { type: 'image'; url: string; width: number; height: number; caption?: string; altText?: string; copyrightHolder?: string }
    | { type: 'text'; text: string }
    | { type: 'subheading'; text: string };

interface Article {
    id: string;
    title: string;
    imageUrl: string;
    firstPublished: string;
    topics: { id: string; name: string }[];
    tags: string[];
    body: Block[];
    wordCount: number;
    source: string;
    sourceUrl: string;
}

type Props = { params: Promise<{ newsId: string }> };

const getArticle = async (id: string): Promise<Article | null> => {
    try {
        const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data ?? null;
    } catch {
        return null;
    }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { newsId } = await params;
    const news = await getArticle(newsId);
    return { title: news ? `${news.title} | Bangla News 24` : 'Bangla News 24' };
}

const NewsDetails = async ({ params }: Props) => {
    const { newsId } = await params;
    const news = await getArticle(newsId);

    if (!news) notFound();

    const published = new Date(news.firstPublished);
    const date = published.toLocaleDateString('bn-BD', { dateStyle: 'full', timeZone: 'Asia/Dhaka' });
    const time = published.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Dhaka' });
    const readMinutes = Math.max(1, Math.ceil(news.wordCount / 200)).toLocaleString('bn-BD');

    const firstBlock = news.body[0];
    const heroInfo = firstBlock?.type === 'image' ? firstBlock : null;
    const bodyBlocks = news.body
        .slice(heroInfo ? 1 : 0)
        .filter((b) => !(b.type === 'text' && b.text.includes('ফলো করতে')));

    return (
        <article className="container mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                <Link href="/" className="hover:text-[#c00000]">হোম</Link>
                {news.topics[0] && (
                    <>
                        <span>/</span>
                        <span className="font-semibold text-[#c00000]">{news.topics[0].name}</span>
                    </>
                )}
            </nav>

            <h1 className="mt-3 text-2xl font-bold leading-snug text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl md:leading-snug">
                {news.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-gray-200 py-3 text-xs text-gray-600 sm:text-sm">
                <span>{date}, {time}</span>
                <span className="hidden text-gray-300 sm:inline">|</span>
                <span>পড়তে সময় লাগবে প্রায় {readMinutes} মিনিট</span>
                <span className="hidden text-gray-300 sm:inline">|</span>
                <span className="font-semibold text-gray-800">{news.source}</span>
            </div>

            <figure className="mt-5 sm:mt-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                        src={news.imageUrl}
                        alt={heroInfo?.altText ?? news.title}
                        fill
                        priority
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="object-cover"
                    />
                </div>
                {heroInfo?.caption && (
                    <figcaption className="mt-2 text-xs text-gray-500 sm:text-sm">
                        {heroInfo.caption}
                        {heroInfo.copyrightHolder && ` • ${heroInfo.copyrightHolder}`}
                    </figcaption>
                )}
            </figure>

            <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                {bodyBlocks.map((block, i) => {
                    if (block.type === 'subheading') {
                        return (
                            <h2 key={i} className="border-l-4 border-[#c00000] pl-3 pt-2 text-xl font-bold text-gray-900 sm:text-2xl">
                                {block.text}
                            </h2>
                        );
                    }

                    if (block.type === 'image') {
                        return (
                            <figure key={i}>
                                <Image
                                    src={block.url}
                                    alt={block.altText ?? ''}
                                    width={block.width}
                                    height={block.height}
                                    sizes="(min-width: 768px) 768px, 100vw"
                                    className="h-auto w-full rounded-lg sm:rounded-xl"
                                />
                                {block.caption && (
                                    <figcaption className="mt-2 text-xs text-gray-500 sm:text-sm">
                                        {block.caption}
                                        {block.copyrightHolder && ` • ${block.copyrightHolder}`}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    }

                    return (
                        <p key={i} className="whitespace-pre-line break-words text-base leading-7 text-gray-800 sm:text-lg sm:leading-8">
                            {block.text}
                        </p>
                    );
                })}
            </div>

            {news.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2 border-t border-gray-200 pt-5 sm:mt-10 sm:pt-6">
                    {news.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 sm:text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <Link href="/" className="font-semibold text-[#c00000] hover:underline">
                    ← আরও খবর
                </Link>
                <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                    মূল সংবাদ: {news.source}
                </a>
            </div>
        </article>
    );
};

export default NewsDetails;