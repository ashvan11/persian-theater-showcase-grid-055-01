
import { useState } from 'react';

interface TheaterShow {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  rating: string;
  duration: string;
  date: string;
  location: string;
  price: string;
  image: string;
  director: string;
  cast: string;
}

interface TheaterCardProps {
  show: TheaterShow;
}

const TheaterCard = ({ show }: TheaterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div
          className={`${show.image} transition-all duration-700 ease-out ${
            isHovered ? 'h-32' : 'h-48'
          } flex items-center justify-center relative`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="text-white text-sm">{show.rating}</span>
            </div>
            <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
              {show.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
          {show.title}
        </h3>

        <p className={`text-white/70 text-sm leading-relaxed transition-all duration-500 ${
          isHovered ? 'line-clamp-none' : 'line-clamp-2'
        }`}>
          {isHovered ? show.fullDescription : show.description}
        </p>

        <div className={`transition-all duration-500 overflow-hidden ${
          isHovered ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">کارگردان:</span>
              <span className="text-white">{show.director}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">بازیگران:</span>
              <span className="text-white text-right">{show.cast}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">مدت زمان:</span>
              <span className="text-white">{show.duration}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">تاریخ:</span>
              <span className="text-white">{show.date}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">مکان:</span>
              <span className="text-white text-right">{show.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">قیمت:</span>
              <span className="text-yellow-400 font-bold">{show.price}</span>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-300 ${
          isHovered ? 'mt-4' : 'mt-6'
        }`}>
          <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-300">
            مشاهده جزئیات و خرید بلیط
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheaterCard;
