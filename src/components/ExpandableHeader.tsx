
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const ExpandableHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <header className="relative z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-gold-500">تئاتر نما</Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground/80 hover:text-gold-500 transition-colors">خانه</Link>
              <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">نمایش‌ها</a>
              <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">تالارها</a>
              <Link to="/wall" className="text-foreground/80 hover:text-gold-500 transition-colors">دیوار بحث</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
              <Input
                type="text"
                placeholder="جستجو در نمایش‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 w-64 bg-background/50 border-border/50 focus:border-gold-500 text-right"
              />
            </div>
            
            {/* Expand Button */}
            <button
              onClick={toggleExpanded}
              className="px-3 py-2 text-foreground/80 hover:text-gold-500 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${isExpanded ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${isExpanded ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${isExpanded ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
            
            <button className="px-4 py-2 bg-gold-600 text-background rounded-lg hover:bg-gold-700 transition-colors">
              ورود / ثبت نام
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Menu */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-border/40 bg-background/90 backdrop-blur">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Categories */}
              <div>
                <h3 className="text-gold-500 font-semibold mb-4">دسته‌بندی‌ها</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">نمایش کلاسیک</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">نمایش مدرن</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">نمایش کودک</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">نمایش موزیکال</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">تک نفره</a></li>
                </ul>
              </div>

              {/* Cities */}
              <div>
                <h3 className="text-gold-500 font-semibold mb-4">شهرها</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">تهران</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">اصفهان</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">شیراز</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">مشهد</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">تبریز</a></li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-gold-500 font-semibold mb-4">دسترسی سریع</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">بلیط‌های امروز</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">نمایش‌های محبوب</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">تخفیف‌ها</a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">اخبار تئاتر</a></li>
                  <li><Link to="/wall" className="text-foreground/70 hover:text-gold-500 transition-colors block py-1">دیوار بحث</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ExpandableHeader;
