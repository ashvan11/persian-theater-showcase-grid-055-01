
import { useState } from "react";

interface TheaterCategory {
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

interface TheaterCardProps {
  category: TheaterCategory;
  delay?: number;
}

const TheaterCard = ({ category, delay = 0 }: TheaterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="theater-card group cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className={`theater-card-image overflow-hidden ${isHovered ? 'h-32' : 'h-48'}`}>
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-gold-400 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-1">
          <span>★</span>
          <span>{category.rating}</span>
        </div>
        
        {/* Shows Count */}
        <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
          {category.shows} نمایش
        </div>
      </div>

      {/* Content Section */}
      <div className={`theater-card-content p-4 ${isHovered ? 'flex-1' : ''}`}>
        <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
          {category.title}
        </h3>
        <p className="text-gold-500 text-sm mb-3">
          {category.subtitle}
        </p>
        
        {/* Description - Always visible but expands on hover */}
        <p className={`text-foreground/70 text-sm leading-relaxed mb-4 ${
          isHovered ? 'line-clamp-none' : 'line-clamp-2'
        }`}>
          {category.description}
        </p>

        {/* Show Time */}
        <div className="flex items-center gap-2 text-foreground/60 text-sm mb-3">
          <span>🕐</span>
          <span>{category.time}</span>
        </div>

        {/* Price Info */}
        {isHovered && (
          <div className="text-foreground/60 text-sm mb-4 animate-fade-in">
            {category.price}
          </div>
        )}

        {/* Action Button */}
        <button className={`w-full bg-gold-600 hover:bg-gold-700 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-90'
        }`}>
          {category.buttonText}
        </button>
      </div>
    </div>
  );
};

export default TheaterCard;
