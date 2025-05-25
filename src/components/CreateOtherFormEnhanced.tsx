
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "@/hooks/useCategories";

const CreateOtherFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "",
    venue: "",
    city: "",
    date: "",
    time: "",
    price: "",
    contact_info: "",
    image_url: "",
    website_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطا",
        description: "برای ایجاد رویداد باید وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Store other events as shows with a specific genre
      const { error } = await supabase.from("shows").insert({
        title: formData.title,
        description: `نوع رویداد: ${formData.event_type}\nمکان: ${formData.venue}\n${formData.description}\nاطلاعات تماس: ${formData.contact_info}`,
        genre: `سایر - ${formData.event_type}`,
        price: parseFloat(formData.price) || 0,
        start_date: formData.date,
        poster_url: formData.image_url,
        status: 'published'
      });

      if (error) {
        toast({
          title: "خطا",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "موفق",
          description: "رویداد شما با موفقیت ایجاد شد.",
        });
        setFormData({
          title: "",
          description: "",
          event_type: "",
          venue: "",
          city: "",
          date: "",
          time: "",
          price: "",
          contact_info: "",
          image_url: "",
          website_url: "",
        });
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد رویداد رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد رویداد جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات رویداد</h3>
            <div>
              <label className="block text-sm font-medium mb-2">عنوان رویداد *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="عنوان رویداد را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع رویداد</label>
              <Select value={formData.event_type} onValueChange={(value) => setFormData(prev => ({ ...prev, event_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع رویداد را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">کارگاه آموزشی</SelectItem>
                  <SelectItem value="exhibition">نمایشگاه</SelectItem>
                  <SelectItem value="festival">جشنواره</SelectItem>
                  <SelectItem value="seminar">سمینار</SelectItem>
                  <SelectItem value="conference">کنفرانس</SelectItem>
                  <SelectItem value="competition">مسابقه</SelectItem>
                  <SelectItem value="ceremony">مراسم</SelectItem>
                  <SelectItem value="other">سایر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات رویداد"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصویر (لینک)</label>
              <Input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/event.jpg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">زمان و مکان</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تاریخ</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ساعت</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">مکان برگزاری</label>
              <Input
                value={formData.venue}
                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                placeholder="نام سالن یا مکان برگزاری"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شهر</label>
              <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="شهر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.cities?.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات اضافی</h3>
            <div>
              <label className="block text-sm font-medium mb-2">قیمت (تومان)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0 (برای رایگان)"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">اطلاعات تماس</label>
              <Textarea
                value={formData.contact_info}
                onChange={(e) => setFormData(prev => ({ ...prev, contact_info: e.target.value }))}
                placeholder="شماره تلفن، ایمیل یا سایر اطلاعات تماس"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">وب‌سایت</label>
              <Input
                type="url"
                value={formData.website_url}
                onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد..." : "ایجاد رویداد"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateOtherFormEnhanced;
