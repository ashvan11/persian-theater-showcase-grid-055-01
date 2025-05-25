
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExpandableHeader from "@/components/ExpandableHeader";
import Footer from "@/components/Footer";
import { Theater, Music, Clock, Fingerprint, Building, Utensils, Square, Mail } from "lucide-react";

const CreateNew = () => {
  const [activeTab, setActiveTab] = useState("create");

  const createCards = [
    {
      title: "نمایش",
      description: "یک اجرای نمایش، نمایش موزیکال، محیطی ...",
      icon: Theater,
      category: "برگه"
    },
    {
      title: "کنسرت", 
      description: "یک اجرای موسیقی",
      icon: Music,
      category: "برگه"
    },
    {
      title: "دیگر انواع",
      description: "یک برگه رویداد یا محصول از هر نوع دیگری...",
      icon: Clock,
      category: "برگه"
    }
  ];

  const channelCards = [
    {
      title: "شخصیت حقیقی",
      description: "یک هنرمند، فعال پشت صحنه، نویسنده ...",
      icon: Fingerprint,
      category: "کانال"
    },
    {
      title: "سازمان یا برند",
      description: "یک گروه هنری، برند، شرکت، سالن ...",
      icon: Building,
      category: "کانال"
    },
    {
      title: "محل غذا و نوشیدنی",
      description: "یک محل خوراک و نوشیدنی، مانند کافه و رستوران",
      icon: Utensils,
      category: "کانال"
    }
  ];

  const advertisementCards = [
    {
      title: "بنر",
      description: "بنر تبلیغاتی برای بیشتر دیده شدن",
      icon: Square,
      category: "تبلیغ"
    },
    {
      title: "پیامک",
      description: "فرستادن پیامک هدفمند برای آگاهی‌رسانی بیشتر",
      icon: Mail,
      category: "تبلیغ"
    }
  ];

  const handleCardClick = (title: string) => {
    console.log(`Creating new: ${title}`);
    // Handle navigation to creation form
  };

  const renderCards = (cards: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-shadow border-border/50 hover:border-gold-500/50"
            onClick={() => handleCardClick(card.title)}
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-100 dark:bg-gold-900/20 rounded-full">
                  <IconComponent className="w-8 h-8 text-gold-600" />
                </div>
              </div>
              <CardTitle className="text-lg mb-2 text-foreground">{card.title}</CardTitle>
              <CardDescription className="text-sm text-foreground/70 leading-relaxed">
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-foreground">ایجاد آیتم جدید</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create" className="text-lg">ساختن</TabsTrigger>
              <TabsTrigger value="management" className="text-lg">مدیریت</TabsTrigger>
              <TabsTrigger value="activities" className="text-lg">فعالیت‌ها</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-12">
              {/* برگه Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gold-600 mb-2">برگه</h2>
                  <p className="text-foreground/80">
                    یک رویداد یا محصول، همچون نمایش، کنسرت، کتاب، نمایشگاه نقاشی، محصول دست‌ساز هنری و ...
                  </p>
                </div>
                {renderCards(createCards)}
              </section>

              {/* کانال Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gold-600 mb-2">کانال</h2>
                  <p className="text-foreground/80">
                    یک برند حقیقی یا حقوقی، همچون یک هنرمند، گروه، تماشاخانه، موسسه، سازمان، کافه و ...
                  </p>
                </div>
                {renderCards(channelCards)}
              </section>

              {/* تبلیغ Section */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gold-600 mb-2">تبلیغ</h2>
                  <p className="text-foreground/80">
                    یک تبلیغ، همچون پیامک هدفمند یا بنر
                  </p>
                </div>
                {renderCards(advertisementCards)}
              </section>
            </TabsContent>

            <TabsContent value="management" className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4 text-foreground">مدیریت آیتم‌ها</h3>
                <p className="text-foreground/70 mb-6">
                  در اینجا می‌توانید آیتم‌های ایجاد شده خود را مدیریت کنید.
                </p>
                <Button variant="outline" className="border-gold-500 text-gold-600 hover:bg-gold-50">
                  مشاهده آیتم‌های من
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4 text-foreground">فعالیت‌ها</h3>
                <p className="text-foreground/70 mb-6">
                  آخرین فعالیت‌ها و اعلان‌های مربوط به آیتم‌های شما.
                </p>
                <Button variant="outline" className="border-gold-500 text-gold-600 hover:bg-gold-50">
                  مشاهده فعالیت‌ها
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateNew;
