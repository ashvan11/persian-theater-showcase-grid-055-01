
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CreateBannerFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    link_url: "",
    duration_days: "",
    target_audience: "",
    budget: "",
    banner_size: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطا",
        description: "برای ایجاد بنر تبلیغاتی باید وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll just show a success message since we don't have an ads table
      toast({
        title: "موفق",
        description: "درخواست بنر تبلیغاتی شما ثبت شد. با شما تماس گرفته خواهد شد.",
      });
      
      setFormData({
        title: "",
        description: "",
        image_url: "",
        link_url: "",
        duration_days: "",
        target_audience: "",
        budget: "",
        banner_size: "",
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ثبت درخواست بنر رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد بنر تبلیغاتی</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات بنر</h3>
            <div>
              <label className="block text-sm font-medium mb-2">عنوان بنر *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="عنوان بنر تبلیغاتی"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات بنر تبلیغاتی"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصویر بنر *</label>
              <Input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/banner.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">لینک هدف</label>
              <Input
                type="url"
                value={formData.link_url}
                onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تنظیمات تبلیغ</h3>
            <div>
              <label className="block text-sm font-medium mb-2">اندازه بنر</label>
              <Select value={formData.banner_size} onValueChange={(value) => setFormData(prev => ({ ...prev, banner_size: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اندازه بنر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leaderboard">Leaderboard (728x90)</SelectItem>
                  <SelectItem value="rectangle">Rectangle (300x250)</SelectItem>
                  <SelectItem value="skyscraper">Skyscraper (160x600)</SelectItem>
                  <SelectItem value="banner">Banner (468x60)</SelectItem>
                  <SelectItem value="square">Square (250x250)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">مدت نمایش (روز)</label>
                <Input
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration_days: e.target.value }))}
                  placeholder="7"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">بودجه (تومان)</label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="1000000"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">مخاطب هدف</label>
              <Select value={formData.target_audience} onValueChange={(value) => setFormData(prev => ({ ...prev, target_audience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="مخاطب هدف را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه کاربران</SelectItem>
                  <SelectItem value="theater_lovers">علاقه‌مندان تئاتر</SelectItem>
                  <SelectItem value="music_lovers">علاقه‌مندان موسیقی</SelectItem>
                  <SelectItem value="young_adults">جوانان</SelectItem>
                  <SelectItem value="families">خانواده‌ها</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>توجه:</strong> پس از ثبت درخواست، تیم ما با شما تماس خواهد گرفت تا جزئیات بیشتر را بررسی کنیم.
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ثبت..." : "ثبت درخواست بنر"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBannerFormEnhanced;
