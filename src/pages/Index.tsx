
import HeroSlider from "../components/HeroSlider";
import CategorySection from "../components/CategorySection";
import ExpandableHeader from "../components/ExpandableHeader";
import { useInfiniteTheaters } from "../hooks/useInfiniteTheaters";
import { Link } from "react-router-dom";

const Index = () => {
  const { categories, loadMoreForCategory } = useInfiniteTheaters();

  return (
    <div className="min-h-screen bg-background">
      {/* Expandable Header */}
      <ExpandableHeader />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Categories with Infinity Scroll */}
      <div className="py-16">
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">دسته‌بندی نمایش‌ها</h2>
            <p className="text-foreground/70 text-lg">انواع نمایش‌های تئاتری را کشف کنید</p>
            <div className="mt-4">
              <Link 
                to="/show/1" 
                className="inline-block px-6 py-3 bg-gold-600 text-background rounded-lg hover:bg-gold-700 transition-colors"
              >
                مشاهده نمونه صفحه جزئیات نمایش
              </Link>
            </div>
          </div>
        </div>
        
        {categories.map(category => (
          <CategorySection
            key={category.name}
            categoryName={category.name}
            theaters={category.theaters}
            onLoadMore={() => loadMoreForCategory(category.name)}
            hasMore={category.hasMore}
            loading={category.loading}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gold-500 font-bold text-lg mb-4">تئاتر نما</h3>
              <p className="text-foreground/70">مرجع کامل اطلاعات تئاترهای ایران</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">لینک‌های مفید</h4>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#" className="hover:text-gold-500 transition-colors">درباره ما</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">تماس با ما</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">قوانین</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">دسته‌بندی‌ها</h4>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#" className="hover:text-gold-500 transition-colors">نمایش کلاسیک</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">نمایش مدرن</a></li>
                <li><a href="#" className="hover:text-gold-500 transition-colors">نمایش کودک</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">شبکه‌های اجتماعی</h4>
              <div className="flex gap-4">
                <a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors">اینستاگرام</a>
                <a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors">تلگرام</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-foreground/50">
            <p>&copy; 1403 تئاتر نما. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
