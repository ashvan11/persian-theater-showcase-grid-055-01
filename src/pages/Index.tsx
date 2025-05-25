
import { useState } from "react";
import HeroSlider from "../components/HeroSlider";
import TheaterGrid from "../components/TheaterGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gold-500">تئاتر نما</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">خانه</a>
                <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">نمایش‌ها</a>
                <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">تالارها</a>
                <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">اخبار</a>
                <a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">تماس</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gold-600 text-background rounded-lg hover:bg-gold-700 transition-colors">
                ورود / ثبت نام
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Theater Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">دسته‌بندی نمایش‌ها</h2>
            <p className="text-foreground/70 text-lg">انواع نمایش‌های تئاتری را کشف کنید</p>
          </div>
          <TheaterGrid />
        </div>
      </section>

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
