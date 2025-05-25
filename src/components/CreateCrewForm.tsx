
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CreateCrewForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    stage_name: "",
    bio: "",
    specialties: "",
    experience_years: "",
    awards: "",
    website_url: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("crew_members").insert({
        profile_id: user.id,
        stage_name: formData.stage_name,
        bio: formData.bio,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : 0,
        awards: formData.awards.split(',').map(s => s.trim()).filter(Boolean),
        website_url: formData.website_url,
        location: formData.location,
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
          description: "پروفایل هنری شما با موفقیت ایجاد شد.",
        });
        setFormData({
          stage_name: "",
          bio: "",
          specialties: "",
          experience_years: "",
          awards: "",
          website_url: "",
          location: "",
        });
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد پروفایل هنری رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد پروفایل هنری</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">نام هنری</label>
            <Input
              value={formData.stage_name}
              onChange={(e) => setFormData(prev => ({ ...prev, stage_name: e.target.value }))}
              placeholder="نام هنری خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">بیوگرافی</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="بیوگرافی خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">تخصص‌ها (با کاما جدا کنید)</label>
            <Input
              value={formData.specialties}
              onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
              placeholder="بازیگری, کارگردانی, نویسندگی"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">سال‌های تجربه</label>
              <Input
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                placeholder="تعداد سال‌های تجربه"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">مکان</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="شهر محل سکونت"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">جوایز (با کاما جدا کنید)</label>
            <Input
              value={formData.awards}
              onChange={(e) => setFormData(prev => ({ ...prev, awards: e.target.value }))}
              placeholder="جایزه بهترین بازیگر, جایزه بهترین کارگردان"
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد..." : "ایجاد پروفایل هنری"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCrewForm;
