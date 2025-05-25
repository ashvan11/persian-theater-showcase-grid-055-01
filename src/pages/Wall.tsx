
import ExpandableHeader from "../components/ExpandableHeader";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WallDiscussion {
  id: string;
  comment: string;
  rating: number;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string;
    is_verified: boolean;
    role: string;
  };
  shows: {
    id: string;
    title: string;
    poster_url: string;
  };
}

const Wall = () => {
  const { data: discussions, isLoading } = useQuery({
    queryKey: ['wall-discussions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          comment,
          rating,
          created_at,
          profiles (
            first_name,
            last_name,
            avatar_url,
            is_verified,
            role
          ),
          shows (
            id,
            title,
            poster_url
          )
        `)
        .not('comment', 'is', null)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) {
        console.error('Error fetching discussions:', error);
        throw error;
      }
      
      return data as WallDiscussion[];
    },
  });

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'crew_member': return 'عضو تیم';
      case 'theater_owner': return 'مالک تئاتر';
      case 'admin': return 'مدیر';
      default: return 'تماشاگر';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'کمتر از یک ساعت پیش';
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} روز پیش`;
    return date.toLocaleDateString('fa-IR');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ExpandableHeader />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto"></div>
            <p className="mt-4 text-foreground">در حال بارگذاری بحث‌ها...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">دیوار بحث</h1>
          <p className="text-foreground/70">نظرات و بحث‌های کاربران و عوامل تئاتر</p>
        </div>

        {discussions && discussions.length > 0 ? (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-card border border-border/40 rounded-lg p-6">
                <div className="flex gap-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={discussion.profiles?.avatar_url}
                        alt={`${discussion.profiles?.first_name} ${discussion.profiles?.last_name}`}
                      />
                      <AvatarFallback>
                        {discussion.profiles?.first_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {discussion.profiles?.first_name} {discussion.profiles?.last_name}
                      </h3>
                      <span className="text-sm text-gold-500 bg-gold-500/10 px-2 py-1 rounded">
                        {getRoleDisplayName(discussion.profiles?.role || 'customer')}
                      </span>
                      <span className="text-sm text-foreground/50">
                        {getTimeAgo(discussion.created_at)}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} className={`text-sm ${
                          star <= discussion.rating ? 'text-gold-500' : 'text-gray-300'
                        }`}>
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-foreground/60 mr-2">
                        امتیاز: {discussion.rating}/5
                      </span>
                    </div>

                    <p className="text-foreground/80 mb-4 leading-relaxed">
                      {discussion.comment}
                    </p>

                    {/* Theater Show Preview */}
                    <div className="bg-background/50 border border-border/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={discussion.shows?.poster_url || "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=100&h=100&fit=crop"}
                          alt={discussion.shows?.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-foreground mb-1">
                            {discussion.shows?.title}
                          </h4>
                          <div className="flex items-center gap-1 text-sm text-gold-500">
                            <span>★</span>
                            <span>{discussion.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6 text-sm text-foreground/60">
                      <button className="flex items-center gap-1 hover:text-gold-500 transition-colors">
                        <span>👍</span>
                        <span>پسند</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-gold-500 transition-colors">
                        <span>💬</span>
                        <span>پاسخ</span>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg">هنوز نظری ثبت نشده است.</p>
            <p className="text-foreground/40 mt-2">اولین نفری باشید که نظر خود را درباره نمایش‌ها می‌دهد!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wall;
