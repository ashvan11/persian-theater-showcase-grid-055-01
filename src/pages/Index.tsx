
import { useState, useEffect } from "react";
import CategorySection from "../components/CategorySection";
import ExpandableHeader from "../components/ExpandableHeader";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import { useShows } from "@/hooks/useShows";

interface TheaterItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rating: string;
  shows: string;
  description: string;
  time: string;
  price: string;
  buttonText: string;
}

const Index = () => {
  const { data: shows, isLoading } = useShows();
  const [classicTheaters, setClassicTheaters] = useState<TheaterItem[]>([]);
  const [modernTheaters, setModernTheaters] = useState<TheaterItem[]>([]);
  const [childTheaters, setChildTheaters] = useState<TheaterItem[]>([]);

  useEffect(() => {
    if (shows) {
      console.log('Loaded shows:', shows);
      
      // Transform shows data to match TheaterItem interface
      const transformedShows: TheaterItem[] = shows.map((show) => ({
        id: show.id,
        title: show.title,
        subtitle: show.theaters?.name || "نمایش تئاتر",
        image: show.poster_url || `https://picsum.photos/id/${Math.floor(Math.random() * 100) + 1}/300/200`,
        rating: "4.5",
        shows: "1",
        description: show.description || "توضیحات نمایش در دسترس نیست",
        time: show.duration ? `${show.duration} دقیقه` : "120 دقیقه",
        price: show.price ? `${Number(show.price).toLocaleString()} تومان` : "قیمت در دسترس نیست",
        buttonText: "خرید بلیت",
      }));

      // Categorize shows based on genre or other criteria
      const classic = transformedShows.filter(show => 
        shows.find(s => s.id === show.id)?.genre?.includes('کلاسیک') || 
        shows.find(s => s.id === show.id)?.genre?.includes('تراژدی')
      );
      
      const modern = transformedShows.filter(show => 
        shows.find(s => s.id === show.id)?.genre?.includes('مدرن') || 
        shows.find(s => s.id === show.id)?.genre?.includes('درام')
      );
      
      const child = transformedShows.filter(show => 
        shows.find(s => s.id === show.id)?.genre?.includes('کودک') ||
        shows.find(s => s.id === show.id)?.age_rating === 'کودک'
      );

      // If no specific categorization, distribute shows evenly
      if (classic.length === 0 && modern.length === 0 && child.length === 0) {
        const thirdLength = Math.ceil(transformedShows.length / 3);
        setClassicTheaters(transformedShows.slice(0, thirdLength));
        setModernTheaters(transformedShows.slice(thirdLength, thirdLength * 2));
        setChildTheaters(transformedShows.slice(thirdLength * 2));
      } else {
        setClassicTheaters(classic);
        setModernTheaters(modern);
        setChildTheaters(child);
      }
    }
  }, [shows]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-foreground">در حال بارگذاری نمایش‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      <HeroSlider />

      {/* Main Content */}
      <main className="py-8">
        <CategorySection
          categoryName="نمایش‌های کلاسیک"
          theaters={classicTheaters}
          onLoadMore={() => {}}
          hasMore={false}
          loading={false}
        />
        <CategorySection
          categoryName="نمایش‌های مدرن"
          theaters={modernTheaters}
          onLoadMore={() => {}}
          hasMore={false}
          loading={false}
        />
        <CategorySection
          categoryName="نمایش‌های کودک"
          theaters={childTheaters}
          onLoadMore={() => {}}
          hasMore={false}
          loading={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
