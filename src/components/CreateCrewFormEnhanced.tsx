
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const CreateCrewFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedAwards, setSelectedAwards] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    stage_name: "",
    bio: "",
    experience_years: "",
    website_url: "",
    location: "",
    newAward: "",
  });

  const handleSpecialtyAdd = (specialty: string) => {
    if (!selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const handleSpecialtyRemove = (specialty: string) => {
    setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
  };

  const handleAwardAdd = () => {
    if (formData.newAward.trim() && !selectedAwards.includes(formData.newAward.trim())) {
      setSelectedAwards([...selectedAwards, formData.newAward.trim()]);
      setFormData(prev => ({ ...prev, newAward: "" }));
    }
  };

  const handleAwardRemove = (award: string) => {
    setSelectedAwards(selectedAwards.filter(a => a !== award));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("crew_members").insert({
        profile_id: user.id,
        stage_name: formData.stage_name,
        bio: formData.bio,
        specialties: selectedSpecialties,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : 0,
        awards: selectedAwards,
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
        // Reset form
        setFormData({
          stage_name: "",
          bio: "",
          experience_years: "",
          website_url: "",
          location: "",
          newAward: "",
        });
        setSelectedSpecialties([]);
        setSelectedAwards([]);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات اصلی</h3>
            <div>
              <label className="block text-sm font-medium mb-2">نام هنری *</label>
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
                rows={4}
              />
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تخصص‌ها</h3>
            <div>
              <label className="block text-sm font-medium mb-2">حوزه‌های تخصصی</label>
              <Select onValueChange={handleSpecialtyAdd}>
                <SelectTrigger>
                  <SelectValue placeholder="تخصص را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.crewSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSpecialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                    {specialty}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleSpecialtyRemove(specialty)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Experience and Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تجربه و موقعیت</h3>
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
                <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="شهر محل سکونت" />
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
            </div>
          </div>

          {/* Awards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">جوایز و افتخارات</h3>
            <div>
              <label className="block text-sm font-medium mb-2">جوایز</label>
              <div className="flex gap-2">
                <Input
                  value={formData.newAward}
                  onChange={(e) => setFormData(prev => ({ ...prev, newAward: e.target.value }))}
                  placeholder="نام جایزه را وارد کنید"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAwardAdd())}
                />
                <Button type="button" onClick={handleAwardAdd} variant="outline">
                  افزودن
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedAwards.map((award) => (
                  <Badge key={award} variant="secondary" className="flex items-center gap-1">
                    {award}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleAwardRemove(award)} />
                  </Badge>
                ))}
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
            {loading ? "در حال ایجاد..." : "ایجاد پروفایل هنری"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCrewFormEnhanced;
