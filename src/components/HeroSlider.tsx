
import { useState, useEffect } from "react";
import { useSliders } from "@/hooks/useSliders";

const HeroSlider = () => {
  const { data: slides, isLoading } = useSliders();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return (
      <div className="h-[500px] md:h-[600px] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="h-[500px] md:h-[600px] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">هیچ اسلایدی یافت نشد</div>
      </div>
    );
  }

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
            style={{ backgroundImage: `url(${slide.image_url})` }}
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
                  {slide.description && (
                    <p className="text-lg text-white/90 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                  )}
                  
                  <button 
                    onClick={() => window.location.href = slide.link_url || '/'}
                    className="bg-gold-600 hover:bg-gold-700 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                  >
                    مشاهده بیشتر
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
