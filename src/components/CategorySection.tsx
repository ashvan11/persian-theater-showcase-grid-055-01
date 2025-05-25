
import { useState, useEffect, useCallback } from "react";
import TheaterCard from "./TheaterCard";

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

interface CategorySectionProps {
  categoryName: string;
  theaters: TheaterItem[];
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

const CategorySection = ({ categoryName, theaters, onLoadMore, hasMore, loading }: CategorySectionProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Define subcategories for each main category
  const getSubcategories = (category: string) => {
    switch (category) {
      case "نمایش‌های کلاسیک":
        return ["تراژدی", "کمدی", "درام", "شکسپیر", "چخوف"];
      case "نمایش‌های مدرن":
        return ["تجربی", "پست مدرن", "طنز", "اجتماعی", "روانشناختی"];
      case "نمایش‌های کودک":
        return ["خردسال", "نوجوان", "خانوادگی", "آموزشی", "عروسکی"];
      default:
        return [];
    }
  };

  const subcategories = getSubcategories(categoryName);

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setIsIntersecting(true);
        onLoadMore();
      }
    });
    
    if (node) observer.observe(node);
    
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [loading, hasMore, onLoadMore]);

  return (
    <section className="mb-16">
      {/* Sticky Category Header with Subcategories */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border/40 py-4 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gold-500 mb-3">{categoryName}</h2>
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  className="px-3 py-1 text-sm bg-card hover:bg-accent border border-border/40 rounded-lg transition-colors text-foreground/80 hover:text-foreground"
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Theater Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theaters.map((theater, index) => (
            <div
              key={theater.id}
              ref={index === theaters.length - 1 ? lastElementRef : undefined}
            >
              <TheaterCard
                category={theater}
                delay={index * 50}
              />
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
          </div>
        )}

        {/* End of content indicator */}
        {!hasMore && theaters.length > 0 && (
          <div className="text-center mt-8 text-foreground/60">
            پایان فهرست نمایش‌های {categoryName}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
