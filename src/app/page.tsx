import MainNews from "./components/MainNews";
import Marquee from "./components/Marquee";
import MostRead from "./components/MostRead";
import NewsCard from "./components/NewsCard";

interface IOthersSection {
  curationId: string,
  title: string,
  articles: {
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string,
  }[];
}

const hiddenKeywords = ["হোয়াটসঅ্যাপ", "ইন্সটাগ্রাম", "সামাজিক মাধ্যম"];

const getSections = async (): Promise<IOthersSection[]> => {
  try {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/sections', {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
};

export default async function Home() {
  const sections = await getSections();

  if (sections.length === 0) {
    return (
      <div>
        
        <p className="p-10 text-center">খবর লোড করা যাচ্ছে না, একটু পরে চেষ্টা করুন।</p>
      </div>
    );
  }

  const mainNews = sections[0].articles;
  const othersSection: IOthersSection[] = sections
    .slice(1)
    .filter((s) => !hiddenKeywords.some((k) => s.title.includes(k)));

  return (
    <div>
      

      <div className="grid grid-cols-3 gap-5 container mx-auto my-10">
        {/* News Section */}
        <div className="col-span-2">
          <MainNews news={mainNews}></MainNews>

          <div className="grid gap-1">
            {
              othersSection.map(os => <div className="" key={os.curationId}>
                <h1 className="font-bold text-xl border-b-2 border-red-700 p-1 mt-10 mr-5">{os.title}</h1>

                <div className="grid grid-cols-3 gap-2">
                  {
                    os.articles.map(news => <NewsCard key={news.id} news={news}></NewsCard>)
                  }
                </div>
              </div>)
            }
          </div>
        </div>
        {/* Most Read Section */}
        <div className="col-span-1">
           <MostRead></MostRead>
        </div>
           
      </div>
    </div>
  );
}