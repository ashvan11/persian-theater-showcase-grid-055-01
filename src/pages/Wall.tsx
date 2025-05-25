
import { useState } from "react";
import ExpandableHeader from "../components/ExpandableHeader";

interface Discussion {
  id: number;
  author: string;
  authorAvatar: string;
  role: string;
  content: string;
  timeAgo: string;
  likes: number;
  replies: number;
  theaterShow: {
    id: number;
    title: string;
    image: string;
    rating: string;
  };
}

const mockDiscussions: Discussion[] = [
  {
    id: 1,
    author: "علی احمدی",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    role: "تماشاگر",
    content: "این نمایش واقعاً فوق‌العاده بود! بازی بازیگران و صحنه‌پردازی بی‌نظیر بود. به همه پیشنهاد می‌کنم حتماً ببینید.",
    timeAgo: "۲ ساعت پیش",
    likes: 24,
    replies: 5,
    theaterShow: {
      id: 1,
      title: "کتابخانه نیمه شب",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=100&h=100&fit=crop",
      rating: "4.5"
    }
  },
  {
    id: 2,
    author: "مریم کریمی",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    role: "منتقد تئاتر",
    content: "نمایش مجهول از نظر داستان‌پردازی قوی است اما اجرا می‌توانست بهتر باشد. موسیقی متن عالی بود.",
    timeAgo: "۴ ساعت پیش",
    likes: 18,
    replies: 12,
    theaterShow: {
      id: 2,
      title: "نمایش مجهول",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop",
      rating: "4.2"
    }
  },
  {
    id: 3,
    author: "حسن موسوی",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    role: "کارگردان",
    content: "ممنون از همه عزیزانی که نمایش ناامیدی رو دیدن. نظرات شما برای ما بسیار ارزشمنده و ما رو تشویق می‌کنه.",
    timeAgo: "۶ ساعت پیش",
    likes: 45,
    replies: 20,
    theaterShow: {
      id: 3,
      title: "نمایش ناامیدی",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=100&h=100&fit=crop",
      rating: "4.6"
    }
  },
  {
    id: 4,
    author: "زهرا صادقی",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    role: "بازیگر",
    content: "تجربه کار در نمایش ملکه‌ها برای من فراموش‌نشدنی بود. امیدوارم تماشاگران از دیدن آن لذت ببرند.",
    timeAgo: "۸ ساعت پیش",
    likes: 67,
    replies: 8,
    theaterShow: {
      id: 4,
      title: "نمایش ملکه‌ها",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=100&h=100&fit=crop",
      rating: "4.8"
    }
  }
];

const Wall = () => {
  const [discussions] = useState<Discussion[]>(mockDiscussions);

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">دیوار بحث</h1>
          <p className="text-foreground/70">نظرات و بحث‌های کاربران و عوامل تئاتر</p>
        </div>

        <div className="space-y-6">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-card border border-border/40 rounded-lg p-6">
              <div className="flex gap-4">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={discussion.authorAvatar}
                    alt={discussion.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{discussion.author}</h3>
                    <span className="text-sm text-gold-500 bg-gold-500/10 px-2 py-1 rounded">
                      {discussion.role}
                    </span>
                    <span className="text-sm text-foreground/50">{discussion.timeAgo}</span>
                  </div>

                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {discussion.content}
                  </p>

                  {/* Theater Show Preview */}
                  <div className="bg-background/50 border border-border/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={discussion.theaterShow.image}
                        alt={discussion.theaterShow.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          {discussion.theaterShow.title}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-gold-500">
                          <span>★</span>
                          <span>{discussion.theaterShow.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 text-sm text-foreground/60">
                    <button className="flex items-center gap-1 hover:text-gold-500 transition-colors">
                      <span>👍</span>
                      <span>{discussion.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gold-500 transition-colors">
                      <span>💬</span>
                      <span>{discussion.replies} پاسخ</span>
                    </button>
                    <button className="hover:text-gold-500 transition-colors">
                      اشتراک‌گذاری
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wall;
