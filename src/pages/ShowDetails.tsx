
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ExpandableHeader from "../components/ExpandableHeader";
import { Calendar, Clock, MapPin, Star, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "../components/Footer";
import { useShowById } from "@/hooks/useShows";
import { useReviewsByShow } from "@/hooks/useReviews";
import { useShowtimesByShow } from "@/hooks/useShowtimes";

const ShowDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  
  const { data: show, isLoading: showLoading } = useShowById(id || "");
  const { data: reviews } = useReviewsByShow(id || "");
  const { data: showtimes } = useShowtimesByShow(id || "");

  if (showLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-foreground">در حال بارگذاری اطلاعات نمایش...</p>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">نمایش یافت نشد</h1>
          <Link to="/" className="text-gold-500 hover:underline">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = reviews && reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0";

  // Separate cast and crew
  const cast = show.show_crew?.filter(member => 
    ['بازیگر', 'نقش اصلی', 'نقش فرعی'].includes(member.role_in_show)
  ) || [];
  
  const crew = show.show_crew?.filter(member => 
    !['بازیگر', 'نقش اصلی', 'نقش فرعی'].includes(member.role_in_show)
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <img 
          src={show.poster_url || "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&h=400&fit=crop"}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{show.title}</h1>
            <div className="flex items-center justify-center gap-4 text-lg">
              {show.genre && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {show.genre}
                </Badge>
              )}
              {show.age_rating && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {show.age_rating}
                </Badge>
              )}
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
              <p className="font-semibold">
                {show.start_date && show.end_date 
                  ? `${new Date(show.start_date).toLocaleDateString('fa-IR')} الی ${new Date(show.end_date).toLocaleDateString('fa-IR')}`
                  : "تاریخ مشخص نشده"
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">مدت زمان</p>
              <p className="font-semibold">{show.duration ? `${show.duration} دقیقه` : "مشخص نشده"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">مکان</p>
              <p className="font-semibold">{show.theaters?.name || "نامشخص"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-500" />
            <div>
              <p className="text-sm text-foreground/60">کارگردان</p>
              <p className="font-semibold">
                {crew.find(member => member.role_in_show === 'کارگردان')?.crew_members?.stage_name || 
                 crew.find(member => member.role_in_show === 'کارگردان')?.crew_members?.profiles?.first_name || 
                 "نامشخص"}
              </p>
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
                  {show.description || "توضیحات این نمایش در دسترس نیست."}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-foreground/60">ژانر</p>
                    <p className="font-semibold">{show.genre || "نامشخص"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">رده سنی</p>
                    <p className="font-semibold">{show.age_rating || "نامشخص"}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cast" && (
              <div className="space-y-6">
                {/* Cast Section */}
                {cast.length > 0 && (
                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">بازیگران</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cast.map((member) => (
                        <Link
                          key={member.crew_members?.id}
                          to={`/crew/${member.crew_members?.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                        >
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.crew_members?.profiles?.avatar_url} alt={member.crew_members?.stage_name} />
                            <AvatarFallback>
                              {member.crew_members?.stage_name?.charAt(0) || 
                               member.crew_members?.profiles?.first_name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold flex items-center gap-1">
                              {member.crew_members?.stage_name || 
                               `${member.crew_members?.profiles?.first_name} ${member.crew_members?.profiles?.last_name}`}
                              {member.crew_members?.profiles?.is_verified && <Award className="w-4 h-4 text-gold-500" />}
                            </p>
                            <p className="text-sm text-foreground/60">{member.role_in_show}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Crew Section */}
                {crew.length > 0 && (
                  <div className="bg-card rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">عوامل</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {crew.map((member) => (
                        <Link
                          key={member.crew_members?.id}
                          to={`/crew/${member.crew_members?.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors"
                        >
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.crew_members?.profiles?.avatar_url} alt={member.crew_members?.stage_name} />
                            <AvatarFallback>
                              {member.crew_members?.stage_name?.charAt(0) || 
                               member.crew_members?.profiles?.first_name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold flex items-center gap-1">
                              {member.crew_members?.stage_name || 
                               `${member.crew_members?.profiles?.first_name} ${member.crew_members?.profiles?.last_name}`}
                              {member.crew_members?.profiles?.is_verified && <Award className="w-4 h-4 text-gold-500" />}
                            </p>
                            <p className="text-sm text-foreground/60">{member.role_in_show}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">نظرات تماشاگران</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className={`w-5 h-5 ${
                          star <= Math.round(Number(averageRating)) 
                            ? 'fill-gold-500 text-gold-500' 
                            : 'text-gray-300'
                        }`} />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">{averageRating}</span>
                    <span className="text-foreground/60">({reviews?.length || 0} نظر)</span>
                  </div>
                  
                  {reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.slice(0, 5).map((review) => (
                        <div key={review.id} className="border-b border-border/20 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={review.profiles?.avatar_url} />
                              <AvatarFallback>
                                {review.profiles?.first_name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {review.profiles?.first_name} {review.profiles?.last_name}
                              </p>
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map((star) => (
                                  <Star key={star} className={`w-3 h-3 ${
                                    star <= (review.rating || 0) 
                                      ? 'fill-gold-500 text-gold-500' 
                                      : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-foreground/70 text-sm">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-foreground/70">
                      هنوز نظری برای این نمایش ثبت نشده است.
                    </p>
                  )}
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
                  <span className="font-bold text-lg">
                    {show.price ? `${Number(show.price).toLocaleString()} تومان` : "نامشخص"}
                  </span>
                </div>
                {showtimes && showtimes.length > 0 && (
                  <div className="text-sm text-foreground/60">
                    سانس‌های موجود: {showtimes.length} سانس
                  </div>
                )}
              </div>

              <Link 
                to={`/book/${id}`}
                className="w-full bg-gold-600 hover:bg-gold-700 text-background font-semibold py-3 px-4 rounded-lg transition-colors block text-center"
              >
                خرید بلیط
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShowDetails;
