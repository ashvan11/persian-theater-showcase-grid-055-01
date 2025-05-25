
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "کتابخانه نیمه شب",
      subtitle: "نمایش کتابخانه نیمه شب",
      description: "نمایشی تماشایی با تکنیک‌های آوانگارد که داستان عاشقانه‌ای میان کتاب‌ها را روایت می‌کند. در آن فضای مه‌آلود که در آن میان مرگ و زندگی، حقیقت زندگی‌اش می‌گردد.",
      rating: "۴.۵",
      duration: "۲ ساعت و ۳۰ دقیقه",
      date: "۱۸ تا ۲۷ فروردین ۱۴۰۳",
      location: "تماشاخانه مگنت",
      image: "bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
    },
    {
      id: 2,
      title: "شاه لیر",
      subtitle: "شکسپیر در تهران",
      description: "اقتباسی مدرن از شاهکار شکسپیر که با ترکیب موسیقی سنتی ایرانی و تکنیک‌های مدرن تئاتر، داستان پادشاهی را روایت می‌کند که میان فرزندانش تقسیم می‌شود.",
      rating: "۴.۸",
      duration: "۳ ساعت",
      date: "۲۰ تا ۳۰ فروردین ۱۴۰۳",
      location: "تالار وحدت",
      image: "bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900"
    },
    {
      id: 3,
      title: "رقص با مرگ",
      subtitle: "تراژدی مدرن",
      description: "نمایشی تأثیرگذار درباره معنای زندگی و مرگ که با استفاده از رقص و موسیقی زنده، تماشاگران را به سفری عمیق در درون خود می‌برد.",
      rating: "۴.۷",
      duration: "۲ ساعت و ۱۵ دقیقه",
      date: "۲۵ فروردین تا ۵ اردیبهشت",
      location: "سالن اصلی تئاتر شهر",
      image: "bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index > currentSlide ? 'translate-x-full' : '-translate-x-full'
          }`}
        >
          <div className={`h-full ${slide.image} relative`}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-4 mb-4">
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ {slide.rating}
                    </span>
                    <span className="text-yellow-400 text-sm">{slide.duration}</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  
                  <p className="text-xl text-yellow-400 mb-6 animate-fade-in">
                    {slide.subtitle}
                  </p>
                  
                  <p className="text-lg text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-yellow-400">📅</span>
                      <span>{slide.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-yellow-400">📍</span>
                      <span>{slide.location}</span>
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300 animate-fade-in">
                    خرید بلیط
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
