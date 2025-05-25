
import { useState, useEffect } from "react";
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

const CreateShowFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [theaters, setTheaters] = useState<any[]>([]);
  const [crewMembers, setCrewMembers] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    theater_id: "",
    duration: "",
    age_rating: "",
    price: "",
    start_date: "",
    end_date: "",
    poster_url: "",
    director_id: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserTheaters();
      fetchCrewMembers();
    }
  }, [user]);

  const fetchUserTheaters = async () => {
    try {
      const { data, error } = await supabase
        .from("theaters")
        .select("*")
        .eq("owner_id", user?.id);

      if (error) {
        console.error("Error fetching theaters:", error);
      } else {
        setTheaters(data || []);
      }
    } catch (error) {
      console.error("Error fetching theaters:", error);
    }
  };

  const fetchCrewMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("crew_members")
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `);

      if (error) {
        console.error("Error fetching crew members:", error);
      } else {
        setCrewMembers(data || []);
      }
    } catch (error) {
      console.error("Error fetching crew members:", error);
    }
  };

  const handleGenreAdd = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleGenreRemove = (genre: string) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genre));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("shows").insert({
        ...formData,
        genre: selectedGenres.join(', '),
        duration: formData.duration ? parseInt(formData.duration) : null,
        price: parseFloat(formData.price),
        director_id: formData.director_id || null,
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
          description: "نمایش شما با موفقیت ایجاد شد.",
        });
        // Reset form
        setFormData({
          title: "",
          description: "",
          theater_id: "",
          duration: "",
          age_rating: "",
          price: "",
          start_date: "",
          end_date: "",
          poster_url: "",
          director_id: "",
        });
        setSelectedGenres([]);
      }
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ایجاد نمایش رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (theaters.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ایجاد نمایش جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            برای ایجاد نمایش، ابتدا باید یک تالار ایجاد کنید.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد نمایش جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات اصلی</h3>
            <div>
              <label className="block text-sm font-medium mb-2">عنوان نمایش *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="عنوان نمایش را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات نمایش را وارد کنید"
                rows={4}
              />
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

          {/* Theater and Crew */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تالار و عوامل</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تالار *</label>
                <Select value={formData.theater_id} onValueChange={(value) => setFormData(prev => ({ ...prev, theater_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="تالار را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {theaters.map((theater) => (
                      <SelectItem key={theater.id} value={theater.id}>
                        {theater.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">کارگردان</label>
                <Select value={formData.director_id} onValueChange={(value) => setFormData(prev => ({ ...prev, director_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="کارگردان را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {crewMembers.map((crew) => (
                      <SelectItem key={crew.id} value={crew.id}>
                        {crew.stage_name || `${crew.profiles?.first_name} ${crew.profiles?.last_name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Genre Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ژانر و دسته‌بندی</h3>
            <div>
              <label className="block text-sm font-medium mb-2">ژانرها</label>
              <Select onValueChange={handleGenreAdd}>
                <SelectTrigger>
                  <SelectValue placeholder="ژانر را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.showGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleGenreRemove(genre)} />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">رده سنی</label>
              <Select value={formData.age_rating} onValueChange={(value) => setFormData(prev => ({ ...prev, age_rating: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="رده سنی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.ageRatings.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">جزئیات اجرا</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium mb-2">قیمت (تومان) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="50000"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تاریخ شروع</label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">تاریخ پایان</label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد..." : "ایجاد نمایش"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateShowFormEnhanced;
