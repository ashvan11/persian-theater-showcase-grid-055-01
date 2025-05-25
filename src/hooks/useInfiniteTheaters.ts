
import { useState, useCallback } from "react";

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

interface CategoryData {
  name: string;
  theaters: TheaterItem[];
  hasMore: boolean;
  loading: boolean;
  page: number;
}

const mockTheaterData = {
  "نمایش‌های کلاسیک": [
    {
      id: 1,
      title: "کتابخانه نیمه شب",
      subtitle: "نمایش کتابخانه نیمه شب",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      rating: "4.5",
      shows: "244",
      description: "نمایشی کتابخانه‌ای که در آن قهرمان داستان میان مرگ و زندگی تعلیق یافته است و باید انتخاب کند.",
      time: "ساعت 19 در 3 سانس و 53'",
      price: "خرید 53' ساعت و 3 سانس تئاتر در",
      buttonText: "خرید بلیت"
    },
    // ... more items would be here
  ],
  "نمایش‌های مدرن": [
    {
      id: 2,
      title: "نمایش مجهول",
      subtitle: "نمایش مجهول",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      rating: "4.2",
      shows: "398",
      description: "داستانی پیچیده و مرموز که تماشاگران را به تفکر عمیق درباره هویت و معنای زندگی دعوت می‌کند.",
      time: "ساعت 20 در 2 سانس و 45'",
      price: "خرید 45' ساعت و 2 سانس تئاتر در",
      buttonText: "خرید بلیت"
    },
  ],
  "نمایش‌های کودک": [
    {
      id: 3,
      title: "نمایش ناامیدی",
      subtitle: "نمایش ناامیدی",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      rating: "4.6",
      shows: "201",
      description: "نمایشی دراماتیک که به بررسی عمق احساسات انسانی و مبارزه با چالش‌های زندگی می‌پردازد.",
      time: "ساعت 18 در 4 سانس و 30'",
      price: "خرید 30' ساعت و 4 سانس تئاتر در",
      buttonText: "خرید بلیت"
    },
  ]
};

export const useInfiniteTheaters = () => {
  const [categories, setCategories] = useState<CategoryData[]>(() => {
    return Object.entries(mockTheaterData).map(([name, theaters]) => ({
      name,
      theaters: theaters.slice(0, 3), // Start with 3 items
      hasMore: true,
      loading: false,
      page: 1
    }));
  });

  const loadMoreForCategory = useCallback((categoryName: string) => {
    setCategories(prev => prev.map(category => {
      if (category.name === categoryName && !category.loading) {
        const newPage = category.page + 1;
        const startIndex = newPage * 3;
        const endIndex = startIndex + 3;
        
        // Simulate API delay
        setTimeout(() => {
          setCategories(prevCategories => prevCategories.map(cat => {
            if (cat.name === categoryName) {
              const allTheaters = mockTheaterData[categoryName as keyof typeof mockTheaterData] || [];
              const newTheaters = [];
              
              // Generate more theater items for demonstration
              for (let i = startIndex; i < endIndex; i++) {
                const baseTheater = allTheaters[0];
                if (baseTheater) {
                  newTheaters.push({
                    ...baseTheater,
                    id: baseTheater.id + i,
                    title: `${baseTheater.title} ${i + 1}`,
                  });
                }
              }
              
              return {
                ...cat,
                theaters: [...cat.theaters, ...newTheaters],
                page: newPage,
                loading: false,
                hasMore: cat.theaters.length + newTheaters.length < 15 // Limit to 15 items
              };
            }
            return cat;
          }));
        }, 1000);

        return {
          ...category,
          loading: true
        };
      }
      return category;
    }));
  }, []);

  return {
    categories,
    loadMoreForCategory
  };
};
