
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

const CreateConcertFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artist_name: "",
    venue: "",
    city: "",
    duration: "",
    price: "",
    date: "",
    time: "",
    poster_url: "",
    genre: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطا",
        description: "برای ایجاد کنسرت باید وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll store concerts as shows with a specific genre
      const { error } = await supabase.from("shows").insert({
        title: formData.title,
        description: `کنسرت: ${formData.artist_name}\n${formData.description}`,
        genre: `کنسرت - ${formData.genre}`,
        duration: formData.duration ? parseInt(formData.duration) : null,
        price: parseFloat(formData.price),
        start_date: formData.date,
        poster_url: formData.poster_url,
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
          description: "کنسرت شما با موفقیت ایجاد شد.",
        });
        setFormData({
          title: "",
          description: "",
          artist_name: "",
          venue: "",
          city: "",
          duration: "",
          price: "",
          date: "",
          time: "",
          poster_url: "",
          genre: "",
        });
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد کنسرت رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد کنسرت جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات کنسرت</h3>
            <div>
              <label className="block text-sm font-medium mb-2">عنوان کنسرت *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="عنوان کنسرت را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نام هنرمند/گروه *</label>
              <Input
                value={formData.artist_name}
                onChange={(e) => setFormData(prev => ({ ...prev, artist_name: e.target.value }))}
                placeholder="نام هنرمند یا گروه"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات کنسرت"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ژانر موسیقی</label>
              <Input
                value={formData.genre}
                onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                placeholder="مثل: کلاسیک، پاپ، سنتی"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">زمان و مکان</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تاریخ *</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
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
            <h3 className="text-lg font-semibold">جزئیات اضافی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">مدت زمان (دقیقه)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="120"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">قیمت بلیت (تومان) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="100000"
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">پوستر (لینک تصویر)</label>
              <Input
                type="url"
                value={formData.poster_url}
                onChange={(e) => setFormData(prev => ({ ...prev, poster_url: e.target.value }))}
                placeholder="https://example.com/poster.jpg"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد..." : "ایجاد کنسرت"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateConcertFormEnhanced;
