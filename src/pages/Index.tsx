import { useState, useEffect, useCallback } from "react";
import CategorySection from "../components/CategorySection";
import ExpandableHeader from "../components/ExpandableHeader";
import Footer from "../components/Footer";

interface TheaterItem {
  id: number;
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
  const [classicTheaters, setClassicTheaters] = useState<TheaterItem[]>([]);
  const [modernTheaters, setModernTheaters] = useState<TheaterItem[]>([]);
  const [childTheaters, setChildTheaters] = useState<TheaterItem[]>([]);
  const [classicPage, setClassicPage] = useState(1);
  const [modernPage, setModernPage] = useState(1);
  const [childPage, setChildPage] = useState(1);
  const [hasMoreClassic, setHasMoreClassic] = useState(true);
  const [hasMoreModern, setHasMoreModern] = useState(true);
  const [hasMoreChild, setHasMoreChild] = useState(true);
  const [loadingClassic, setLoadingClassic] = useState(false);
  const [loadingModern, setLoadingModern] = useState(false);
  const [loadingChild, setLoadingChild] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    loadClassicTheaters();
    loadModernTheaters();
    loadChildTheaters();
  }, []);

  const generateTheaterData = (category: string, page: number): TheaterItem[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data: TheaterItem[] = [];

    for (let i = startIndex; i < endIndex; i++) {
      const id = i + 1;
      data.push({
        id: id,
        title: `${category} Show ${id}`,
        subtitle: "توضیحات کوتاه",
        image: `https://picsum.photos/id/${id + 100}/300/200`,
        rating: `${(Math.random() * 5).toFixed(1)}`,
        shows: `${Math.floor(Math.random() * 30)}`,
        description: "این یک توضیح تستی است",
        time: `${Math.floor(Math.random() * 12) + 10}:00`,
        price: `${Math.floor(Math.random() * 50) + 50} هزار تومان`,
        buttonText: "خرید بلیت",
      });
    }

    return data;
  };

  const loadClassicTheaters = async () => {
    if (loadingClassic) return;
    setLoadingClassic(true);
    
    const newData = generateTheaterData("نمایش‌های کلاسیک", classicPage);
    
    setClassicTheaters((prevTheaters) => [...prevTheaters, ...newData]);
    setHasMoreClassic(newData.length === itemsPerPage);
    setLoadingClassic(false);
  };

  const loadModernTheaters = async () => {
    if (loadingModern) return;
    setLoadingModern(true);

    const newData = generateTheaterData("نمایش‌های مدرن", modernPage);

    setModernTheaters((prevTheaters) => [...prevTheaters, ...newData]);
    setHasMoreModern(newData.length === itemsPerPage);
    setLoadingModern(false);
  };

  const loadChildTheaters = async () => {
    if (loadingChild) return;
    setLoadingChild(true);

    const newData = generateTheaterData("نمایش‌های کودک", childPage);

    setChildTheaters((prevTheaters) => [...prevTheaters, ...newData]);
    setHasMoreChild(newData.length === itemsPerPage);
    setLoadingChild(false);
  };

  const onLoadMoreClassic = () => {
    if (hasMoreClassic && !loadingClassic) {
      setClassicPage((prevPage) => prevPage + 1);
      loadClassicTheaters();
    }
  };

  const onLoadMoreModern = () => {
    if (hasMoreModern && !loadingModern) {
      setModernPage((prevPage) => prevPage + 1);
      loadModernTheaters();
    }
  };

  const onLoadMoreChild = () => {
    if (hasMoreChild && !loadingChild) {
      setChildPage((prevPage) => prevPage + 1);
      loadChildTheaters();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <img
          src="https://images.unsplash.com/photo-1560421683-392183943910?w=1400&h=400&fit=crop"
          alt="نمایش تئاتر"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            بهترین نمایش‌های تئاتر ایران را اینجا پیدا کنید
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <CategorySection
          categoryName="نمایش‌های کلاسیک"
          theaters={classicTheaters}
          onLoadMore={onLoadMoreClassic}
          hasMore={hasMoreClassic}
          loading={loadingClassic}
        />
        <CategorySection
          categoryName="نمایش‌های مدرن"
          theaters={modernTheaters}
          onLoadMore={onLoadMoreModern}
          hasMore={hasMoreModern}
          loading={loadingModern}
        />
        <CategorySection
          categoryName="نمایش‌های کودک"
          theaters={childTheaters}
          onLoadMore={onLoadMoreChild}
          hasMore={hasMoreChild}
          loading={loadingChild}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
