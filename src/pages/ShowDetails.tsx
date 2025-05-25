import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ExpandableHeader from "../components/ExpandableHeader";

const ShowDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");

  // Mock data for demonstration
  const show = {
    id: 1,
    title: "نام نمایش",
    description: "توضیحات کامل نمایش...",
    imageUrl: "https://via.placeholder.com/800x400",
    relatedShows: [
      { id: 2, title: "نمایش مرتبط 1", imageUrl: "https://via.placeholder.com/300x200" },
      { id: 3, title: "نمایش مرتبط 2", imageUrl: "https://via.placeholder.com/300x200" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <img 
          src={show.imageUrl}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">{show.title}</h1>
        </div>
      </div>

      {/* Navigation & Event Title */}
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-foreground/60">
            <li><Link to="/" className="hover:text-gold-500">خانه</Link></li>
            <li>/</li>
            <li className="text-foreground">{show.title}</li>
          </ol>
        </nav>

        {/* Event Title & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{show.title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-gold-600 text-background rounded-lg hover:bg-gold-700 transition-colors">
              علاقه‌مندی‌ها
            </button>
            <button className="px-4 py-2 border border-border/40 rounded-lg hover:bg-accent transition-colors">
              اشتراک‌گذاری
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border/40 mb-8">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "description"
                  ? "bg-card text-foreground font-semibold"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              توضیحات
            </button>
            <button
              onClick={() => setActiveTab("cast")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "cast"
                  ? "bg-card text-foreground font-semibold"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              بازیگران
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "reviews"
                  ? "bg-card text-foreground font-semibold"
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
                <h3 className="text-lg font-bold mb-4">توضیحات نمایش</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {show.description}
                </p>
              </div>
            )}

            {activeTab === "cast" && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">بازیگران</h3>
                <p className="text-foreground/70">
                  اطلاعات بازیگران نمایش در این قسمت قرار می‌گیرد.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">نظرات</h3>
                <p className="text-foreground/70">
                  نظرات کاربران در مورد نمایش در این قسمت نمایش داده می‌شود.
                </p>
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
                  <span className="font-bold text-lg">150,000 تومان</span>
                </div>
                <div className="text-sm text-foreground/60">
                  سانس‌های موجود: شنبه تا چهارشنبه
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
              <div className="grid grid-cols-1 gap-4">
                {show.relatedShows.map((relatedShow) => (
                  <Link to={`/show/${relatedShow.id}`} key={relatedShow.id} className="flex items-center gap-4">
                    <img
                      src={relatedShow.imageUrl}
                      alt={relatedShow.title}
                      className="w-20 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{relatedShow.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
