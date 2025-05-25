
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CreateShowForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [theaters, setTheaters] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    theater_id: "",
    genre: "",
    duration: "",
    age_rating: "",
    price: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserTheaters();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("shows").insert({
        ...formData,
        duration: formData.duration ? parseInt(formData.duration) : null,
        price: parseFloat(formData.price),
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
        setFormData({
          title: "",
          description: "",
          theater_id: "",
          genre: "",
          duration: "",
          age_rating: "",
          price: "",
          start_date: "",
          end_date: "",
        });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">عنوان نمایش</label>
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">تالار</label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ژانر</label>
              <Input
                value={formData.genre}
                onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                placeholder="کمدی، درام، موزیکال"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">رده سنی</label>
              <Input
                value={formData.age_rating}
                onChange={(e) => setFormData(prev => ({ ...prev, age_rating: e.target.value }))}
                placeholder="عمومی، +15، +18"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">قیمت (تومان)</label>
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد..." : "ایجاد نمایش"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateShowForm;
