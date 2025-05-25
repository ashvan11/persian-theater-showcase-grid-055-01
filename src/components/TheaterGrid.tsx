
import TheaterCard from "./TheaterCard";

const theaterCategories = [
  {
    id: 1,
    title: "کتابخانه نیمه شب",
    subtitle: "نمایش کتابخانه نیمه شب",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    rating: "4.5",
    shows: "244",
    description: "نمایشی کتابخانه‌ای که در آن قهرمان داستان میان مرگ و زندگی تعلیق یافته است و باید انتخاب کند.",
    time: "ساعت 19 در 3 سانس و 53'",
    price: "خرید 53' ساعت و 3 سانس تئاتر در",
    buttonText: "خرید بلیت"
  },
  {
    id: 2,
    title: "نمایش مجهول",
    subtitle: "نمایش مجهول",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    rating: "4.2",
    shows: "398",
    description: "داستانی پیچیده و مرموز که تماشاگران را به تفکر عمیق درباره هویت و معنای زندگی دعوت می‌کند.",
    time: "ساعت 20 در 2 سانس و 45'",
    price: "خرید 45' ساعت و 2 سانس تئاتر در",
    buttonText: "خرید بلیت"
  },
  {
    id: 3,
    title: "نمایش ناامیدی",
    subtitle: "نمایش ناامیدی",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
    rating: "4.6",
    shows: "201",
    description: "نمایشی دراماتیک که به بررسی عمق احساسات انسانی و مبارزه با چالش‌های زندگی می‌پردازد.",
    time: "ساعت 18 در 4 سانس و 30'",
    price: "خرید 30' ساعت و 4 سانس تئاتر در",
    buttonText: "خرید بلیت"
  },
  {
    id: 4,
    title: "نمایش ملکه‌ها",
    subtitle: "نمایش ملکه‌ها",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop",
    rating: "4.8",
    shows: "172",
    description: "داستان زنان قدرتمند تاریخ که با شجاعت و حکمت خود مسیر تمدن‌ها را تغییر دادند.",
    time: "ساعت 19:30 در 3 سانس و 60'",
    price: "خرید 60' ساعت و 3 سانس تئاتر در",
    buttonText: "خرید بلیت"
  },
  {
    id: 5,
    title: "نمایش مقاومت خودکشی",
    subtitle: "نمایش مقاومت خودکشی",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=400&h=300&fit=crop",
    rating: "4.1",
    shows: "398",
    description: "نمایشی قدرتمند که به موضوع حساس سلامت روان و اهمیت حمایت اجتماعی می‌پردازد.",
    time: "ساعت 21 در 2 سانس و 55'",
    price: "خرید 55' ساعت و 2 سانس تئاتر در",
    buttonText: "خرید بلیت"
  },
  {
    id: 6,
    title: "اینترنت زندگی میل کیچ",
    subtitle: "نمایش اینترنت زندگی میل کیچ",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    rating: "3.8",
    shows: "173",
    description: "نگاهی انتقادی به تأثیرات فناوری مدرن بر زندگی روزمره و روابط انسانی در عصر دیجیتال.",
    time: "ساعت 20:30 در 3 سانس و 40'",
    price: "خرید 40' ساعت و 3 سانس تئاتر در",
    buttonText: "خرید بلیت"
  }
];

const TheaterGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {theaterCategories.map((category, index) => (
        <TheaterCard
          key={category.id}
          category={category}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

export default TheaterGrid;
