
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

const CreateTheaterFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    capacity: "",
    contact_phone: "",
    contact_email: "",
    image_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("theaters").insert({
        ...formData,
        capacity: parseInt(formData.capacity),
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
          description: "تالار شما با موفقیت ایجاد شد.",
        });
        setFormData({
          name: "",
          description: "",
          address: "",
          city: "",
          capacity: "",
          contact_phone: "",
          contact_email: "",
          image_url: "",
        });
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد تالار رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد تالار جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات اصلی</h3>
            <div>
              <label className="block text-sm font-medium mb-2">نام تالار *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="نام تالار را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات تالار را وارد کنید"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">تصویر تالار (لینک)</label>
              <Input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/theater.jpg"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">موقعیت مکانی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">شهر *</label>
                <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="شهر را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ظرفیت *</label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  placeholder="ظرفیت تالار"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">آدرس *</label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="آدرس کامل تالار"
                required
                rows={2}
              />
            </div>
          </div>

          {/* Contact Information */}
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
                <label className="block text-sm font-medium mb-2">ایمیل تماس</label>
                <Input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                  placeholder="ایمیل تماس"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد..." : "ایجاد تالار"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTheaterFormEnhanced;
