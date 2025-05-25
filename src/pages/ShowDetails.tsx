
import { useState } from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Share, MoreHorizontal, Calendar, Clock, Ticket } from "lucide-react";

const ShowDetails = () => {
  const [activeTab, setActiveTab] = useState("location");

  const crewCast = [
    { role: "کارگردان", name: "احمد محمدی", image: "/placeholder.svg" },
    { role: "بازیگر اصلی", name: "مریم احمدی", image: "/placeholder.svg" },
    { role: "بازیگر", name: "علی رضایی", image: "/placeholder.svg" },
    { role: "طراح صحنه", name: "سارا کریمی", image: "/placeholder.svg" },
  ];

  const relatedShows = [
    { title: "نمایش کلاسیک دیگر", venue: "تالار رودکی", price: "150,000 تومان" },
    { title: "نمایش مدرن", venue: "تالار شهرزاد", price: "120,000 تومان" },
    { title: "نمایش موزیکال", venue: "تالار ایرانشهر", price: "200,000 تومان" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-gold-600 to-gold-800">
        <img
          src="/placeholder.svg"
          alt="پوستر نمایش"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs and Actions */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">خانه</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">نمایش‌ها</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>نمایش کلاسیک شکسپیر</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">نمایش کلاسیک شکسپیر</h1>
              <p className="text-foreground/70">اثری بی‌نظیر از ویلیام شکسپیر</p>
            </div>

            {/* Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="location">موقعیت</TabsTrigger>
                <TabsTrigger value="information">اطلاعات</TabsTrigger>
                <TabsTrigger value="rating">امتیاز</TabsTrigger>
                <TabsTrigger value="reviews">نظرات</TabsTrigger>
              </TabsList>

              {/* Location Tab Content */}
              <TabsContent value="location" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات مکان</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">آدرس:</h3>
                      <p className="text-foreground/70">تهران، خیابان ولیعصر، تالار رودکی</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">تلفن:</h3>
                      <p className="text-foreground/70">021-88888888</p>
                    </div>
                    <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">نقشه - نمایش موقعیت</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">مکان‌های نزدیک</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">پارکینگ عمومی</h4>
                          <p className="text-sm text-foreground/70">فاصله: 2 دقیقه پیاده</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">ایستگاه مترو</h4>
                          <p className="text-sm text-foreground/70">فاصله: 5 دقیقه پیاده</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Information Tab Content */}
              <TabsContent value="information" className="space-y-6 mt-6">
                {/* Event Meta-Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>جزئیات نمایش</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold-100 rounded-lg">
                          <Ticket className="h-5 w-5 text-gold-600" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">قیمت</p>
                          <p className="font-semibold">180,000 تومان</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold-100 rounded-lg">
                          <Calendar className="h-5 w-5 text-gold-600" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">تاریخ</p>
                          <p className="font-semibold">15 آذر 1403</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold-100 rounded-lg">
                          <Clock className="h-5 w-5 text-gold-600" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">زمان</p>
                          <p className="font-semibold">19:30</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gold-100 rounded-lg">
                          <Clock className="h-5 w-5 text-gold-600" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70">مدت زمان</p>
                          <p className="font-semibold">2 ساعت</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-1">محل اجرا</p>
                      <p className="font-semibold">تالار رودکی</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Crew & Cast */}
                <Card>
                  <CardHeader>
                    <CardTitle>عوامل اجرایی</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {crewCast.map((person, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={person.image} alt={person.name} />
                            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-foreground/70">{person.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Synopsis */}
                <Card>
                  <CardHeader>
                    <CardTitle>خلاصه داستان</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed">
                      این نمایش برگرفته از یکی از شاهکارهای ویلیام شکسپیر است که داستان عشق و تراژدی را به شکلی بی‌نظیر روایت می‌کند. 
                      اجرای این نمایش با بازیگرانی مطرح و کارگردانی حرفه‌ای، تجربه‌ای فراموش‌نشدنی برای تماشاگران به ارمغان می‌آورد.
                      داستان در قرون وسطا می‌گذرد و مضامین جاودانه‌ای از عشق، قدرت و انتقام را بررسی می‌کند.
                    </p>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-foreground/70 mb-1">محدودیت سنی</p>
                        <Badge variant="outline">مناسب برای افراد بالای 12 سال</Badge>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70 mb-2">برچسب‌ها</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge>کلاسیک</Badge>
                          <Badge>شکسپیر</Badge>
                          <Badge>تراژدی</Badge>
                          <Badge>رمانتیک</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70 mb-1">تعداد بازدید</p>
                        <p className="font-semibold">2,847 بازدید</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Rating Tab Content */}
              <TabsContent value="rating" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>امتیاز کاربران</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="text-4xl font-bold text-gold-500 mb-2">4.5</div>
                      <div className="text-foreground/70 mb-4">از 5 امتیاز</div>
                      <div className="text-sm text-foreground/60">بر اساس 127 نظر</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab Content */}
              <TabsContent value="reviews" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>نظرات کاربران</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-4 mb-3">
                          <Avatar>
                            <AvatarFallback>م.ا</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">مریم احمدی</p>
                            <p className="text-sm text-foreground/70">2 روز پیش</p>
                          </div>
                        </div>
                        <p className="text-foreground/80">نمایش فوق‌العاده‌ای بود. بازی بازیگران بسیار قابل تحسین و صحنه‌پردازی بی‌نظیر.</p>
                      </div>
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-4 mb-3">
                          <Avatar>
                            <AvatarFallback>ع.ر</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">علی رضایی</p>
                            <p className="text-sm text-foreground/70">1 هفته پیش</p>
                          </div>
                        </div>
                        <p className="text-foreground/80">تجربه‌ای متفاوت و جذاب. کیفیت اجرا در سطح بالایی بود.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Ticket Purchase Section */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-center">خرید بلیط</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-600 mb-2">180,000 تومان</div>
                  <p className="text-sm text-foreground/70">قیمت هر بلیط</p>
                </div>
                <Button className="w-full bg-gold-600 hover:bg-gold-700 text-background">
                  خرید بلیط
                </Button>
                <div className="text-center text-sm text-foreground/60">
                  <p>تعداد بلیط باقی‌مانده: 23</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Shows */}
            <Card>
              <CardHeader>
                <CardTitle>نمایش‌های مرتبط</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedShows.map((show, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <h4 className="font-medium mb-1">{show.title}</h4>
                    <p className="text-sm text-foreground/70 mb-2">{show.venue}</p>
                    <p className="text-sm font-semibold text-gold-600">{show.price}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
