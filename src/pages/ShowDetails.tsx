
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ExpandableHeader from "../components/ExpandableHeader";
import { Calendar, Clock, MapPin, Star, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "../components/Footer";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isVerified: boolean;
}

interface Show {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  venue: string;
  dates: string;
  duration: string;
  price: number;
  director: string;
  genre: string;
  ageRating: string;
  cast: CrewMember[];
  crew: CrewMember[];
  relatedShows: Array<{
    id: string;
    title: string;
    imageUrl: string;
    price: number;
  }>;
}

const ShowDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");

  // Mock comprehensive show data
  const show: Show = {
    id: id || "1",
    title: "هملت",
    description: "یکی از شاهکارهای ویلیام شکسپیر که داستان شاهزاده دانمارک را روایت می‌کند. این نمایش تراژیک که به زبان فارسی اجرا می‌شود، مسائل عمیق انسانی مانند انتقام، عشق، و جستجوی حقیقت را بررسی می‌کند. کارگردانی احمد محمدی با بازی درخشان بازیگران مطرح تئاتر ایران این اثر کلاسیک را به صورت مدرن و جذاب ارائه می‌دهد.",
    imageUrl: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=400&fit=crop",
    venue: "تالار شهر - سالن اصلی",
    dates: "15 دی الی 25 دی 1403",
    duration: "120 دقیقه",
    price: 150000,
    director: "احمد محمدی",
    genre: "تراژدی",
    ageRating: "12+",
    cast: [
      {
        id: "1",
        name: "علی احمدی",
        role: "هملت",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        isVerified: true
      },
      {
        id: "2", 
        name: "فاطمه رضایی",
        role: "اوفلیا",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3c8?w=100&h=100&fit=crop&crop=face",
        isVerified: true
      },
      {
        id: "3",
        name: "محمد کریمی",
        role: "کلاودیوس",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        isVerified: false
      }
    ],
    crew: [
      {
        id: "1",
        name: "احمد محمدی",
        role: "کارگردان",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        isVerified: true
      },
      {
        id: "4",
        name: "مریم صادقی",
        role: "طراح صحنه",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        isVerified: true
      },
      {
        id: "5",
        name: "رضا موسوی",
        role: "طراح نور",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        isVerified: false
      }
    ],
    relatedShows: [
      { 
        id: "2", 
        title: "مرگ فروشنده", 
        imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=300&h=200&fit=crop",
        price: 120000
      },
      { 
        id: "3", 
        title: "شب دوازدهم", 
        imageUrl: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300&h=200&fit=crop",
        price: 140000
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <img 
          src={show.imageUrl}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{show.title}</h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {show.genre}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {show.ageRating}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Event Details */}
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-foreground/60">
            <li><Link to="/" className="hover:text-gold-500">خانه</Link></li>
            <li>/</li>
            <li className="text-foreground">{show.title}</li>
          </ol>
        </nav>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-card rounded-lg p-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">تاریخ اجرا</p>
              <p className="font-semibold">{show.dates}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">مدت زمان</p>
              <p className="font-semibold">{show.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">مکان</p>
              <p className="font-semibold">{show.venue}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">کارگردان</p>
              <p className="font-semibold">{show.director}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border/40 mb-8">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "description"
                  ? "bg-card text-foreground font-semibold border-b-2 border-gold-500"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              توضیحات
            </button>
            <button
              onClick={() => setActiveTab("cast")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "cast"
                  ? "bg-card text-foreground font-semibold border-b-2 border-gold-500"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              بازیگران و عوامل
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "reviews"
                  ? "bg-card text-foreground font-semibold border-b-2 border-gold-500"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              نظرات
            </button>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {/* Tab Content */}
            {activeTab === "description" && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">درباره نمایش</h3>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {show.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/60">ژانر</p>
                    <p className="font-semibold">{show.genre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">رده سنی</p>
                    <p className="font-semibold">{show.ageRating}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cast" && (
              <div className="space-y-6">
                {/* Cast Section */}
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">بازیگران</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {show.cast.map((member) => (
                      <Link
                        key={member.id}
                        to={`/crew/${member.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold flex items-center gap-1">
                            {member.name}
                            {member.isVerified && <Award className="w-4 h-4 text-gold-500" />}
                          </p>
                          <p className="text-sm text-foreground/60">{member.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Crew Section */}
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">عوامل</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {show.crew.map((member) => (
                      <Link
                        key={member.id}
                        to={`/crew/${member.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                      >
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold flex items-center gap-1">
                            {member.name}
                            {member.isVerified && <Award className="w-4 h-4 text-gold-500" />}
                          </p>
                          <p className="text-sm text-foreground/60">{member.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">نظرات تماشاگران</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">4.8</span>
                    <span className="text-foreground/60">(127 نظر)</span>
                  </div>
                  
                  <p className="text-foreground/70">
                    نظرات و امتیازات تماشاگران پس از اجرای نمایش در این قسمت نمایش داده خواهد شد.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Ticket Purchase Section */}
            <div className="bg-card rounded-lg p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">خرید بلیت</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span>قیمت:</span>
                  <span className="font-bold text-lg">{show.price.toLocaleString()} تومان</span>
                </div>
                <div className="text-sm text-foreground/60">
                  سانس‌های موجود: شنبه تا چهارشنبه - ساعت 19:00
                </div>
              </div>

              <Link 
                to={`/book/${id}`}
                className="w-full bg-gold-600 hover:bg-gold-700 text-background font-semibold py-3 px-4 rounded-lg transition-colors block text-center"
              >
                خرید بلیت
              </Link>
            </div>

            {/* Related Shows */}
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">نمایش‌های مرتبط</h3>
              <div className="space-y-4">
                {show.relatedShows.map((relatedShow) => (
                  <Link 
                    to={`/show/${relatedShow.id}`} 
                    key={relatedShow.id} 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <img
                      src={relatedShow.imageUrl}
                      alt={relatedShow.title}
                      className="w-16 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{relatedShow.title}</h4>
                      <p className="text-sm text-foreground/60">{relatedShow.price.toLocaleString()} تومان</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShowDetails;
