import React from 'react';
import NavMenu from './NavMenu';

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

    const items = filteredNavs.map(n => ({ slug: n.slug, title: n.title }));

    return <NavMenu items={items} />;
};

export default NavLink;