
import HeroSlider from '@/components/HeroSlider';
import TheaterGrid from '@/components/TheaterGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" dir="rtl">
      {/* Navigation Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              تئاتر<span className="text-yellow-400">لند</span>
            </div>
            <nav className="hidden md:flex items-center space-x-reverse space-x-8">
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">خانه</a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">نمایش‌ها</a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">تئاترها</a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">اخبار</a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">تماس</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Theater Grid */}
      <TheaterGrid />

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white/60">
            <p>© ۱۴۰۳ تئاترلند. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
