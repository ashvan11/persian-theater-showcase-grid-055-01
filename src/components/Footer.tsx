
import { MapPin, Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  const stations = [
    { name: "ایستگاه مترو تجریش", line: "خط 1", distance: "5 دقیقه پیاده" },
    { name: "ایستگاه اتوبوس ولیعصر", line: "خط 30", distance: "3 دقیقه پیاده" },
    { name: "ایستگاه تاکسی میدان تجریش", line: "تاکسی", distance: "2 دقیقه پیاده" },
    { name: "پارکینگ عمومی", line: "خودرو", distance: "100 متر" }
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">درباره ما</h3>
            <p className="text-foreground/80 text-sm leading-relaxed mb-4">
              پلتفرم جامع خرید بلیت نمایش‌های تئاتر ایران. تجربه‌ای بی‌نظیر در دنیای هنر نمایش.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-foreground/60 hover:text-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-gold-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-foreground/80 hover:text-gold-500 transition-colors">صفحه اصلی</Link></li>
              <li><Link to="/wall" className="text-foreground/80 hover:text-gold-500 transition-colors">دیوار گفتگو</Link></li>
              <li><Link to="/create" className="text-foreground/80 hover:text-gold-500 transition-colors">ایجاد جدید</Link></li>
              <li><a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">تالارهای نمایش</a></li>
              <li><a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">هنرمندان</a></li>
              <li><a href="#" className="text-foreground/80 hover:text-gold-500 transition-colors">تماس با ما</a></li>
            </ul>
          </div>

          {/* Stations & Transportation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">ایستگاه‌های حمل و نقل</h3>
            <ul className="space-y-3 text-sm">
              {stations.map((station, index) => (
                <li key={index} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{station.name}</p>
                    <p className="text-foreground/60 text-xs">{station.line} • {station.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold-500">تماس با ما</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500" />
                <span className="text-foreground/80">021-1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500" />
                <span className="text-foreground/80">info@theater.ir</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5" />
                <span className="text-foreground/80">تهران، خیابان ولیعصر، نرسیده به میدان تجریش</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>© 1403 تمامی حقوق محفوظ است. پلتفرم بلیت تئاتر</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold-500 transition-colors">حریم خصوصی</a>
            <a href="#" className="hover:text-gold-500 transition-colors">شرایط استفاده</a>
            <a href="#" className="hover:text-gold-500 transition-colors">پشتیبانی</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
