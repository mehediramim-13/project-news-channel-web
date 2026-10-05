import Link from 'next/link';
import React from 'react';

interface Navs {
    id: string;
    title: string;
    slug: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}

const getNavs = async (): Promise<Navs[]> => {
    try {
        const res = await fetch('https://news-api-v2.vercel.app/api/categories', {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data ?? [];
    } catch {
        return [];
    }
};

const NavLink = async () => {
    const navs = await getNavs();
    const filteredNavs = navs
        .filter(n => n.scrapable)
        .filter((n, i, arr) => arr.findIndex(x => x.slug === n.slug) === i);

    return (
        <nav className="flex gap-5 justify-center my-10">
            <Link href='/'>হোম</Link>

            {filteredNavs.map((n, i) => (
                <Link key={`${n.slug}-${i}`} href={`/category/${n.slug}`}>
                    {n.title}
                </Link>
            ))}
        </nav>
    );
};

export default NavLink;