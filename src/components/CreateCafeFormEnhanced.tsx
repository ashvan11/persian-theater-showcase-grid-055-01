
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

const CreateCafeFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    contact_phone: "",
    contact_email: "",
    website_url: "",
    image_url: "",
    opening_hours: "",
    cuisine_type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطا",
        description: "برای ایجاد کافه باید وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll store cafes as theaters with a specific type in description
      const { error } = await supabase.from("theaters").insert({
        name: formData.name,
        description: `کافه/رستوران: ${formData.cuisine_type}\n${formData.description}\nساعات کاری: ${formData.opening_hours}`,
        address: formData.address,
        city: formData.city,
        capacity: 50, // Default capacity for cafes
        contact_phone: formData.contact_phone,
        contact_email: formData.contact_email,
        image_url: formData.image_url,
        owner_id: user.id,
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
          description: "کافه/رستوران شما با موفقیت ایجاد شد.",
        });
        setFormData({
          name: "",
          description: "",
          address: "",
          city: "",
          contact_phone: "",
          contact_email: "",
          website_url: "",
          image_url: "",
          opening_hours: "",
          cuisine_type: "",
        });
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد کافه رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد کافه/رستوران جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات اصلی</h3>
            <div>
              <label className="block text-sm font-medium mb-2">نام کافه/رستوران *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="نام کافه یا رستوران"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نوع غذا/نوشیدنی</label>
              <Input
                value={formData.cuisine_type}
                onChange={(e) => setFormData(prev => ({ ...prev, cuisine_type: e.target.value }))}
                placeholder="مثل: کافه، رستوران ایرانی، فست فود"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات کافه/رستوران"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ساعات کاری</label>
              <Input
                value={formData.opening_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, opening_hours: e.target.value }))}
                placeholder="مثل: 8:00 - 24:00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصویر (لینک)</label>
              <Input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/cafe.jpg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">موقعیت مکانی</h3>
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

            <div>
              <label className="block text-sm font-medium mb-2">آدرس *</label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="آدرس کامل کافه/رستوران"
                required
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات تماس</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تلفن تماس</label>
                <Input
                  value={formData.contact_phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                  placeholder="شماره تلفن"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ایمیل</label>
                <Input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                  placeholder="ایمیل تماس"
                />
              </div>
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
            {loading ? "در حال ایجاد..." : "ایجاد کافه/رستوران"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCafeFormEnhanced;
