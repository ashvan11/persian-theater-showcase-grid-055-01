
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "کتابخانه نیمه شب",
    subtitle: "نمایش کتابخانه نیمه شب",
    description: "نمایشی کتابخانه‌ای نیمه شب نام نوشته مت هیگ است که در آن قهرمان مرگ و زندگی اش میان مرگ و زندگی تعلیق یافته است.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=600&fit=crop",
    rating: "4.5",
    showTime: "ساعت 19 در 3 سانس و 53'",
    theater: "تماشاخانه ملک",
    ticketButton: "خرید بلیت"
  },
  {
    id: 2,
    title: "ملکه‌ها",
    subtitle: "نمایش ملکه‌ها",
    description: "داستان زنانی قدرتمند که در طول تاریخ حکومت کرده‌اند و تأثیرات عمیقی بر جامعه گذاشته‌اند.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
    rating: "4.8",
    showTime: "ساعت 20 در 2 سانس و 45'",
    theater: "تئاتر شهر",
    ticketButton: "خرید بلیت"
  },
  {
    id: 3,
    title: "شب آبی",
    subtitle: "نمایش شب آبی",
    description: "نمایشی شاعرانه و عمیق که داستان عشق و از دست دادن را در قالبی نمادین روایت می‌کند.",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1200&h=600&fit=crop",
    rating: "4.2",
    showTime: "ساعت 18 در 4 سانس و 30'",
    theater: "تالار رودکی",
    ticketButton: "خرید بلیت"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mr-auto">
                <div className="animate-fade-in">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl text-gold-400 mb-6">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-8 text-white/80">
                    <div className="flex items-center gap-2">
                      <span className="text-gold-400">★</span>
                      <span>{slide.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{slide.showTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎭</span>
                      <span>{slide.theater}</span>
                    </div>
                  </div>
                  
                  <button className="bg-gold-600 hover:bg-gold-700 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
                    {slide.ticketButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
      >
        <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-gold-500" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
